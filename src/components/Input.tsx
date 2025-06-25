type InputType = 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'radio' | 'date' | 'file' | 'tel';

type InputProps = {
    type: InputType;
    placeholder?: string;
    label?: string;
    id?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    pattern?: string;
    title?: string;
    widthClass?: string;
    name: string;
    required?: boolean;
    otherClass?: string;
    autoComplete?: string;
};

const Input = ({ type, placeholder, label, id, value, onChange, pattern, title,
    widthClass = 'w-full', otherClass, required, autoComplete = 'off' }: InputProps) => {
    return (
        <main className="flex flex-col gap-y-1">
            {label && (
                <label className="text-neutral-700 cursor-pointer" htmlFor={id}>
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input type={type} placeholder={placeholder}
                id={id} value={value} onChange={onChange} pattern={pattern}
                title={title} autoComplete={autoComplete}
                className={`text-sm md:text-base xl:text-lg px-4 py-3 bg-[#F8F6F1] rounded-3xl duration-300 focus:caret-primary focus:outline-none  ${widthClass} ${otherClass}`}
                required={required}
            />
        </main>
    );
};

export default Input;
