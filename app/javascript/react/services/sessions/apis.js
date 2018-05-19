import { submitRequest } from "../../utils/api_utils";

export function doLoadSessionInfo(params) {
  return submitRequest("/sessions/info", "get", params);
}
