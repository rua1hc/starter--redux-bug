// import { legacy_createStore as createStore } from "redux";
// import { devToolsEnhancer } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";

import reducer from "./bugs";

export default function () {
    // const store = configureStore(reducer, devToolsEnhancer({ trace: true }));
    return configureStore({ reducer });
}
