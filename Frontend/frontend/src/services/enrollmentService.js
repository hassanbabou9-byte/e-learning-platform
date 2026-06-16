import API from "../api/axios";

export const enrollStudent = async (
    studentId,
    courseId
) => {

    const response = await API.post(
        "/api/enrollments",
        {
            studentId,
            courseId,
        }
    );

    return response.data;
};