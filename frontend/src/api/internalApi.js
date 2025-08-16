import axios from "axios";

const internalApi = axios.create({
    baseURL: "http://localhost:5000/api/",
    withCredentials: true,
});

export const registerEmail = async (data) => {
    return await internalApi.post("/users/register-email", data);
};

export const verifyEmail = async (data) => {
    return await internalApi.post("/users/verify-email", data);
};

export const verifyRegistration = async () => {
    return await internalApi.get("/users/verify-registration");
};

export const registerProfile = async (data) => {
    return await internalApi.post("/users/register-profile", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const refresh = async () => {
    return await internalApi.get("/users/refresh");
};

export const login = async (data) => {
    return await internalApi.post("/users/login", data);
};
