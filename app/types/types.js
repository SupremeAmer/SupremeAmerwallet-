
export interface Wallet {
  address: string;
  tonAddress: string;
  privateKey: string;
  mnemonic: string;
  publicKey?: string; 
  encrypted?: boolean; 
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: string;
  network: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  symbol?: string; 
  fee?: string; 
}

export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  network: string;
  userId?: string;
  balance?: string; 
  priceUSD?: string; 
  logoURI?: string; 
}

// Added for navigation type safety
export type RootStackParamList = {
  Home: undefined;
  Send: { token?: Token }; // Optional token for pre-filled sends
  Receive: { address?: string }; // Optional address for QR display
  Settings: undefined;
  TokenManagement: undefined;
  CreateWallet: undefined;
  ImportWallet: undefined;
  Trending: undefined;
  Swap: undefined;
  Earn: undefined;
  Discover: undefined;
};

// Added for user authentication
export interface User {
  id: string;
  email?: string;
  name?: string;
  session?: string;
  wallets: string[]; // Array of wallet addresses
  createdAt: Date;
}

// Added for app context
export interface AppContextType {
  wallet: Wallet | null;
  network: keyof typeof NETWORKS; // Assuming NETWORKS is defined elsewhere
  setNetwork: (network: keyof typeof NETWORKS) => void;
  createWallet: () => Promise<void>;
  importWallet: (mnemonic: string) => Promise<void>;
  isInitialized: boolean;
  sendTransaction: (to: string, amount: string, token?: Token) => Promise<string>;
  logout: () => Promise<void>;
  currentUser: User | null;
}

// Added for network configuration
export const NETWORKS = {
  ETH: {
    id: 1,
    name: 'Ethereum',
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    type: 'evm',
    symbol: 'ETH',
    explorer: 'https://etherscan.io',
  },
  BSC: {
    id: 56,
    name: 'BNB Smart Chain',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    type: 'evm',
    symbol: 'BNB',
    explorer: 'https://bscscan.com',
  },
  TON: {
    id: -239,
    name: 'TON',
    rpcUrl: 'https://toncenter.com/api/v2/jsonRPC',
    type: 'ton',
    symbol: 'TON',
    explorer: 'https://tonscan.org',
  },
} as const;

// Added for API responses
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: 'success' | 'error';
}

// Added for balance state
export interface BalanceState {
  [key: string]: string; // address -> balance
  native: string; // Native token balance
}