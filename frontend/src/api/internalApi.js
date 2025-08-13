import axios from "axios";

const internalApi = axios.create({
    baseURL: "http://localhost:5000/api/",
    withCredentials: true,
    timeout: 7000,
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
    return await internalApi.get("/users/register-profile", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
