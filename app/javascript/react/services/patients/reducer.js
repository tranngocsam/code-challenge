import constants from '../../constants';
import _ from "lodash";
import { handleLoadedData } from "../../utils/reducer_utils";

export default function patientsReducer(state = {}, action) {
  const {type, status} = action;
  let additionalParams = action.additionalParams;
  let options = {};
  let data = {};

  switch (type) {
    case constants.PATIENT.LOAD_FORMULATIONS:
      if (status == constants.REQUEST.LOADING) {
        options.requestData = {
          formulationsTimestamp: additionalParams.timestamp
        };
      } else if (status === constants.REQUEST.LOADING_SUCCESS) {
        let loadingFormulationsTimestamp = state.formulationsTimestamp;
        let foundFormulationsTimestamp = additionalParams.timestamp;

        // Avoid set the wrong results when the latter search finishes before the former search.
        if (loadingFormulationsTimestamp == foundFormulationsTimestamp) {
          data.formulations = (action.responseData || {}).data;
          options.successData = data;
        } else {
          return state;
        }
      }

      return handleLoadedData(type, status, state, action, options);
    case constants.PATIENT.LOAD_FORMULATION_INGREDIENTS:
      if (status == constants.REQUEST.LOADING) {
        options.requestData = {
          formulationIngredientsTimestamp: additionalParams.timestamp
        };
      } else if (status === constants.REQUEST.LOADING_SUCCESS) {
        let loadingFormulationIngredientsTimestamp = state.formulationIngredientsTimestamp;
        let foundFormulationIngredientsTimestamp = additionalParams.timestamp;

        // Avoid set the wrong results when the latter search finishes before the former search.
        if (loadingFormulationIngredientsTimestamp == foundFormulationIngredientsTimestamp) {
          data.formulationIngredients = (action.responseData || {}).data;
          options.successData = data;
        } else {
          return state;
        }
      }

      return handleLoadedData(type, status, state, action, options);
    case constants.PATIENT.CREATE_PATIENT:
      if (status == constants.REQUEST.LOADING_SUCCESS) {
        data.createdPatient = (action.responseData || {}).data;
        options.successData = data;
      }

      return handleLoadedData(type, status, state, action, options);
    default:
      return state;
  }
}
