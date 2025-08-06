import { NETWORKS } from './networks';

type Token = {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  network: keyof typeof NETWORKS;
  price?: string;
  change?: string;
};

export const DEFAULT_TOKENS: Token[] = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    address: 'native',
    decimals: 18,
    network: 'ETH',
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    address: 'native',
    decimals: 18,
    network: 'BSC',
  },
  {
    name: 'Toncoin',
    symbol: 'TON',
    address: 'native',
    decimals: 9,
    network: 'TON',
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    decimals: 6,
    network: 'ETH',
  },
  {
    name: 'Trust Wallet Token',
    symbol: 'TWT',
    address: '0x4B0F1812e5Df2A09796481Ff14017e6005508003',
    decimals: 18,
    network: 'BSC',
  },
];