import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";


export const add_Error = error => ({
    type: ADD_ERROR,
    error
})
export const remove_error = () => ({
    type: REMOVE_ERROR
})