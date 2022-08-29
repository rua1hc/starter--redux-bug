import { combineReducers } from "redux";
import bugReducer from "./bugs";
import prjReducer from "./projects";

export default combineReducers({
    bugs: bugReducer,
    projects: prjReducer,
});
