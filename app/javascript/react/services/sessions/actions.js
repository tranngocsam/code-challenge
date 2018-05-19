import _ from "lodash";
import constants from "../../constants";
import { performAction } from "../../utils/action_utils";
import {
  doLoadSessionInfo
} from "./apis";

export function loadSessionInfo(params) {
  var requestType = constants.SESSION.LOAD_SESSION_INFO;

  return performAction(requestType, () =>
    doLoadSessionInfo(params)
  );
}
