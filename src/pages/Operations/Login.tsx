import { useState } from "react";
import { toast } from "react-fox-toast";
import { useNavigate } from "react-router-dom";

//Services
import { useLoginAdmin } from "@/services/mutations.service";

const LoginPage = () => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (field: keyof typeof credentials) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const loginAdmin = useLoginAdmin()
    const handleLogin = async () => {

        setLoading(true);
        loginAdmin.mutate(credentials, {
            onSuccess: (response) => {
                toast.success(response.data.message || "Login was successfully!")
                setLoading(false);
                navigate('/admin/dashboard')
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Sorry, we couldn't create the account now, kindly try again later.";
                toast.error(message);
                setLoading(false);
            },
        })
    };

    return (
        <main className="bg-lightBlack mx-auto p-6 rounded-xl w-full max-w-xl text-neutral-100">
            <h2 className="mb-4 font-semibold text-lg md:text-xl xl:text-2xl">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input type="email" value={credentials.email} onChange={handleChange("email")} placeholder="Email" className="bg-black px-4 py-3 border border-neutral-800 rounded-xl focus:outline-none text-sm md:text-base xl:text-lg" required
                />
                <input type="password" value={credentials.password} onChange={handleChange("password")} placeholder="Password" className="bg-black px-4 py-3 border border-neutral-800 rounded-xl focus:outline-none text-sm md:text-base xl:text-lg" required />
                <button type="submit" disabled={loading} className="bg-primary hover:bg-yellow-600 disabled:opacity-50 py-3 rounded-xl font-semibold text-black transition-colors">
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </main>
    );
};

export default LoginPage;
