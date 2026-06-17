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
export const getStudentCourses =
    async (studentId) => {

        const response =
            await API.get(
                `/api/enrollments/student/${studentId}`
            );

        return response.data;
    };

export const cancelEnrollment =
    async (id) => {

        await API.delete(
            `/api/enrollments/${id}`
        );
    };