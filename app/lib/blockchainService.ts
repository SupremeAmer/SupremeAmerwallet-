import { ethers } from 'ethers';
import TonWeb from 'tonweb';
import { NETWORKS } from '@constants/networks';

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)"
];

export class BlockchainService {
  static async getBalance(address: string, network: keyof typeof NETWORKS): Promise<string> {
    const networkConfig = NETWORKS[network];
    
    if (networkConfig.type === 'evm') {
      const provider = new ethers.providers.JsonRpcProvider(networkConfig.rpcUrl);
      const balance = await provider.getBalance(address);
      return ethers.utils.formatEther(balance);
    } else if (network === 'TON') {
      const provider = new TonWeb.HttpProvider(networkConfig.rpcUrl);
      const result = await provider.getAddressBalance(address);
      return TonWeb.utils.fromNano(result);
    }
    
    throw new Error('Unsupported network');
  }

  static async getTokenBalance(
    address: string, 
    tokenAddress: string, 
    network: keyof typeof NETWORKS,
    decimals: number
  ): Promise<string> {
    const networkConfig = NETWORKS[network];
    
    if (networkConfig.type !== 'evm') {
      throw new Error('Token balances only supported for EVM networks');
    }
    
    const provider = new ethers.providers.JsonRpcProvider(networkConfig.rpcUrl);
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    const balance = await contract.balanceOf(address);
    return ethers.utils.formatUnits(balance, decimals);
  }

  static async sendTransaction(
    from: string,
    to: string,
    amount: string,
    privateKey: string,
    network: keyof typeof NETWORKS
  ): Promise<string> {
    const networkConfig = NETWORKS[network];
    
    if (networkConfig.type === 'evm') {
      const provider = new ethers.providers.JsonRpcProvider(networkConfig.rpcUrl);
      const wallet = new ethers.Wallet(privateKey, provider);
      
      // Check if it's a token transfer
      if (to.startsWith('0x') && to.length === 42) {
        // Regular ETH/BNB transfer
        const tx = await wallet.sendTransaction({
          to,
          value: ethers.utils.parseEther(amount)
        });
        return tx.hash;
      } else {
        throw new Error('Token transfers not implemented');
      }
    } else if (network === 'TON') {
      // TON transaction implementation
      // This is a simplified version; real implementation requires more steps
      throw new Error('TON transactions not implemented yet');
    }
    
    throw new Error('Unsupported network');
  }
}