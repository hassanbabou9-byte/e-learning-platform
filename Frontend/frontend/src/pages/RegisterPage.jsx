import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

import {
    Eye,
    EyeOff
} from "lucide-react";

import { register } from "../services/authService";

function RegisterPage() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.password
        ) {

            return toast.error(
                "Please fill all fields"
            );
        }

        if (
            formData.password !==
            formData.confirmPassword
        ) {

            return toast.error(
                "Passwords do not match"
            );
        }

        try {

            setLoading(true);

            await register(formData);

            toast.success(
                "Account created successfully"
            );

            navigate("/");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-green-950">

            <div className="w-[500px] bg-slate-800/80 backdrop-blur-lg border border-slate-700 rounded-3xl p-10 shadow-2xl">

                <h1 className="text-4xl font-bold text-center text-white mb-2">
                    Create Account
                </h1>

                <p className="text-slate-400 text-center mb-8">
                    Join the E-Learning Platform
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-slate-700 text-white"
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-slate-700 text-white"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-slate-700 text-white"
                    />

                    <div className="relative">

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full p-4 rounded-xl bg-slate-700 text-white"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            className="absolute right-4 top-4"
                        >
                            {
                                showPassword
                                    ? <EyeOff size={18}/>
                                    : <Eye size={18}/>
                            }
                        </button>

                    </div>

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-slate-700 text-white"
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 p-4 rounded-xl font-semibold"
                    >
                        {
                            loading
                                ? "Creating account..."
                                : "Register"
                        }
                    </button>

                </form>

                <p className="text-center text-slate-400 mt-6">

                    Already have an account?

                    <Link
                        to="/"
                        className="text-green-400 ml-2 hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default RegisterPage;