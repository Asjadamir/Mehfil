import { createSlice } from "@reduxjs/toolkit";

const initialState = { csrfToken: "" };

const csrfSlice = createSlice({
    name: "csrf",
    initialState,
    reducers: {
        setCsrf: (state, action) => {
            state.csrfToken = action.payload;
        },

        resetCsrf: (state) => {
            state.csrfToken = "";
        },
    },
});

export const selectCsrfToken = (state) => state.csrf.csrfToken;
export const { resetCsrf, setCsrf } = csrfSlice.actions;
export default csrfSlice.reducer;
