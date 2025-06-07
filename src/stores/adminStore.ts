import { create } from 'zustand';

//Token and Services
import { getAccessToken } from '@/lib/token';
import { getAdminDetails } from '@/services/api.service';
import { getPrices } from '@/services/api.service';

export const useAdminStore = create<AdminStore>((set, get) => ({
    admin: null,
    prices: null,

    setAdmin: (admin) => set({ admin }),
    setPrices: (prices) => set({ prices }),
    clearAdmin: () => set({ admin: null }),

    refetchAdminData: async () => {
        const accessToken = getAccessToken();
        if (!accessToken) return;

        try {
            const admin = await getAdminDetails();
            set({ admin });
        } catch (error) {
            console.error('Refetch failed:', error);
        }
    },

    fetchPrices: async () => {
        const currentPrices = get().prices;
        if (currentPrices !== null) return currentPrices;

        try {
            const fetchedPrices = await getPrices();
            get().setPrices(fetchedPrices.data);
            return fetchedPrices.data;
        } catch (error) {
            console.error('Failed to fetch prices:', error);
            return null;
        }
    }
}));