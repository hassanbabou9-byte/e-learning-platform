import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import StatisticsChart from "../components/StatisticsChart";

import { useAuth } from "../context/AuthContext";

import {
    getTotalStudents,
    getTotalCourses,
    getTotalEnrollments
} from "../services/dashboardService";

import {
    getRecentCourses
} from "../services/courseService";

import {
    getStudentCourses
} from "../services/enrollmentService";

import {
    Users,
    BookOpen,
    GraduationCap
} from "lucide-react";

function DashboardPage() {

    const auth = useAuth();

    const [stats, setStats] = useState({
        students: 0,
        courses: 0,
        enrollments: 0,
    });

    const [recentCourses, setRecentCourses] =
        useState([]);

    const [myCoursesCount, setMyCoursesCount] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        if(auth.user?.studentId) {

            fetchDashboardData();
        }

    }, [auth.user]);

    const fetchDashboardData = async () => {

        try {

            setLoading(true);

            const [
                students,
                courses,
                enrollments,
                recentCoursesData,
                myCourses
            ] = await Promise.all([
                getTotalStudents(),
                getTotalCourses(),
                getTotalEnrollments(),
                getRecentCourses(),
                getStudentCourses(
                    auth.user.studentId
                )
            ]);

            setStats({
                students,
                courses,
                enrollments,
            });

            setRecentCourses(
                recentCoursesData
            );

            setMyCoursesCount(
                myCourses.length
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

            <Sidebar />

            <div className="ml-[280px] p-10">

                <div className="mb-12">

                    <h1 className="text-5xl font-bold">

                        Welcome Back,

                        <span className="text-blue-500 ml-2">
                            {auth.user?.firstName || "Student"}
                        </span>

                        👋

                    </h1>

                    <p className="text-slate-400 mt-3 text-lg">
                        Monitor your learning activity and platform statistics.
                    </p>

                </div>

                {
                    loading ? (

                        <div className="flex justify-center items-center h-[400px]">

                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                        </div>

                    ) : (

                        <>

                            <div className="grid lg:grid-cols-4 gap-6 mb-10">

                                <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">

                                    <h2 className="text-xl text-slate-300">
                                        Students
                                    </h2>

                                    <p className="text-5xl mt-4 font-bold text-blue-500">
                                        {stats.students}
                                    </p>

                                </div>

                                <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">

                                    <h2 className="text-xl text-slate-300">
                                        Courses
                                    </h2>

                                    <p className="text-5xl mt-4 font-bold text-green-500">
                                        {stats.courses}
                                    </p>

                                </div>

                                <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">

                                    <h2 className="text-xl text-slate-300">
                                        Enrollments
                                    </h2>

                                    <p className="text-5xl mt-4 font-bold text-purple-500">
                                        {stats.enrollments}
                                    </p>

                                </div>

                                <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">

                                    <h2 className="text-xl text-slate-300">
                                        My Courses
                                    </h2>

                                    <p className="text-5xl mt-4 font-bold text-orange-500">
                                        {myCoursesCount}
                                    </p>

                                </div>

                            </div>

                            <div className="grid lg:grid-cols-2 gap-6">

                                <StatisticsChart stats={stats} />

                                <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8">

                                    <h2 className="text-2xl font-bold mb-6">
                                        Recent Courses
                                    </h2>

                                    {
                                        recentCourses.length === 0 ? (

                                            <p className="text-slate-400">
                                                No courses found
                                            </p>

                                        ) : (

                                            <div className="space-y-4">

                                                {
                                                    recentCourses.map(course => (

                                                        <div
                                                            key={course.id}
                                                            className="p-4 rounded-2xl bg-slate-700/40"
                                                        >

                                                            <h3 className="font-semibold text-lg">
                                                                {course.title}
                                                            </h3>

                                                            <p className="text-slate-400 text-sm">
                                                                {course.instructor}
                                                            </p>

                                                        </div>

                                                    ))
                                                }

                                            </div>

                                        )
                                    }

                                </div>

                            </div>

                        </>

                    )
                }

            </div>

        </div>
    );
}

export default DashboardPage;