import API from "../api/axios";

export const getTotalStudents = async () => {

    const response = await API.get(
        "/api/students/count"
    );

    return response.data;
};

export const getTotalCourses = async () => {

    const response = await API.get(
        "/api/courses/count"
    );

    return response.data;
};

export const getTotalEnrollments = async () => {

    const response = await API.get(
        "/api/enrollments/count"
    );

    return response.data;
};