import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
    name: "projects",
    initialState: [],
    reducers: {
        prjAdded: (prj, action) => {
            prj.push({
                id: ++lastId,
                name: action.payload.name,
            });
        },
    },
});

export const { prjAdded } = slice.actions;
export default slice.reducer;
