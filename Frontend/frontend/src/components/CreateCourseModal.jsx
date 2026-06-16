import { useState } from "react";

import toast from "react-hot-toast";

import {
    createCourse
} from "../services/courseService";

function CreateCourseModal({
    isOpen,
    onClose,
    onCourseCreated
}) {

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        instructor: "",
        maxCapacity: 3,
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(loading) return;

        try {

            setLoading(true);

            await createCourse(formData);

            toast.success(
                "Course created successfully"
            );

            onCourseCreated();

            onClose();

        } catch (error) {

            toast.error(
                error.response?.data?.message
                || "Failed to create course"
            );

        } finally {

            setLoading(false);
        }
    };

    if(!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-slate-800 w-[500px] p-8 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300">

                <h2 className="text-3xl font-bold text-white mb-6">
                    Create Course
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        name="title"
                        placeholder="Course Title"
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />

                    <textarea
                        name="description"
                        placeholder="Course Description"
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-slate-700 text-white outline-none h-32 focus:ring-2 focus:ring-blue-500 transition-all"
                    />

                    <input
                        type="text"
                        name="instructor"
                        placeholder="Instructor"
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />

                    <input
                        type="number"
                        name="maxCapacity"
                        value={formData.maxCapacity}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />

                    <div className="flex gap-4">

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 p-4 rounded-xl text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {
                                loading
                                ? "Creating..."
                                : "Create"
                            }
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-slate-600 hover:bg-slate-700 p-4 rounded-xl text-white font-semibold transition-all"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default CreateCourseModal