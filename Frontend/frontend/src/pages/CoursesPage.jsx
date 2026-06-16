import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import CourseCard from "../components/CourseCard";
import CreateCourseModal from "../components/CreateCourseModal";

import { useAuth } from "../context/AuthContext";

import { getAllCourses } from "../services/courseService";
import { enrollStudent } from "../services/enrollmentService";

function CoursesPage() {

    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [enrollingId, setEnrollingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const auth = useAuth();

    const filteredCourses = courses.filter(course =>
        course.title
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {

        try {

            setLoadingCourses(true);

            const data = await getAllCourses();

            setCourses(data);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load courses");

        } finally {

            setLoadingCourses(false);
        }
    };

    const handleEnroll = async (courseId) => {

        if (enrollingId) return;

        try {

            setEnrollingId(courseId);

            await enrollStudent(
                auth.user.studentId,
                courseId
            );

            toast.success("Enrollment successful");

            fetchCourses();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Enrollment failed"
            );

        } finally {

            setEnrollingId(null);
        }
    };

    const totalCapacity = courses.reduce(
        (sum, course) => sum + course.maxCapacity,
        0
    );

    const totalEnrollments = courses.reduce(
        (sum, course) => sum + course.currentEnrollments,
        0
    );

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

            <Sidebar />

            <div className="ml-[280px] p-10">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-5xl font-bold">
                            Courses
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Discover and enroll in available courses
                        </p>

                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                        Create Course
                    </button>

                </div>

                {/* Search Bar */}

                <div className="mb-8">

                    <div className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4">

                        <input
                            type="text"
                            placeholder="🔍 Search by course title..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="w-full bg-transparent outline-none text-white placeholder:text-slate-400"
                        />

                    </div>

                </div>

                {/* Statistics Cards */}

                <div className="grid md:grid-cols-3 gap-5 mb-10">

                    <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">

                        <p className="text-slate-400 text-sm">
                            Available Courses
                        </p>

                        <h2 className="text-4xl font-bold mt-2 text-blue-400">
                            {courses.length}
                        </h2>

                    </div>

                    <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">

                        <p className="text-slate-400 text-sm">
                            Total Capacity
                        </p>

                        <h2 className="text-4xl font-bold mt-2 text-green-400">
                            {totalCapacity}
                        </h2>

                    </div>

                    <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">

                        <p className="text-slate-400 text-sm">
                            Total Enrollments
                        </p>

                        <h2 className="text-4xl font-bold mt-2 text-purple-400">
                            {totalEnrollments}
                        </h2>

                    </div>

                </div>

                {/* Content */}

                {
                    loadingCourses ? (

                        <div className="flex items-center justify-center h-[300px]">

                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                        </div>

                    ) : filteredCourses.length === 0 ? (

                        <div className="text-center py-20">

                            <div className="text-7xl mb-4">
                                📚
                            </div>

                            <h2 className="text-3xl font-bold mb-2">
                                No Courses Found
                            </h2>

                            <p className="text-slate-400">
                                Try another search or create a new course.
                            </p>

                        </div>

                    ) : (

                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                            {
                                filteredCourses.map(course => (

                                    <CourseCard
                                        key={course.id}
                                        course={course}
                                        onEnroll={handleEnroll}
                                        enrollingId={enrollingId}
                                    />

                                ))
                            }

                        </div>

                    )
                }

                <CreateCourseModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCourseCreated={fetchCourses}
                />

            </div>

        </div>
    );
}

export default CoursesPage;