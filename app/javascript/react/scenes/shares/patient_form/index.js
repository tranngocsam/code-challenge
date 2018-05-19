import React from 'react';
import {connect} from "react-redux";
import _ from "lodash";
import PatientFormView from "./components/patient_form_view";

import {loadFormulations, loadFormulationIngredients, createPatient} from "../../../services/patients/actions";
import constants from "../../../constants";

class PatientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    _.bindAll(this, "savePatient")
  }

  getInitialState() {
    return {};
  }

  savePatient(params) {
    if (this.props.patientId) {
      this.props.updatePatient(this.props.patientId, params);
    } else {
      this.props.createPatient(params)
    }
  }

  render() {
    var savePatientActionStatus = this.props.createPatientActionStatus || this.props.updatePatientActionStatus;

    return (
      <div className="page home-page">
        <PatientFormView savePatient={this.savePatient}
                         savePatientActionStatus={savePatientActionStatus}
                         loadFormulations={this.props.loadFormulations}
                         formulations={this.props.formulations}
                         formulationsActionStatus={this.props.formulationsActionStatus}
                         loadFormulationIngredients={this.props.loadFormulationIngredients}
                         formulationIngredients={this.props.formulationIngredients}
                         formulationIngredientsActionStatus={this.props.formulationIngredientsActionStatus} />
      </div>
    )
  }
}

function stateToProps(state, ownProps) {
  let sessionsStore = state.sessionsStore;
  let patientsStore = state.patientsStore;
  let props = {};

  if (sessionsStore) {
    props.currentUser = sessionsStore.currentUser;
  }

  if (patientsStore) {
    props.formulations = patientsStore.formulations;
    props.formulationIngredients = patientsStore.formulationIngredients;

    if (patientsStore.actionType == constants.PATIENT.LOAD_FORMULATIONS) {
      props.formulationsActionStatus = patientsStore.actionStatus;
    } else if (patientsStore.actionType == constants.PATIENT.LOAD_FORMULATION_INGREDIENTS) {
      props.formulationIngredientsActionStatus = patientsStore.actionStatus;
    } else if (patientsStore.actionType == constants.PATIENT.CREATE_PATIENT) {
      props.createPatientActionStatus = patientsStore.actionStatus;
    } else if (patientsStore.actionType == constants.PATIENT.UPDATE_PATIENT) {
      props.updatePatientActionStatus = patientsStore.actionStatus;
    }
  }

  return props;
}

PatientForm = connect(stateToProps, {
  loadFormulations,
  loadFormulationIngredients,
  createPatient
})(PatientForm);

export default PatientForm;
