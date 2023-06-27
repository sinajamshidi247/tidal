import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers/Index";
import thunk from "redux-thunk"

export const store = createStore(
    reducers,
    {},// default state,
    applyMiddleware(thunk)
)