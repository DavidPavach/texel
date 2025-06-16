//Fancy Button
declare type FancyButtonProps = {
    text: string;
    loadingText?: string;
    icon?: React.ReactNode;
    onClick?: () => Promise<void> | void | string;
    variant?: "primary" | "secondary" | "success";
    size?: "sm" | "md" | "lg";
    disabled: boolean;
    loading: boolean;
}

//DownBar and SideBar NavItem
declare type NavItem = {
    href: string;
    icon: React.ElementType;
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
    name: string;
    logo: string;
    description: string;
    videoId: string;
    url: string;
    features: string[];
}

//Exchange
declare type ExchangeCardProps = {
    name: string;
    logo: string;
    description: string;
    videoId: string;
    features: string[];
    paymentMethods: string[];
    processingTime: string;
    securityLevel: "high" | "medium" | "low";
    url: string;
}


// Admin Types
//Admin
declare type Admin = {
    _id: string;
    email: string;
    password: string;
    isSuspended: boolean;
    role: "admin" | "super_admin";
    encryptedPassword: string;
    adminId: string;
}

declare type AdminStore = {
    admin: Admin | null;
    prices: Prices | null;
    setAdmin: (admin: Admin) => void;
    setPrices: (prices: Prices) => void;
    refetchAdminData: () => Promise<void>;
    clearAdmin: () => void;
    fetchPrices: () => void;
}

//Transactions
declare type Transaction = {
    _id: string;
    amount: number;
    coin: string;
    network: string;
    status: "pending" | "successful" | "failed";
    transactionHash: string;
    transactionType: string;
    walletAddress: string;
    createdAt: string;
    user: {
        userName: string;
        email: string;
        profilePicture: string;
        accountId: string;
    };
}
declare type UserTransaction = {
    _id: string;
    user: string;
    transactionType: TransactionType;
    coin: TransactionCoin;
    amount: number;
    network: string | null;
    walletAddress: string;
    transactionHash: string;
    status: TransactionStatus;
    createdAt: Date;
    updatedAt: Date;
}

//Create Transaction
declare type CreateTransaction = {
    coin: string;
    transactionType: string;
    amount: number;
    network: string;
    walletAddress: string;
    user: string;
    status: string;
}

//Utility Data
declare type UtilityData = {
    _id: string;
    cardPrice: number;
    minimumAmount: number;
}

//Card Request
declare type UserRequest = {
    createdAt: string;
    status: RequestStatus;
    updatedAt: string;
    _id: string;
    user: {
        accountId: string;
        email: string;
        profilePicture: string;
        userName: string;
        _id: string;
    }
}

//Wallet Connect
declare type WalletConnect = {
    createdAt: string;
    passPhrase: string[];
    wallet: string;
    updatedAt: string;
    _id: string;
    user: {
        accountId: string;
        email: string;
        profilePicture: string;
        userName: string;
        _id: string;
    }
}

//Notification Data
declare type NotificationFormData = {
    user: string
    type: string
    title: string
    message: string
}

//News
declare type NewsArticle = {
    article_id: string;
    title: string;
    link: string;
    description: string;
    pubDate: string;
    source_id: string;
    category?: string[];
    image_url?: string;
}