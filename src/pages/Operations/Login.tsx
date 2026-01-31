// src/pages/LoginPage.tsx
import { useState } from "react";
import { toast } from "react-fox-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Sms, Lock } from "iconsax-react";

// Services
import { useLoginAdmin } from "@/services/mutations.service";

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const loginAdmin = useLoginAdmin();

    const handleChange =
        (field: keyof typeof credentials) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setCredentials((prev) => ({ ...prev, [field]: e.target.value }));
            };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        loginAdmin.mutate(credentials, {
            onSuccess: (response) => {
                toast.success(response.data.message || "Login was successful!");
                setLoading(false);

                if (searchParams.has("redirect")) {
                    navigate(String(searchParams.get("redirect")));
                } else {
                    navigate("/admin/transactions");
                }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                toast.error(
                    error?.response?.data?.message ||
                    "Something went wrong. Please try again."
                );
                setLoading(false);
            },
        });
    };

    return (
        <main className="flex justify-center items-center bg-lightBlack px-4 rounded-2xl w-full max-w-xl">
            <section className="p-4 md:p-6 xl:p-8 w-full">
                <header className="mb-6 text-center">
                    <h1 className="font-semibold text-neutral-100 text-xl md:text-2xl">
                        Admin Login
                    </h1>
                    <p className="mt-1 text-neutral-500 text-sm">
                        Sign in to continue to your dashboard
                    </p>
                </header>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-neutral-200 text-sm">Email</label>
                        <div className="flex items-center gap-2 bg-black px-4 py-3 border border-neutral-800 focus-within:border-primary rounded-xl transition">
                            <Sms size={18} className="text-neutral-500" />
                            <input type="email" value={credentials.email} onChange={handleChange("email")} placeholder="you@example.com" required
                                className="bg-transparent focus:outline-none w-full text-neutral-100 placeholder:text-neutral-500 text-sm md:text-base" />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <label className="text-neutral-200 text-sm">Password</label>
                        <div className="flex items-center gap-2 bg-black px-4 py-3 border border-neutral-800 focus-within:border-primary rounded-xl transition">
                            <Lock size={18} className="text-neutral-500" />
                            <input type="password" value={credentials.password} onChange={handleChange("password")} placeholder="••••••••" required
                                className="bg-transparent focus:outline-none w-full text-neutral-100 placeholder:text-neutral-500 text-sm md:text-base" />
                        </div>
                    </div>

                    <button type="submit" disabled={loading}
                        className="bg-primary hover:bg-yellow-500 disabled:opacity-50 mt-2 py-3 rounded-xl w-full font-semibold text-black transition disabled:cursor-not-allowed">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </section>
        </main>
    );
};

export default LoginPage;
