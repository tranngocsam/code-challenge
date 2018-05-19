class Api::V1::FormulationIngredientsController < Api::V1::BaseController
  def index
    records = FormulationIngredient.search(search_params.merge(:formulation_id => params[:formulation_id]))
    respond_json_results(records, {}, [[:ingredient]])
  end
end
