import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    name: "",
    email: "",
    description: "",
    avatar: "",
    auth: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            let { email, name, username, auth, avatar, description, _id } =
                action.payload;
            state.auth = auth;
            state.description = description;
            state.email = email;
            state.name = name;
            state.username = username;
            state.avatar = avatar;
        },

        resetUser: (state) => {
            state.auth = false;
            state.description = "";
            state.email = "";
            state.name = "";
            state.username = "";
            state.avatar = "";
        },
    },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
