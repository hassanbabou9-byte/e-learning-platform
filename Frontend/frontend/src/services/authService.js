import API from "../api/axios";

export const register = async (data) => {

    const response = await API.post(
        "/api/students/register",
        data
    );

    return response.data;
};

export const login = async (data) => {

    const response = await API.post(
        "/api/students/login",
        data
    );

    return response.data;
};