// import { legacy_createStore as createStore } from "redux";
// import { devToolsEnhancer } from "redux-devtools-extension";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import reducer from "./reducers";

import toast from "./middleware/toast";
import api from "./middleware/api";

export default function () {
    // const store = configureStore(reducer, devToolsEnhancer({ trace: true }));
    return configureStore({
        reducer,
        middleware: [...getDefaultMiddleware(), api],
    });
}
