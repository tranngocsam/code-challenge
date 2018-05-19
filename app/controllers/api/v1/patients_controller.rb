class Api::V1::PatientsController < Api::V1::BaseController
  def create
    patient = Patient.create(patient_params)

    if patient.persisted?
      respond_json_results(patient)
    else
      respond_json_errors(:errors => patient.errors)
    end
  end

  private

  def patient_params
    p = params.require(:patient).permit(:name, :address, :patient_formulation_ingredients_attributes => [:formulation_id, :ingredient_id, :percentage])
    p[:dob] = Date.strptime(params[:patient][:dob], "%m/%d/%Y") if params[:patient][:dob].present?
    p
  end
end
