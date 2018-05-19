import React from "react";
import _ from "lodash";
import classNames from "classnames";
import Datetime from 'react-datetime';
import Select from "react-select";
import Slider from "rc-slider";

import LoadingIcon from "../../../../components/commons/loading_icon";
import {isEmptyObject, formatDate, parseDate} from "../../../../utils/misc";
import constants from "../../../../constants";

import "react-datetime/css/react-datetime.css";
import "react-select/dist/react-select.css";

const cantBeBlankMessage = constants.COMMON.cantBeBlankMessage;
const isInvalidMessage = constants.COMMON.isInvalidMessage;
const dateFormat = constants.COMMON.dateFormat;

class PatientFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    _.bindAll(this, "setFormValue", "savePatient", "loadFormulations", "selectFormulation");
    _.bindAll(this, "setFormulationIngredientValue");
  }

  getInitialState() {
    return {};
  }

  componentWillReceiveProps(newProps) {
    var fiActionStatus = newProps.formulationIngredientsActionStatus;
    var oldFiActionStatus = this.props.formulationIngredientsActionStatus;

    if (fiActionStatus && fiActionStatus != oldFiActionStatus) {
      if (fiActionStatus == constants.REQUEST.LOADING_SUCCESS) {
        var formulationIngredients = newProps.formulationIngredients || [];
        var patientFormulationIngredients = {};

        for (let i = 0; i < formulationIngredients.length; i++) {
          let formulationIngredient = formulationIngredients[i];
          patientFormulationIngredients[formulationIngredient.ingredient_id] = formulationIngredient.percentage;
        }

        var states = {
          patientFormulationIngredients: patientFormulationIngredients,
          formulationIngredients: formulationIngredients
        };

        this.setState(states);
      }
    } else if (newProps.formulationsActionStatus && (newProps.formulationsActionStatus != this.props.formulationsActionStatus)) {
      if (newProps.formulationsActionStatus == constants.REQUEST.LOADING_SUCCESS) {
        this.setState({formulations: newProps.formulations});
      }
    }
  }

  setFormValue(objectName, fieldName, value) {
    var object = this.state[objectName] || {};
    var states = {};

    object[fieldName] = value;
    states[objectName] = object;

    this.setState(states);
  }

  savePatient(event) {
    event && event.preventDefault();
    var errors = this.getPatientErrors();

    if (isEmptyObject(errors)) {
      var patient = this.state.patient || {};
      var patientFormulationIngredients = this.state.patientFormulationIngredients || {};
      var patientFormulationIngredientsAttributes = [];

      for (let ingredientId in patientFormulationIngredients) {
        patientFormulationIngredientsAttributes.push(
          {
            ingredient_id: ingredientId,
            formulation_id: patient.formulation_id,
            percentage: patientFormulationIngredients[ingredientId]
          }
        );
      }

      patient.patient_formulation_ingredients_attributes = patientFormulationIngredientsAttributes;
      this.props.savePatient(patient);
      this.setState({submitted: false});
    } else {
      this.setState({submitted: true});
    }
  }

  loadFormulations(input) {
    if (input) {
      this.props.loadFormulations({"search[term]": input});
    }

    this.setState({formulationsTerm: input});
  }

  selectFormulation(option) {
    var formulationId = (option || {}).value;
    var states = {};
    var patient = this.state.patient || {};

    patient.formulation_id = formulationId;
    states.selectedFormulationOption = option;
    states.patientFormulationIngredients = {};
    states.patient = patient;

    this.setState(states);

    if (formulationId) {
      var params = {};
      params.include = JSON.stringify(["ingredient"]);
      this.props.loadFormulationIngredients(formulationId, params);
    }
  }

  setFormulationIngredientValue(formulationIngredient, value) {
    var patient = this.state.patient || {};
    var patientFormulationIngredients = this.state.patientFormulationIngredients || {};

    if (patient.formulation_id == formulationIngredient.formulation_id) {
      patientFormulationIngredients[formulationIngredient.ingredient_id] = value;
    }

    this.setState({patientFormulationIngredients: patientFormulationIngredients});
  }

  getPatientErrors() {
    var patient = this.state.patient || {};
    var errors = {};

    if (!patient.name) {
      errors.name = cantBeBlankMessage;
    }

    if (!patient.dob) {
      errors.dob = cantBeBlankMessage;
    }

    if (!patient.formulation_id) {
      errors.formulation_id = cantBeBlankMessage;
    }

    return errors;
  }

  renderError(errors, field) {
    if (errors[field]) {
      return (
        <div className="error-message">{errors[field]}</div>
      );
    }
  }

  render() {
    var patient = this.state.patient || {};
    var patientErrors = this.state.submitted ? this.getPatientErrors() : {};
    var noFormulationsText = "";
    var formulationOptions = [];
    var formulations = this.state.formulations || [];
    var ingredientFormGroups = [];
    var formulationIngredients = this.state.formulationIngredients || [];
    var patientFormulationIngredients = this.state.patientFormulationIngredients || {};
    var saveButton;

    for (let i = 0; i < formulations.length; i++) {
      let formulation = formulations[i];
      formulationOptions.push({
        value: formulation.id,
        label: formulation.name
      });
    }

    if (this.state.formulationsTerm) {
      if (this.props.formulationsActionStatus == constants.REQUEST.LOADING) {
        noFormulationsText = "Loading...";
      } else {
        noFormulationsText = "No formulations found";
      }
    }

    if (this.props.formulationIngredientsActionStatus == constants.REQUEST.LOADING) {
      ingredientFormGroups.push(
        <div className="form-group text-center" key={0}>
          <LoadingIcon />
        </div>
      )
    } else if (patient.formulation_id) {
      for (let i = 0; i < formulationIngredients.length; i++) {
        let formulationIngredient = formulationIngredients[i];
        let value = 1*patientFormulationIngredients[formulationIngredient.ingredient_id];
        let ingredient = formulationIngredient.ingredient;
        let min = 1*ingredient.minimum_percentage;
        let max = 1*ingredient.maximum_percentage
        let ingredientFormGroup = (
          <div className="form-group" key={i}>
            <label>{ingredient.name} ({value})</label>
            <Slider min={min}
                    max={max}
                    step={0.01}
                    value={value}
                    onChange={(value)=> this.setFormulationIngredientValue(formulationIngredient, value)}/>
          </div>
        );

        ingredientFormGroups.push(ingredientFormGroup);
      }
    }

    if (this.props.savePatientActionStatus == constants.REQUEST.LOADING) {
      saveButton = (
        <LoadingIcon height="40px" />
      );
    } else {
      saveButton = (
        <button type="submit" className="btn btn-primary">Save</button>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <form className="form" onSubmit={this.savePatient}>
              <div className={classNames({"form-group": true, "has-error": patientErrors.name})}>
                <label>Name</label>
                <input type="text" className="form-control" value={patient.name || ""} onChange={(evt)=> this.setFormValue("patient", "name", evt.target.value)} />
                {this.renderError(patientErrors, "name")}
              </div>
              <div className={classNames({"form-group": true, "has-error": patientErrors.address})}>
                <label>Address</label>
                <input type="text" className="form-control" value={patient.address || ""} onChange={(evt)=> this.setFormValue("patient", "address", evt.target.value)} />
                {this.renderError(patientErrors, "address")}
              </div>
              <div className={classNames({"form-group": true, "has-error": patientErrors.dob})}>
                <label>Date of birth</label>
                <Datetime value={parseDate(patient.dob, dateFormat)}
                          onChange={(value)=> this.setFormValue("patient", "dob", value.format(dateFormat))}
                          dateFormat={dateFormat}
                          timeFormat={false}
                          input={false}
                          viewMode="years" />
                {this.renderError(patientErrors, "dob")}
              </div>
              <div className={classNames({"form-group": true, "has-error": patientErrors.formulation_id})}>
                <label>Formula</label>
                <Select value={this.state.selectedFormulationOption}
                        onChange={this.selectFormulation}
                        options={formulationOptions}
                        onInputChange={this.loadFormulations}
                        placeholder="Search Formulation"
                        noResultsText={noFormulationsText} />
                {this.renderError(patientErrors, "formulation_id")}
              </div>
              {ingredientFormGroups}

              <div className="form-group text-center">
                {saveButton}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientFormView;
