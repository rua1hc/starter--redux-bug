import { createAction } from "@reduxjs/toolkit";

export const apiCallBegin = createAction("apiCallBegin");
export const apiCallSuccess = createAction("apiCallSuccess");
export const apiCallFailed = createAction("apiCallFailed");
