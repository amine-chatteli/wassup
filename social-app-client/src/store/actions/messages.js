import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_MESSAGES, REMOVE_MESSAGE, REMOVE_ERROR } from "../actionTypes";
import message from "../reducers/messages";

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
});


export const removeMessage = (user_id, message_id) => {
 console.log(user_id,message_id);
  return dispatch => {
    return apiCall("delete", `/api/${user_id}/messages/${message_id}`)
      .then(() => dispatch(remove(message_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};

export const fetchMessages = () => {
  return dispatch => {
    return apiCall("GET", "/api/messages")
      .then(res => {
        dispatch(loadMessages(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const postNewMessage = text => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/${id}/messages`, { text })
    .then(res => { })
    .catch(err => addError(err.message));
};

export const updateMessage=(user_id,message_id,text)=>{
  return dispatch => {
    return apiCall("put", `/api/${user_id}/messages/${message_id}/`,{text})
    .then(res => {
      dispatch(loadMessages(res));
    })
      .catch(err => {
        addError(err.message);
      });
  };
}