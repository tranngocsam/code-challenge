import { submitRequest } from "../../utils/api_utils";

export function doLoadFormulations(params) {
  return submitRequest("/formulations", "get", params);
}

export function doLoadFormulationIngredients(formulationId, params) {
  return submitRequest("/formulations/" + formulationId + "/formulation_ingredients", "get", params);
}

export function doCreatePatient(params) {
  return submitRequest("/patients", "post", params);
}
