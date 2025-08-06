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