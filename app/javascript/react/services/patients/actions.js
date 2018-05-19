import _ from "lodash";
import constants from "../../constants";
import { performAction } from "../../utils/action_utils";
import {
  doLoadFormulations,
  doLoadFormulationIngredients,
  doCreatePatient
} from "./apis";

export function loadFormulations(params) {
  var requestType = constants.PATIENT.LOAD_FORMULATIONS;
  var additionalParams = {};
  additionalParams.timestamp = (new Date()).getTime();

  return performAction(requestType, ()=> {
    return doLoadFormulations(params)
  }, additionalParams);
}

export function loadFormulationIngredients(formulationId, params) {
  var requestType = constants.PATIENT.LOAD_FORMULATION_INGREDIENTS;
  var additionalParams = {};
  additionalParams.timestamp = (new Date()).getTime();

  return performAction(requestType, ()=> {
    return doLoadFormulationIngredients(formulationId, params)
  }, additionalParams);
}

export function createPatient(attrs) {
  var requestType = constants.PATIENT.CREATE_PATIENT;

  return performAction(requestType, () =>
    doCreatePatient({patient: attrs})
  );
}
