import {LOAD_MESSAGES,REMOVE_MESSAGE} from "../actionTypes";

const message=(state=[],action)=>{
    switch(action.type){
        case REMOVE_MESSAGE:
            return state.filter(message=>message._id!==action.id);
        case LOAD_MESSAGES:
            return [...action.messages];
        default:
            return state;
    }
}
export default message;