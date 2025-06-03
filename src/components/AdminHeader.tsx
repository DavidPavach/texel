//Images
import logo from "/logo.png";

const AdminHeader = () => {
    return (
        <header className="flex justify-between items-center bg-black px-2 md:px-4 py-4 md:py-5 xl:py-6">
            <img src={logo} alt="Logo" className="size-8 md:size-10 xl:size-12" />
        </header>
    );
}

export default AdminHeader;