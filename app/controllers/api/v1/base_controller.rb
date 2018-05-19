class Api::V1::BaseController < ApplicationController
  layout false

  private

  def search_params
    params[:search] || {}
  end

  def respond_json_errors(options = {})
    options[:status] ||= 500
    render json: options, status: options[:status]
  end

  def respond_json_results(results, options = {}, allowed_include_params = nil)
    json = results.is_a?(Hash) && results.key?(:data) ? results.merge({}) : {data: as_json_results(results, options, allowed_include_params)}

    if options[:pagination]
      json[:pagination] = options[:pagination]
    elsif results.respond_to?(:total_entries)
      json[:pagination] = pagination_json(results)
    end

    status = options[:status] || 200
    render json: json, status: status
  end

  def as_json_results(results, options = {}, allowed_include_params = nil)
    options[:include] ||= only_allow_include(allowed_include_params)
    results.as_json(options)
  end

  def pagination_json(results)
    {
      count: results.total_entries,
      total_pages: results.total_pages,
      current_page: results.current_page.to_i,
      per_page: results.per_page
    }
  end

  def parsed_params
    __p = {}
    order_by = params[:order_by].try(:downcase) || "created_at"
    order_direction = params[:order_direction].try(:downcase) || (order_by == "created_at" ? "desc" : "asc")

    __p[:page] = (params[:page] || 1).to_i
    __p[:page] = 1 if __p[:page] < 1
    __p[:per_page] = params[:per_page].to_i
    __p[:per_page] = 30 if __p[:per_page] < 1 || __p[:per_page] > 30

    if params[:include].present?
      begin
        __p[:include] = symbolize_obj(JSON.parse(params[:include]))
      rescue JSON::ParserError => e
        __p[:include] = nil
      end
    end

    __p
  end

  def only_allow_include(allowed_include_params)
    include_param = parsed_params[:include]
    include_param if allowed_include_params.present? && allowed_include_params.include?(include_param)
  end

  def symbolize_obj(obj)
    if obj.is_a?(Hash)
      obj.each_with_object({}) {|key_value, new_hash|
        key, value = key_value
        value = symbolize_obj(value)
        new_hash[key.to_sym] = value
      }
    elsif obj.is_a?(Array)
      obj.each_with_object([]) {|value, new_arr|
        new_value = symbolize_obj(value)
        new_arr << new_value
      }
    elsif obj.is_a?(String)
      obj.to_sym
    else
      raise :unsupported_datatype
    end
  end

  def as_json_for_current_user(options = {})
    nil.as_json
  end
end
