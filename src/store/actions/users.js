import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_USER, START_FETCHING,SHOW_FOLLOWERS } from "../actionTypes";

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


export const follow =(idToFollow,currentUserName)=>{
  return dispatch=>{
    apiCall('put',`/api/users/${idToFollow}/${currentUserName}`)
    .then(res => {
     console.log(res);
     
    })
    .catch(err => {
      dispatch(addError(err));
    });
};
}
export const unfollow =(idToUnfollow,currentUserName)=>{
  console.log(idToUnfollow,currentUserName);
  return dispatch=>{
    apiCall('put',`/api/users/${idToUnfollow}/${currentUserName}/unfollow`)
    .catch(err => {
      dispatch(addError(err));
    });
};
}

export const showFollowers=()=>({
  type:SHOW_FOLLOWERS
})