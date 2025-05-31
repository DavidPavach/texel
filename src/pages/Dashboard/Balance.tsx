import { useState, useEffect } from 'react';

//Components
import WalletCard from './WalletCard';
import ErrorDisplay from '@/components/Error';
import Transaction from './Transaction';

//Stores and Utils
import { useUserStore } from '@/stores/userStore';
import { formatCurrency } from '@/utils/format';

const Balance = () => {

    const { user, totalUsdValue, refetchUserData } = useUserStore();

    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!user || !totalUsdValue) {
            setLoading(true)
            refetchUserData()
                .then(() => setIsError(false))
                .catch(() => setIsError(true))
                .finally(() => setLoading(false));
        }
    }, [refetchUserData, totalUsdValue, user]);

    return isError ? (
        <ErrorDisplay onRetry={refetchUserData} isFullPage={true} title="Data Loading Failed" message="We couldn't load your wallet data. Click below to try again." retryLabel="Reload Data" />
    ) : (
        <main className="bg-black rounded-2xl text-neutral-100">
            <WalletCard isLoading={loading} walletId={user?.accountId ?? '...'} balance={formatCurrency(totalUsdValue)} />
            <Transaction />
        </main>
    );
};


export default Balance;