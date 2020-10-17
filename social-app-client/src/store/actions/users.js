import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_USER, START_FETCHING, SUCCESS } from "../actionTypes";

export const startFetching = () => ({
  type: START_FETCHING
})
export const loadUser = user => ({
  type: LOAD_USER,
  user
});

export const fetchUser = (id) => {
  return dispatch => {
    dispatch(startFetching())
    apiCall("get", `/api/users/${id}`)
      .then(res => {
        dispatch(loadUser(res));
       
      })
      .catch(err => {
        dispatch(addError(err));
      });
  };
};
