class Api::V1::SessionsController < Api::V1::BaseController
  def info
    json = {}
    json["current_user"] = as_json_for_current_user

    respond_json_results(json)
  end
end
