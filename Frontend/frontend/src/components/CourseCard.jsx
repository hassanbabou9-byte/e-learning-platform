import { Users } from "lucide-react";

function CourseCard({
    course,
    onEnroll,
    enrollingId
}) {

    const isLoading =
        enrollingId === course.id;

    const percentage =
        Math.min(
            (
                course.currentEnrollments /
                course.maxCapacity
            ) * 100,
            100
        );
        const isFull =
    course.currentEnrollments >=
    course.maxCapacity;

    return (

        <div className="bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300">

            <div className="mb-5">

                <span className="bg-blue-600 text-xs px-3 py-1 rounded-full">
                    COURSE
                </span>

            </div>

            <h2 className="text-2xl font-bold mb-3">
                {course.title}
            </h2>

            <p className="text-slate-400 mb-6 line-clamp-3">
                {course.description}
            </p>

            <p className="text-blue-400 font-semibold mb-4">
                👨 {course.instructor}
            </p>

            <div className="flex justify-between mb-2">

                <div className="flex items-center gap-2">

                    <Users size={18}/>

                    <span>
                        {course.currentEnrollments}
                        /
                        {course.maxCapacity}
                    </span>

                </div>

                <span>
                    {Math.round(percentage)}%
                </span>

            </div>

            <div className="h-2 bg-slate-700 rounded-full mb-6">

                <div
                    className="h-2 bg-green-500 rounded-full transition-all duration-500"
                    style={{
                        width: `${percentage}%`
                    }}
                />

            </div>
            <p
    className={`text-sm font-semibold mb-4 ${
        percentage >= 90
            ? "text-red-400"
            : percentage >= 60
            ? "text-yellow-400"
            : "text-green-400"
    }`}
>
    {
        isFull
            ? "Course Full"
            : percentage >= 60
            ? "Filling Fast"
            : "Available"
    }
</p>
            <button
    disabled={isLoading || isFull}
    onClick={() => onEnroll(course.id)}
    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 p-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
>
    {
        isFull
            ? "Course Full"
            : isLoading
            ? "Enrolling..."
            : "Enroll Now"
    }
</button>
        </div>
    );
}

export default CourseCard;