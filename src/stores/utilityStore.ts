import { create } from 'zustand';
import { adminGetUtility } from '@/services/api.service';

type UtilityData = {
    cardPrice: number;
    minimumAmount: number;
};

type UtilityStore = {
    data: UtilityData | null;
    loading: boolean;
    fetchUtility: (id: string) => Promise<void>;
};

export const useUtilityStore = create<UtilityStore>((set) => ({
    data: null,
    loading: false,
    fetchUtility: async (id: string) => {
        set({ loading: true });
        try {
            const data = await adminGetUtility(id);
            set({ data, loading: false });
        } catch (err) {
            console.error('Failed to fetch utility', err);
            set({ loading: false });
        }
    },
}));
