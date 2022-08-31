import moment from "moment";
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import { apiCallBegin } from "./api";

let lastId = 0;

const slice = createSlice({
    name: "bugs",
    initialState: {
        list: [],
        loading: false,
        lastFetched: null,
    },
    reducers: {
        bugAssignToUser: (bugs, action) => {
            const { bugId, userId } = action.payload;
            const index = bugs.list.findIndex((bug) => bug.id === bugId);
            bugs.list[index].userId = userId;
        },
        bugAdded: (bugs, action) => {
            bugs.list.push(action.payload);
            // bugs.list.push({
            //     id: ++lastId,
            //     description: action.payload.description,
            //     resolved: false,
            // });
        },
        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex(
                (bug) => bug.id === action.payload.id
            );
            bugs.list[index].resolved = action.payload.resolved;
            bugs.list[index].userId = action.payload.userId;
        },
        bugRequested: (bugs, action) => {
            bugs.loading = true;
        },
        bugReceived: (bugs, action) => {
            bugs.list = action.payload;
            bugs.loading = false;
            bugs.lastFetched = Date.now();
        },

        bugRequestedFailed: (bugs, action) => {
            bugs.loading = false;
        },
    },
});

export const {
    bugAdded,
    bugResolved,
    bugAssignToUser,
    bugRequested,
    bugReceived,
    bugRequestedFailed,
} = slice.actions;
export default slice.reducer;

// export const loadBugs = () =>
//     apiCallBegin({
//         url: "/bugs",
//         onStart: bugRequested.type,
//         onSuccess: bugReceived.type,
//         onError: bugRequestedFailed.type,
//     });
export const loadBugs = () => (dispatch, getState) => {
    const { lastFetched } = getState().entities.bugs;
    const diffInMinute = moment().diff(moment(lastFetched), "minutes");
    if (diffInMinute < 10) return;

    dispatch(
        apiCallBegin({
            url: "/bugs",
            onStart: bugRequested.type,
            onSuccess: bugReceived.type,
            onError: bugRequestedFailed.type,
        })
    );
};

export const addBug = (bug) =>
    apiCallBegin({
        url: "/bugs",
        method: "post",
        data: bug,
        onSuccess: bugAdded.type,
    });

export const resolveBug = (bug) =>
    apiCallBegin({
        url: `/bugs/${bug.id}`,
        method: "patch",
        data: bug,
        onSuccess: bugResolved.type,
    });

// export const getUnresolvedBugs = (state) =>
//     state.entities.bugs.filter((bug) => !bug.resolved);

export const getUnresolvedBugs = createSelector(
    (state) => state.entities.bugs,
    (state) => state.entities.projects,
    (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
    createSelector(
        (state) => state.entities.bugs,
        (bugs) => bugs.filter((bug) => bug.userId === userId)
    );

// ***********************
// ***********************

// export const bugAdded = createAction("bugAdded");
// export const bugRemoved = createAction("bugRemoved");
// export const bugResolved = createAction("bugResolved");

// Action type
// export const BUG_ADDED = "bugAdded";
// export const BUG_REMOVED = "bugRemoved";
// export const BUG_RESOLVED = "bugResolved";

// ACtion creator
// export const  bugAdded = (description)=> {
//     return {
//         type: BUG_ADDED,
//         payload: {
//             description,
//         },
//     };
// }

// export const  bugRemoved=(id)=>  {
//     return {
//         type: BUG_REMOVED,
//         payload: {
//             id,
//         },
//     };
// }

// export const bugResolved = (id) => ({
//     type: BUG_RESOLVED,
//     payload: {
//         id,
//     },
// });

// REDUCER

// export default createReducer([], {
//     [bugAdded.type]: (state, action) => {
//         state.push({
//             id: ++lastId,
//             description: action.payload.description,
//             resolved: false,
//         });
//     },
//     // bugRemoved: (state, action)=>{

//     // },
//     [bugResolved.type]: (state, action) => {
//         const index = state.findIndex((bug) => bug.id === action.payload.id);
//         state[index].resolved = true;
//     },
// });

// export function reducer(state = [], action) {
//     if (action.type === bugAdded.type) {
//         return [
//             ...state,
//             {
//                 id: ++lastId,
//                 description: action.payload.description,
//                 resolved: false,
//             },
//         ];
//     } else if (action.type === bugRemoved.type) {
//         return state.filter((bug) => bug.id !== action.payload.id);
//     } else if (action.type === bugResolved.type) {
//         return state.map((bug) =>
//             bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
//         );

//         //WRONG implementation!!!
//         // const _state = [...state];
//         // const bug = state.find((s) => s.id === action.payload.id);
//         // if (!bug) return state;
//         // const index = state.indexOf(bug);
//         // _state[index].resolved = true;
//         // return _state;
//     }

//     return state;
// }
