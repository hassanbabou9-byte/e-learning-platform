import {
    LayoutDashboard,
    BookOpen,
    LogOut,
    GraduationCap
} from "lucide-react";

import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const auth = useAuth();

    const logout = () => {

        auth.logout();

        navigate("/");
    };

    const menuClass = (path) =>
        `flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
            location.pathname === path
                ? "bg-blue-600 shadow-lg"
                : "hover:bg-slate-700"
        }`;

    return (

        <div className="w-[280px] h-screen bg-slate-950 border-r border-slate-800 text-white p-6 fixed flex flex-col">

            <div>

                <div className="flex items-center gap-3 mb-12">

                    <GraduationCap
                        size={40}
                        className="text-blue-500"
                    />

                    <div>

                        <h1 className="text-2xl font-bold">
                            E-Learning
                        </h1>

                        <p className="text-slate-400 text-sm">
                            Student Portal
                        </p>

                    </div>

                </div>

                <div className="space-y-3">

                    <Link
                        to="/dashboard"
                        className={menuClass("/dashboard")}
                    >
                        <LayoutDashboard size={22}/>
                        Dashboard
                    </Link>

                    <Link
                        to="/courses"
                        className={menuClass("/courses")}
                    >
                        <BookOpen size={22}/>
                        Courses
                    </Link>

                </div>

            </div>

            <div className="mt-auto">

                <div className="bg-slate-800 rounded-xl p-4 mb-4 border border-slate-700">

    <p className="font-semibold truncate">

        {
            auth.user?.firstName &&
            auth.user?.lastName
                ? `${auth.user.firstName} ${auth.user.lastName}`
                : "Student"
        }

    </p>

    <p className="text-sm text-slate-400">
        Student
    </p>

</div>

                <button
                    onClick={logout}
                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-red-600 transition-all w-full text-left"
                >
                    <LogOut size={22}/>
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Sidebar;