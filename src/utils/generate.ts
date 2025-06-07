export function generateWalletAddress(coin: string): string {
    const prefixMap: Record<string, string> = {
        bitcoin: '1',
        ethereum: '0x',
        'binance coin': 'bnb',
        tron: 'T',
        'usdt trc(20)': 'T',
        'usdt erc(20)': '0x',
        cardano: 'addr1',
        solana: 'So',
        'lite coin': 'L',
        doge: 'D',
        texel: 'TX',
        dash: 'X',
        'bitcoin cash': 'q',
        'official trump': 'DJT'
    };

    const prefix = prefixMap[coin.toLowerCase()] || 'WALLET';

    // Generate a random suffix
    const randomSuffix = Array.from({ length: 30 }, () =>
        Math.random().toString(36)[2].toUpperCase()
    ).join('');

    return prefix + randomSuffix;
}
