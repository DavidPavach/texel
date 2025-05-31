//Stores and Services
import { useUserStore } from '@/stores/userStore';
import { useSocket } from '@/services/socket.service';

//Components
import { BellIcon } from './BellIcon';

//Images
import logo from "/logo.png";

export default function Header() {

    //Hooks
    const { user } = useUserStore();
    useSocket(user?._id ?? '');

    return (
        <header className="flex justify-between items-center bg-black px-2 md:px-4 py-4 md:py-5 xl:py-6">
            <img src={logo} alt="Logo" className="size-8 md:size-10 xl:size-12" />
            <BellIcon />
        </header>
    );
}
