import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

let lastId = 0;

// createSlice({
//     name: bugs,
//     initialState: [],
//     reducers: {
//         bugAdded: (state, action) => {
//             state.push({
//                 id: ++lastId,
//                 description: action.payload.description,
//                 resolved: false,
//             });
//         },
//         bugResolved: (state, action) => {
//             const index = state.findIndex(
//                 (bug) => bug.id === action.payload.id
//             );
//             state[index].resolved = true;
//         },
//     },
// });

export const bugAdded = createAction("bugAdded");
export const bugRemoved = createAction("bugRemoved");
export const bugResolved = createAction("bugResolved");

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

export default createReducer([], {
    [bugAdded.type]: (state, action) => {
        state.push({
            id: ++lastId,
            description: action.payload.description,
            resolved: false,
        });
    },
    // bugRemoved: (state, action)=>{

    // },
    [bugResolved.type]: (state, action) => {
        const index = state.findIndex((bug) => bug.id === action.payload.id);
        state[index].resolved = true;
    },
});

export function reducer(state = [], action) {
    if (action.type === bugAdded.type) {
        return [
            ...state,
            {
                id: ++lastId,
                description: action.payload.description,
                resolved: false,
            },
        ];
    } else if (action.type === bugRemoved.type) {
        return state.filter((bug) => bug.id !== action.payload.id);
    } else if (action.type === bugResolved.type) {
        return state.map((bug) =>
            bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
        );

        //WRONG implementation!!!
        // const _state = [...state];
        // const bug = state.find((s) => s.id === action.payload.id);
        // if (!bug) return state;
        // const index = state.indexOf(bug);
        // _state[index].resolved = true;
        // return _state;
    }

    return state;
}
