//Fancy Button
declare type FancyButtonProps = {
    text: string;
    loadingText?: string;
    icon?: React.ReactNode;
    onClick?: () => Promise<void> | void;
    variant?: "primary" | "secondary" | "success";
    size?: "sm" | "md" | "lg";
    disabled: boolean;
    loading: boolean;
}

//DownBar and SideBar NavItem
declare type NavItem = {
    href: string;
    icon: React.ElementType;
    currentPath: string;
    label: string;
}

//Error Component
declare type ErrorDisplayProps = {
    title?: string
    message?: string
    retryLabel?: string
    isFullPage?: boolean
    onRetry?: () => unknown | Promise<unknown>;
}

//User
declare type User = {
    _id: string;
    email: string;
    userName: string;
    country: string;
    address?: string;
    phoneNumber: string;
    encryptedPassword: string;
    passPhrase: string[];
    accountId: string;
    gender?: 'male' | 'female' | 'prefer not to say';
    kyc?: {
        images: string[];
        idType: string;
        status: 'pending' | 'accepted' | 'rejected';
        lastSubmissionDate: Date;
    };
    profilePicture?: string;
    isVerified: boolean;
    isSuspended: boolean;
    suspendedDate: Date | null;
    depositMessage?: string;
    minimumTransfer: number | null;
    transactionPin?: string | null;
    lastSession?: Date;
    createdAt: Date
}

//Get Current User Response
declare type GetDetailsResponse = {
    status: number,
    success: boolean;
    message: string;
    data: User
}

//User Balance
declare type Balance = {
    bitcoin: number;
    ethereum: number;
    "binance coin": number;
    tron: number;
    "usdt trc(20)": number;
    "usdt erc(20)": number;
    cardano: number;
    solana: number;
    "lite coin": number;
    doge: number;
    texel: number;
    dash: number;
    'official trump': number
}

//Use Store
declare type Prices = Record<string, { usd: number; usd_24h_change: number }>;

declare type UserStore = {
    user: User | null;
    balance: Balance | null;
    prices: Prices | null;
    totalUsdValue: number;
    setUser: (user: User) => void;
    setBalance: (balance: Balance) => void;
    setPrices: (prices: Prices) => void;
    setTotalUsdValue: (value: number) => void;
    refetchUserData: () => Promise<void>;
    clearUser: () => void;
}

//Get Current Balance Response
declare type GetBalanceResponse = {
    status: number,
    success: boolean;
    message: string;
    data: Balance
}

//Wallet Card 
declare type WalletCardProps = {
    walletId: string;
    balance: string;
    isLoading: boolean;
}

//Drawer Component
declare type DrawerProps = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

//Featured Exchange
declare type FeaturedExchangeProps = {
    name: string
    logo: string
    description: string
    videoId: string
    url: string
    features: string[]
}

//Exchange
declare type ExchangeCardProps = {
    name: string
    logo: string
    description: string
    videoId: string
    features: string[]
    paymentMethods: string[]
    processingTime: string
    securityLevel: "high" | "medium" | "low"
    url: string
}
