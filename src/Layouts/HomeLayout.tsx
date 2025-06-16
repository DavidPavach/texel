// Components
import Nav from "@/pages/HomePage/Nav";
import Footer from "@/pages/HomePage/Footer";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <main className="bg-lightBlack min-h-dvh overflow-y-auto text-neutral-100">
            <Nav />
                <div className="px-2 sm:px-6 md:px-8 lg:px-10 2xl:px-16 xl:px-12 py-8">
                    {children}
                </div>
            <Footer />
        </main>
    );
};

export default HomePageLayout;
