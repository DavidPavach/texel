// import { useState } from "react";

// //Services
// import { useCreateSampleAdmin } from "@/services/mutations.service";

// const Form = () => {

//     //States
//     const [formValues, setFormValues] = useState({
//         email: "",
//         password: "",
//         role: ""
//     });

//     //Functions
//     const handleChange = (field: keyof typeof formValues) => (val: string) => {
//         setFormValues((prev) => ({ ...prev, [field]: val }));
//     };


//     const createAdmin = useCreateSampleAdmin();

//     return (
//         <main className="">
//             <form action="" className="flex flex-col gap-y-3">
//                 <select value={formValues.role} onChange={() => handleChange("role")} className="bg-black px-4 py-3 border border-neutral-800 rounded-xl focus:outline-none w-full text-sm md:text-base xl:text-lg capitalize duration-300 focus:caret-primary">
//                     <option value="">Select Gender</option>
//                         <option value={"admin"}>Admin</option>
//                         <option value={"super_admin"}>Super Admin</option>
//                 </select>
//             </form>
//         </main>
//     );
// }

// export default Form;