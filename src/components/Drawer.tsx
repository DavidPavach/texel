import { motion, AnimatePresence } from 'framer-motion';

//Icons
import { CloseSquare } from 'iconsax-react';

const Drawer = ({ isOpen, onClose, children, title }: DrawerProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 10, stiffness: 300 }}
                    className="bottom-0 z-[60] fixed inset-x-0 bg-black shadow-lg border-2 border-slate-800 rounded-t-[2rem] h-[80vh] overflow-y-auto">
                    <div className="p-4 md:p-6 xl:p-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-semibold text-primary text-lg md:text-xl xl:text-2xl capitalize">{title} Cryptocurrency</h2>
                            <CloseSquare onClick={onClose} size={30} color='#dc2626' className='cursor-pointer' variant='Bold' />
                        </div>
                        {children}
                    </div>
                </motion.div>
            )}
            <div className={`${isOpen ? "fixed inset-0 h-dvh z-[59]" : "hidden"} `} onClick={onClose}></div>
        </AnimatePresence>
    );
}

export default Drawer;