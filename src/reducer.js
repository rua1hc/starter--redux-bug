import * as actions from "./actionTypes";

let lastId = 0;

export default function reducer(state = [], action) {
    if (action.type === actions.BUG_ADDED) {
        return [
            ...state,
            {
                id: ++lastId,
                description: action.payload.description,
                resolved: false,
            },
        ];
    } else if (action.type === actions.BUG_REMOVED) {
        return state.filter((bug) => bug.id !== action.payload.id);
    } else if (action.type === actions.BUG_RESOLVED) {
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
