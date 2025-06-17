//Images
import manage from "/manage.jpg"

const Manage = () => {
    return (
        <main className="flex md:flex-row flex-col md:justify-between md:items-center gap-5 bg-neutral-900 my-10 p-4 md:p-6 xl:p-8 border border-neutral-600 rounded-xl">
            <div className="md:w-[48%]">
                <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl grotesk">Manage Your<span className="text-primary"> Cryptocurrency.</span></h1>
                <p className="mt-4 max-w-[50ch] text-sm md:text-base xl:text-lg">TexelChain Community consistently strives to enhance and refine our services, placing a strong emphasis on adhering to regulatory standards as a fundamental aspect of our competitive edge.</p>
            </div>
            <div className="md:w-[48%]">
                <img src={manage} alt="Manage Your Cryptocurrency" className="rounded-xl" />
            </div>
        </main>
    );
}

export default Manage;