import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import Sidebar from "../components/Sidebar";

import { useAuth } from "../context/AuthContext";

import {
    getStudentCourses,
    cancelEnrollment
} from "../services/enrollmentService";

function MyCoursesPage() {

    const auth = useAuth();

    const [courses, setCourses] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchMyCourses();

    }, []);

    const fetchMyCourses = async () => {

        try {

            setLoading(true);

            const data =
                await getStudentCourses(
                    auth.user.studentId
                );

            setCourses(data);

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to load courses"
            );

        } finally {

            setLoading(false);
        }
    };

    const handleCancel = async (
        enrollmentId
    ) => {

        const confirmDelete =
            window.confirm(
                "Cancel this enrollment?"
            );

        if(!confirmDelete) return;

        try {

            await cancelEnrollment(
                enrollmentId
            );

            toast.success(
                "Enrollment cancelled"
            );

            fetchMyCourses();

        } catch (error) {

            toast.error(
                "Failed to cancel enrollment"
            );
        }
    };

    return (

        <div className="min-h-screen bg-slate-900 text-white">

            <Sidebar />

            <div className="ml-[280px] p-10">

                <div className="mb-10">

                    <h1 className="text-5xl font-bold">
                        My Courses
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Courses you are enrolled in
                    </p>

                </div>

                {
                    loading ? (

                        <div className="flex justify-center items-center h-[300px]">

                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                        </div>

                    ) : courses.length === 0 ? (

                        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-12 text-center">

                            <div className="text-7xl mb-4">
                                📚
                            </div>

                            <h2 className="text-3xl font-bold">
                                No Enrollments Yet
                            </h2>

                            <p className="text-slate-400 mt-3">
                                You are not enrolled in any course.
                            </p>

                        </div>

                    ) : (

                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                            {
                                courses.map(course => (

                                    <div
                                        key={course.enrollmentId}
                                        className="bg-slate-800 border border-slate-700 rounded-3xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all"
                                    >

                                        <div className="mb-4">

                                            <span className="bg-green-600 px-3 py-1 rounded-full text-xs">
                                                ENROLLED
                                            </span>

                                        </div>

                                        <h2 className="text-2xl font-bold mb-3">

                                            {course.title}

                                        </h2>

                                        <p className="text-slate-400 mb-5">

                                            {course.description}

                                        </p>

                                        <p className="text-blue-400 font-semibold mb-6">

                                            👨 {course.instructor}

                                        </p>

                                        <button
                                            onClick={() =>
                                                handleCancel(
                                                    course.enrollmentId
                                                )
                                            }
                                            className="w-full bg-red-600 hover:bg-red-700 p-3 rounded-xl font-semibold transition-all"
                                        >
                                            Cancel Enrollment
                                        </button>

                                    </div>

                                ))
                            }

                        </div>

                    )
                }

            </div>

        </div>
    );
}

export default MyCoursesPage;