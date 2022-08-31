import axios from "axios";
import * as apiActions from "../api";

const api =
    ({ dispatch }) =>
    (next) =>
    async (action) => {
        if (action.type !== apiActions.apiCallBegin.type) return next(action);

        const { url, method, data, onSuccess, onError, onStart } =
            action.payload;

        if (onStart) dispatch({ type: onStart });
        next(action);

        try {
            const response = await axios.request({
                baseURL: "http://localhost:9001/api/",
                url,
                method,
                data,
                onSuccess,
                onError,
            });
            // general
            dispatch(apiActions.apiCallSuccess(response.data));
            // specific - populating store
            if (onSuccess)
                dispatch({ type: onSuccess, payload: response.data });
        } catch (ex) {
            // general
            dispatch(apiActions.apiCallFailed(ex.message));
            // specific
            if (onError) dispatch({ type: onError, payload: ex.message });
        }
    };

export default api;
