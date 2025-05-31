import { create } from 'zustand';

//Enums, Libs and Hooks
import { coinMap } from '@/enums';
import { getAccessToken } from '@/lib/token';
import { getPrices, getUserBalanceFn, getUserDetailsFn } from '@/services/api.service';

export function calculateTotalUsd(balance: Balance, prices: Prices): number {
  return Object.entries(balance).reduce((total, [coin, amount]) => {
    const apiKey = coinMap[coin.toLowerCase()] ?? '';
    const coinPrice = prices[apiKey]?.usd ?? 0;
    return total + amount * coinPrice;
  }, 0);
}

export const formatCoinValue = (coin: string, amount: number, prices: Prices): string => {
  const apiKey = coinMap[coin.toLowerCase()] ?? '';
  const price = prices[apiKey]?.usd ?? 0;
  const total = amount * price;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total);
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  balance: null,
  prices: null,
  totalUsdValue: 0,
  setUser: (user) => set({ user }),
  setBalance: (balance) => set({ balance }),
  setPrices: (prices) => set({ prices }),
  setTotalUsdValue: (value) => set({ totalUsdValue: value }),
  clearUser: () => set({ user: null, balance: null, prices: null, totalUsdValue: 0 }),
  refetchUserData: async () => {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    try {
      const [user, balanceRes, pricesRes] = await Promise.all([
        getUserDetailsFn(),
        getUserBalanceFn(),
        getPrices(),
      ]);

      const balance = balanceRes.data;
      const prices = pricesRes.data;
      const total = calculateTotalUsd(balance, prices);

      set({
        user: user.data,
        balance,
        prices,
        totalUsdValue: total,
      });
    } catch (error) {
      console.error('Refetch failed:', error);
    }
  },
}));