import { LOAD_USER, START_FETCHING, SUCCESS } from "../actionTypes";

const initialState = {
    user:{},
    fetching: false
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

        default:
            return state;
    }
}
export default users;