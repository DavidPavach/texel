export default function Button({ text, loadingText = "Processing...", icon, onClick, variant = "primary", size = "md", disabled = false, loading = false }: FancyButtonProps) {

    // Variant styles
    const variantStyles = {
        primary: "bg-black text-white rounded-[2rem] hover:bg-accent duration-300 hover:text-black",
        secondary: "bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white",
        success: "hover:bg-gradient-to-r bg-primary duration hover:from-primary hover:to-yellow-800 hover:text-neutral-100 text-black rounded-xl",
    }

    // Size styles
    const sizeStyles = {
        sm: "text-[10px] md:text-xs xl:text-sm px-4 py-2",
        md: "text-xs md:text-sm xl:text-base px-6 py-3",
        lg: "text-sm md:text-base xl:text-lg px-8 py-4",
    }

    return (
        <button onClick={onClick} disabled={disabled} className={`mt-4 font-medium transition-all duration-300
        shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-90 ${variantStyles[variant]} ${sizeStyles[size]} flex items-center justify-center gap-x-2 disabled:cursor-not-allowed`}>
            {loading && (
                <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            <span className="flex justify-center items-center gap-2">
                {icon && !loading && <span>{icon}</span>}
                <span>{loading ? loadingText : text}</span>
            </span>
        </button>
    )
}
