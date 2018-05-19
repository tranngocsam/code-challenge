import constants from '../../constants';
import _ from "lodash";
import { handleLoadedData } from "../../utils/reducer_utils";

export default function sessionsReducer(state = {}, action) {
  const {type, status} = action;
  let additionalParams = action.additionalParams;
  let options = {};
  let data = {};

  switch (type) {
    case constants.SESSION.LOAD_SESSION_INFO:
      data.loadSessionInfoActionStatus = status;

      if (status === constants.REQUEST.LOADING_SUCCESS) {
        let responseData = (action.responseData || {}).data;

        data.currentUser = responseData.current_user;
        options.successData = data;
      } else if (status === constants.REQUEST.LOADING) {
        options.requestData = data;
      } else if (status === constants.REQUEST.LOADING_ERROR) {
        options.errorData = data;
      }

      return handleLoadedData(type, status, state, action, options);
    default:
      return state;
  }
}
