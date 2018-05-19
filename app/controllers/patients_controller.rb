class PatientsController < ApplicationController
  def show
    @patient = find_patient

    pdf_filename = "patient-#{@patient.id}"
    render(pdf: pdf_filename,
      template: "patients/show.html",
      layout: "patient_pdf",
      javascript_delay: 5000,
      disable_javascript: false,
      disposition: 'attachment',
      margin: {
        top: 15,
        bottom: 15
      },
      header: {
        right: '[page] of [topage]',
        spacing: 5,
        left: @patient.name
      },
      footer: {
        right: '[page] of [topage]',
        spacing: 5,
        left: 'Data provided by CodeChallenge'
      }
    )
  end

  private

  def find_patient
    Patient.find(params[:id])
  end
end
