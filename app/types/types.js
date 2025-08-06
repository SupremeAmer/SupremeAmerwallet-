export interface Wallet {
  address: string;
  tonAddress: string;
  privateKey: string;
  mnemonic: string;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: string;
  network: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  network: string;
  userId?: string;
}