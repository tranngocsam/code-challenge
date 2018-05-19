class Api::V1::FormulationsController < Api::V1::BaseController
  def index
    term = "%#{search_params[:term].downcase}%" if search_params[:term].present?
    formulations = Formulation.search(search_params)
                              .paginate(:page => parsed_params[:page], :per_page => parsed_params[:per_page])

    respond_json_results(formulations)
  end
end
