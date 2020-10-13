import rootReducer from './reducers';
import { createStore, applyMiddleware, compose } from "redux";
import logger from 'redux-logger'
import thunk from "redux-thunk";

export function configureStore() {
    const store = createStore(rootReducer, compose(applyMiddleware(thunk,logger)
    ));

    return store;
}