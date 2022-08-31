import { combineReducers } from "redux";
import bugReducer from "./bugs";
import prjReducer from "./projects";
import userReducer from "./users";

export default combineReducers({
    bugs: bugReducer,
    projects: prjReducer,
    users: userReducer,
});
