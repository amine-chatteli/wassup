import { showFollowers } from "../actions/users";
import { LOAD_USER, START_FETCHING, SHOW_FOLLOWERS } from "../actionTypes";

const initialState = {
    user:{},
    fetching: false,
    showFollowers:false
}

const users = (state=initialState, action) => {
    switch (action.type) {
        case START_FETCHING:
            return {
                user:{},
                fetching: true
            }

        case LOAD_USER:
            return { 
                user:action.user,
                fetching:false
             };
        case SHOW_FOLLOWERS:
            return {
                ...state,
                showFollowers:!state.showFollowers
            }
        default:
            return state;
    }
}
export default users;