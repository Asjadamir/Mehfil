import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: "",
    username: "",
    name: "",
    email: "",
    description: "",
    avatar: "",
    csrfToken: "",
    auth: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            let {
                email,
                name,
                username,
                auth,
                avatar,
                description,
                userId,
                csrfToken,
            } = action.payload;
            state.auth = auth;
            state.userId = userId;
            state.description = description;
            state.email = email;
            state.name = name;
            state.username = username;
            state.csrfToken = csrfToken;
            state.avatar = avatar;
        },

        resetUser: (state) => {
            state.auth = false;
            state.description = "";
            state.userId = "";
            state.email = "";
            state.name = "";
            state.username = "";
            state.avatar = "";
            state.csrfToken = "";
        },
    },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
