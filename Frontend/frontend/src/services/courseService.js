import API from "../api/axios";

export const getAllCourses = async () => {

    const response = await API.get(
        "/api/courses"
    );

    return response.data;
};

export const createCourse = async (data) => {

    const response = await API.post(
        "/api/courses",
        data
    );

    return response.data;
};

export const getRecentCourses = async () => {

    const response = await API.get(
        "/api/courses/recent"
    );

    return response.data;
};