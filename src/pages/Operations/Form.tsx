import { useState } from "react";
import { toast } from "react-fox-toast";

//Services
import { useCreateSampleAdmin } from "@/services/mutations.service";

const Form = () => {

    //States
    const [updating, setUpdating] = useState<boolean>(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        role: "" as "admin" | "super_admin"
    });

    //Functions
    const handleChange = (field: keyof typeof formValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const createAdmin = useCreateSampleAdmin();
    const handleSubmit = () => {

        if (!formValues.email || !formValues.password || !formValues.role) toast.error("Kindly fill the required field.");
        setUpdating(true)
        createAdmin.mutate(formValues, {
            onSuccess: (response) => {
                toast.success(response.data.message || "Admin account was created successfully!")
                setUpdating(false);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Sorry, we couldn't create the account now, kindly try again later.";
                toast.error(message);
                setUpdating(false);
            },
        })
    }

    return (
        <main className="bg-lightBlack p-4 rounded-xl w-full max-w-2xl text-neutral-100">
            <h1 className="my-4 font-semibold text-lg md:text-xl xl:text-2xl">Create Admin</h1>
            <form className="flex flex-col gap-y-3">
                <input type="email" value={formValues.email} onChange={handleChange("email")} autoFocus placeholder="Enter new admin Email" className="bg-black disabled:bg-red-800/10 px-4 py-3 border border-neutral-800 rounded-xl focus:outline-none w-full text-sm md:text-base xl:text-lg duration-300 focus:caret-primary" />
                <input type="text" value={formValues.password} onChange={handleChange("password")} autoFocus placeholder="Enter new admin Password" className="bg-black disabled:bg-red-800/10 px-4 py-3 border border-neutral-800 rounded-xl focus:outline-none w-full text-sm md:text-base xl:text-lg duration-300 focus:caret-primary" />
                <select value={formValues.role} onChange={handleChange("role")} className="bg-black px-4 py-3 border border-neutral-800 rounded-xl focus:outline-none w-full text-sm md:text-base xl:text-lg capitalize duration-300 focus:caret-primary">
                    <option value="">Select Role</option>
                    <option value={"admin"}>Admin</option>
                    <option value={"super_admin"}>Super Admin</option>
                </select>
                <div className="flex justify-end mt-6">
                    <button onClick={handleSubmit} disabled={updating} className={`bg-primary hover:bg-yellow-600 w-full px-6 py-3 rounded-xl font-semibold text-black transition-colors`}>
                        {updating ?
                            <svg className="mx-auto mr-2 w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg> + "Creating" :
                            "Save Changes"}
                    </button>
                </div>
            </form>
        </main>
    );
}

export default Form;