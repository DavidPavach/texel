import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// Components
import Drawer from '@/components/Drawer';
import CoinList from './CoinList';

const Index = () => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') ?? 'receive';
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const navigate = useNavigate();

    const toggleIsOpen = () => {
        setIsOpen(false);
        setTimeout(() => navigate(-1), 300);
    };

    return (
        <Drawer isOpen={isOpen} onClose={toggleIsOpen} title={page}>
            <CoinList page={page} />
        </Drawer>
    );
};

export default Index;