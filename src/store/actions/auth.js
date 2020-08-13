import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { add_error, remove_error, add_Error } from "./errors";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function logout(){
    return dispatch=>{
        localStorage.clear();
        dispatch(setCurrentUser({}));
    }
}
export function authUser(type, userData) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', `/api/auth/${type}`, userData).then(({ token, ...user }) => {
                localStorage.setItem('jwtToken', token)
                dispatch(setCurrentUser(user));
                dispatch(remove_error())
                resolve();
            }).catch(err=>{
                dispatch (add_Error(err.message));
                reject(); //indicates that API call failed
            })
        });
    }
}