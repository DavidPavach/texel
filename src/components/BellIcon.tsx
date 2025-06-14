import { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";

//Stores and Utils
import { useNotificationStore } from '@/stores/notificationStore';
import { formatDate } from '@/utils/format';

//Icons
import { BuyCrypto, KeyboardOpen, Notification, NotificationBing } from 'iconsax-react';
import { X } from 'lucide-react';

export const BellIcon = () => {

    const [open, isOpen] = useState<boolean>(false);
    const { notifications, clearNotification } = useNotificationStore();

    //Functions
    const toggleOpen = () => isOpen((prev) => !prev);

    return (
        <div className="relative">
            <button className="relative" onClick={toggleOpen}>
                <NotificationBing variant='Bold' className='text-white' />
                {notifications.length > 0 && (
                    <span className="-top-1 -right-1 absolute bg-red-500 px-1 rounded-full text-white text-xs">
                        {notifications.length}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="top-full right-0 z-40 absolute bg-black shadow-lg mt-2 px-2 py-4 border border-neutral-700 rounded-xl w-80 md:w-96 text-neutral-100">

                        <h4 className="mb-4 font-bold text-base md:text-lg xl:text-xl">Notifications</h4>
                        {notifications.length === 0 ? (
                            <p className="text-neutral-500">No new notifications</p>
                        ) : (
                            <ul className="space-y-2 max-h-[75vh] overflow-y-auto">
                                {notifications.map((n) => {
                                    const isTransaction = n.type === 'transaction';
                                    const isSystem = n.type === 'system';
                                    const Icon = isTransaction ? <BuyCrypto size={22} variant='Bold' className='text-green-400' /> : isSystem ? <KeyboardOpen size={22} variant='Bold' className='text-accent' /> : <Notification size={22} variant='Bold' className='text-blue-400' />;

                                    return (
                                        <motion.li key={n._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="relative flex items-start gap-3 bg-neutral-800 px-3 py-4 border border-neutral-700 rounded-xl">
                                            <div className="flex-shrink-0 pt-1">
                                                {Icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-col">
                                                    <p className="font-semibold text-primary text-sm md:text-base xl:text-lg capitalize">{n.title}</p>
                                                    <span className="text-[10px] text-neutral-500 md:text-xs xl:text-sm">{formatDate(n.createdAt)}</span>
                                                </div>
                                                <p className="mt-1 text-neutral-300 text-sm">{n.message}</p>
                                            </div>
                                            <button onClick={() => clearNotification(n._id)} className="top-2 right-2 absolute text-neutral-500 hover:text-red-500 duration-200">
                                                <X size={14} />
                                            </button>
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};
