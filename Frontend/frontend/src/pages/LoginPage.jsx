import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

import {
    Eye,
    EyeOff,
    Mail,
    Lock
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { login } from "../services/authService";

function LoginPage() {

    const navigate = useNavigate();

    const auth = useAuth();

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.email || !formData.password) {

            return toast.error(
                "Please fill all fields"
            );
        }

        try {

            setLoading(true);

            const response =
                await login(formData);

            auth.login(response.token);

            toast.success(
                "Welcome back!"
            );

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Invalid credentials"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">

            <div className="w-[450px] bg-slate-800/80 backdrop-blur-lg border border-slate-700 rounded-3xl p-10 shadow-2xl">

                <h1 className="text-4xl font-bold text-center text-white mb-2">
                    Welcome Back
                </h1>

                <p className="text-slate-400 text-center mb-8">
                    Login to your account
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div className="relative">

                        <Mail
                            size={18}
                            className="absolute left-4 top-4 text-slate-400"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className="w-full pl-12 p-4 rounded-xl bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div className="relative">

                        <Lock
                            size={18}
                            className="absolute left-4 top-4 text-slate-400"
                        />

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full pl-12 pr-12 p-4 rounded-xl bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            className="absolute right-4 top-4 text-slate-400"
                        >
                            {
                                showPassword
                                    ? <EyeOff size={18}/>
                                    : <Eye size={18}/>
                            }
                        </button>

                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-xl font-semibold transition-all disabled:opacity-50"
                    >
                        {
                            loading
                                ? "Signing in..."
                                : "Login"
                        }
                    </button>

                </form>

                <p className="text-center text-slate-400 mt-6">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-400 ml-2 hover:underline"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default LoginPage;