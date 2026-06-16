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

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchDashboardData();

    }, []);

    const fetchDashboardData = async () => {

        try {

            setLoading(true);

            const [
                students,
                courses,
                enrollments,
                recentCoursesData
            ] = await Promise.all([
                getTotalStudents(),
                getTotalCourses(),
                getTotalEnrollments(),
                getRecentCourses()
            ]);

            setStats({
                students,
                courses,
                enrollments,
            });

            setRecentCourses(
                recentCoursesData
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

                {/* Header */}

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

                            {/* Statistics */}

                            <div className="grid lg:grid-cols-3 gap-6 mb-10">

                                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 transition-all">

                                    <div className="flex justify-between items-center">

                                        <div>

                                            <h2 className="text-xl text-slate-300">
                                                Students
                                            </h2>

                                            <p className="text-5xl mt-4 font-bold text-blue-500">
                                                {stats.students}
                                            </p>

                                        </div>

                                        <div className="bg-blue-500/20 p-4 rounded-2xl">

                                            <Users
                                                size={35}
                                                className="text-blue-400"
                                            />

                                        </div>

                                    </div>

                                </div>

                                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20 transition-all">

                                    <div className="flex justify-between items-center">

                                        <div>

                                            <h2 className="text-xl text-slate-300">
                                                Courses
                                            </h2>

                                            <p className="text-5xl mt-4 font-bold text-green-500">
                                                {stats.courses}
                                            </p>

                                        </div>

                                        <div className="bg-green-500/20 p-4 rounded-2xl">

                                            <BookOpen
                                                size={35}
                                                className="text-green-400"
                                            />

                                        </div>

                                    </div>

                                </div>

                                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 transition-all">

                                    <div className="flex justify-between items-center">

                                        <div>

                                            <h2 className="text-xl text-slate-300">
                                                Enrollments
                                            </h2>

                                            <p className="text-5xl mt-4 font-bold text-purple-500">
                                                {stats.enrollments}
                                            </p>

                                        </div>

                                        <div className="bg-purple-500/20 p-4 rounded-2xl">

                                            <GraduationCap
                                                size={35}
                                                className="text-purple-400"
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Analytics */}

                            <div className="grid lg:grid-cols-2 gap-6">

                                <StatisticsChart stats={stats} />

                                {/* Recent Courses */}

                                <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-3xl p-8">

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
                                                            className="p-4 rounded-2xl bg-slate-700/40 hover:bg-slate-700/60 transition-all"
                                                        >

                                                            <h3 className="font-semibold text-lg">
                                                                {course.title}
                                                            </h3>

                                                            <p className="text-slate-400 text-sm mt-1">
                                                                {course.instructor}
                                                            </p>

                                                            <div className="mt-2 text-sm text-blue-400">
                                                                {course.currentEnrollments}
                                                                /
                                                                {course.maxCapacity}
                                                                {" "}students
                                                            </div>

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