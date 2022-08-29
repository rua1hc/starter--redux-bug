// Action type
export const BUG_ADDED = "bugAdded";
export const BUG_REMOVED = "bugRemoved";
export const BUG_RESOLVED = "bugResolved";

// ACtion creator
export function bugAdded(description) {
    return {
        type: BUG_ADDED,
        payload: {
            description,
        },
    };
}

export function bugRemoved(id) {
    return {
        type: BUG_REMOVED,
        payload: {
            id,
        },
    };
}

export const bugResolved = (id) => ({
    type: BUG_RESOLVED,
    payload: {
        id,
    },
});

// REDUCER
let lastId = 0;

export default function reducer(state = [], action) {
    if (action.type === BUG_ADDED) {
        return [
            ...state,
            {
                id: ++lastId,
                description: action.payload.description,
                resolved: false,
            },
        ];
    } else if (action.type === BUG_REMOVED) {
        return state.filter((bug) => bug.id !== action.payload.id);
    } else if (action.type === BUG_RESOLVED) {
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
