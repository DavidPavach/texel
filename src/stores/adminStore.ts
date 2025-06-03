import { create } from 'zustand';

//Token and Services
import { getAccessToken } from '@/lib/token';
import { getAdminDetails } from '@/services/api.service';

export const useAdminStore = create<AdminStore>((set) => ({
    admin: null,
    setAdmin: (admin) => set({ admin }),
    clearAdmin: () => set({ admin: null }),
    refetchAdminData: async () => {
        const accessToken = getAccessToken();
        if (!accessToken) return;

        try {
            const admin = await getAdminDetails()
            set({
                admin: admin,
            });
        } catch (error) {
            console.error('Refetch failed:', error);
        }
    },
}));