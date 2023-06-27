import {combineReducers} from "redux";
import PageReducer from "./PageReducer";
import searchReducer from "./SearchReducer";

const reducers = combineReducers({
    //all reducers with their key and value can be here
    search: searchReducer,
    page : PageReducer
});

export default reducers;