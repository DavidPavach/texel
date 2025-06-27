import { useState } from 'react';
import { toast } from "react-fox-toast";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { loginSchema } from '@/schema/login.schema';

import { useAuthUser } from '@/services/mutations.service';
import Input from "@/components/Input";
import ErrorText from "@/components/ErrorText";
import Button from '@/components/Button';

import { EyeClosed, Eye } from 'lucide-react';

const Form = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [hasValue, setHasValue] = useState<string>("");
    const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const userLogin = useAuthUser();

    const toggleShow = () => setShow(!show);
    const toggleHasValue = (value: string) => setHasValue(value);
    const reset = () => {
        setEmail("");
        setPassword("");
        setFormErrors({});
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const result = loginSchema.safeParse({ email, password });

        if (!result.success) {
            const errors: { email?: string; password?: string } = {};
            result.error.errors.forEach((err) => {
                if (err.path[0] === "email") errors.email = err.message;
                if (err.path[0] === "password") errors.password = err.message;
            });
            setFormErrors(errors);

            // Clear errors after 2 seconds
            setTimeout(() => setFormErrors({}), 2000);
            return;
        }

        userLogin.mutate({ email, password }, {
            onSuccess: (response) => {
                toast.success(response.data.message || "You were authenticated successfully!");
                const page = searchParams.get("redirect");
                navigate(page ? `${page}` : `/${response.data.redirect}`);
                reset();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                const message = error?.response?.data?.message || "Authentication failed, kindly check your credentials.";
                toast.error(message);
            },
        });
    };

    return (
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <form className="flex flex-col gap-y-4 mt-8" onSubmit={onSubmit}>
                <div className="flex flex-col">
                    <Input type="email" placeholder="Johndoe@mail.com" label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    {formErrors.email && <ErrorText message={formErrors.email} />}
                </div>

                <div className="relative flex flex-col">
                    <Input
                        onChange={(event) => {
                            toggleHasValue(event.target.value);
                            setPassword(event.target.value);
                        }} type={show ? "text" : "password"} label="Password" placeholder="Password" name="password" value={password} required />
                    {formErrors.password && <ErrorText message={formErrors.password} />}
                    {hasValue && hasValue.length > 0 && (
                        <div className="top-8 md:top-9 xl:top-11 right-4 absolute cursor-pointer" onClick={toggleShow}>
                            {show ? <Eye size={18} /> : <EyeClosed size={18} />}
                        </div>
                    )}
                </div>
                <Button text="Login" loadingText="Signing In...." variant="primary" size="lg" disabled={userLogin.isPending} loading={userLogin.isPending} />
            </form>
        </motion.div>
    );
};

export default Form;