//Transaction Enum
export enum TransactionCoin {
  BITCOIN = 'bitcoin',
  ETHEREUM = 'ethereum',
  BINANCE_COIN = 'binance coin',
  TRON = 'tron',
  USDT_TRC = 'usdt trc(20)',
  USDT_ERC = 'usdt erc(20)',
  CARDANO = 'cardano',
  SOLANA = 'solana',
  LITE_COIN = 'lite coin',
  DOGE = 'doge',
  TEXEL = 'texel',
  DASH = 'dash',
  BITCOIN_CASH = 'bitcoin cash',
  TRUMP_COIN = 'official trump'
}

// ID Types
export const ID_TYPES = [
  { value: "passport", label: "Passport" },
  { value: "drivers_license", label: "Driver's License" },
  { value: "national_id", label: "National ID Card" },
  { value: "residence_permit", label: "Residence Permit" },
]

// Gender options
export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "prefer not to say", label: "Prefer not to say" },
]

// Maximum file size (20MB in bytes)
export const MAX_FILE_SIZE = 20 * 1024 * 1024

// Map complex coin names to API (Price) keys
export const coinMap: Record<string, string> = {
  bitcoin: 'bitcoin',
  ethereum: 'ethereum',
  'binance coin': 'binancecoin',
  tron: 'tron',
  'usdt trc(20)': 'tether',
  'usdt erc(20)': 'tether',
  cardano: 'cardano',
  solana: 'solana',
  'lite coin': 'litecoin',
  doge: 'dogecoin',
  texel: 'texel',
  dash: 'dash',
  'bitcoin cash': 'bitcoin-cash',
  'official trump': 'official-trump',
};

//Coin Logos, Symbol and Name
export const coinMeta: Record<string, { name: string; symbol: string; logo: string }> = {
  bitcoin: { name: "Bitcoin", symbol: "BTC", logo: "/bitcoin.jpg" },
  ethereum: { name: "Ethereum", symbol: "ETH", logo: "/ethereum.jpg" },
  "binance coin": { name: "Binance Coin", symbol: "BNB", logo: "/binance coin.jpg" },
  tron: { name: "Tron", symbol: "TRX", logo: "/tron.jpg" },
  "usdt trc(20)": { name: "Tether TRC20", symbol: "USDT", logo: "/tether.jpg" },
  "usdt erc(20)": { name: "Tether ERC20", symbol: "USDT", logo: "/tether.jpg" },
  cardano: { name: "Cardano", symbol: "ADA", logo: "/cardano.jpg" },
  solana: { name: "Solana", symbol: "SOL", logo: "/solana.jpg" },
  "lite coin": { name: "Litecoin", symbol: "LTC", logo: "/litecoin.jpg" },
  doge: { name: "Dogecoin", symbol: "DOGE", logo: "/doge.jpg" },
  texel: { name: "Texel", symbol: "TXL", logo: "/logo.svg" },
  dash: { name: "Dash", symbol: "DASH", logo: "/dash.jpg" },
  "bitcoin cash": { name: "Bitcoin Cash", symbol: "BCH", logo: "/bitcoin cash.jpg" },
  "official trump": { name: "Trump Coin", symbol: "TRUMP", logo: "/official trump.png" },
};

//Get network
export function getNetwork(coin: string): string {

  const coinNetworks: { [key: string]: string } = {
    'bitcoin': 'Bitcoin Network',
    'ethereum': 'Ethereum Network',
    'binance coin': 'BNB Smart Chain',
    'tron': 'Tron Network',
    'usdt trc(20)': 'Tron Network',
    'usdt erc(20)': 'Ethereum Network',
    'cardano': 'Cardano Network',
    'solana': 'Solana Network',
    'litecoin': 'Litecoin Network',
    'doge': 'Dogecoin Network',
    'dash': 'Dash Network',
    'bitcoin cash': 'Bitcoin Cash Network',
    'official trump': 'Ethereum Network',
  };

  const normalizedCoin = coin.toLowerCase();
  return coinNetworks[normalizedCoin].toLowerCase() || 'Unknown Network';
}

//Get wallet and QR code
export const getWallet: Record<string, { walletAddress: string; qrCode: string; network: string, networkFee: number; estimatedTime: string; }> = {
  bitcoin: { walletAddress: "bc1qs2a2t7t85redeqmxprps38gxjyhum3tamr7rt2", qrCode: '/bitcoin_wallet.jpg', network: 'Bitcoin', networkFee: 2.5, estimatedTime: "10–30 mins" },
  ethereum: { walletAddress: "0xC4553419724e25b971cc78baA5f0c050Ab37F001", qrCode: '/ethereum_wallet.jpg', network: 'Ethereum', networkFee: 1.2, estimatedTime: "5–15 mins" },
  "binance coin": { walletAddress: "0xC4553419724e25b971cc78baA5f0c050Ab37F001", qrCode: '/binance coin_wallet.jpg', network: 'BNB Smart Chain', networkFee: 0.5, estimatedTime: "3–5 mins" },
  tron: { walletAddress: "TSG9wSYr98oBTJuZjp3QiotcvmvgdoYAXz", qrCode: '/tron_wallet.jpg', network: 'Tron', networkFee: 0.1, estimatedTime: "1–2 mins" },
  "usdt trc(20)": { walletAddress: "0xC4553419724e25b971cc78baA5f0c050Ab37F001", qrCode: '/usdt erc_wallet.jpg', network: 'Ethereum', networkFee: 0.2, estimatedTime: "1–2 mins" },
  "usdt erc(20)": { walletAddress: "TSG9wSYr98oBTJuZjp3QiotcvmvgdoYAXz", qrCode: "/usdt erc_wallet.jpg", network: "Tron", networkFee: 3.0, estimatedTime: "10–20 mins" },
  cardano: { walletAddress: "addr1qy3zx4c5hvaqx6a5h9py3uazjyr0d5cnftez8vyq5k6uljz8wtldcnezt5sh9kj4ljhl8mt0kmddf3cxhrrsj24ed4gsldzcv6", qrCode: "/cardano_wallet.jpg", network: "Cardano", networkFee: 0.4, estimatedTime: "5–10 mins" },
  solana: { walletAddress: "2wvdE3h6va8F7KGDKczBwy7W3icE1hniiBw3o4q9MaE9", qrCode: "/solana_wallet.jpg", network: "Solana", networkFee: 0.0005, estimatedTime: "1–2 mins" },
  "lite coin": { walletAddress: "ltc1qjm8xk87f2pc85tu5hks953vd64qavyw9du3200", qrCode: "/litecoin_wallet.jpg", network: "Litecoin", networkFee: 0.3, estimatedTime: "5–10 mins" },
  doge: { walletAddress: "DFLjxBrZzkZoAZT48c9iXPycXQBeTKWLrE", qrCode: "/doge_wallet.jpg", network: "Dogecoin", networkFee: 0.5, estimatedTime: "10–15 mins" },
  dash: { walletAddress: "Xd8ZdMqqMdyhh4hiZEb416H7wpoSi1Xpeh", qrCode: '/doge_wallet.jpg', network: "Dash", networkFee: 0.25, estimatedTime: "5–10 mins" },
  "bitcoin cash": { walletAddress: "qr2errazxe38d3gazuplt4ep3dt3qes0tqrcdj9a9x", qrCode: '/bitcoin cash_wallet.jpg', network: "Bitcoin Cash", networkFee: 0.8, estimatedTime: "10–20 mins" },
  "official trump": { walletAddress: "2wvdE3h6va8F7KGDKczBwy7W3icE1hniiBw3o4q9MaE9", qrCode: '/trump_wallet.jpg', network: "Solana", networkFee: 0.6, estimatedTime: "2–5 mins" },
}

//Utility ID
export const utilityId = "684a99a928b8b927a037eb72";