import { ethers } from 'ethers';
import TonWeb from 'tonweb';
import { NETWORKS } from '../constants/networks';
import { getEncryptedItem, decryptData } from './security';

export const getBalance = async (
  address: string,
  network: string,
  tokenAddress?: string
): Promise<string> => {
  const networkConfig = NETWORKS[network];
  
  if (networkConfig.type === 'evm') {
    const provider = new ethers.providers.JsonRpcProvider(networkConfig.rpcUrl);
    
    if (tokenAddress) {
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      const balance = await contract.balanceOf(address);
      const decimals = await contract.decimals();
      return ethers.utils.formatUnits(balance, decimals);
    }
    
    return provider.getBalance(address);
  } else if (network === 'TON') {
    const response = await fetch(`${networkConfig.rpcUrl}/getAddressBalance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address })
    });
    const data = await response.json();
    return TonWeb.utils.fromNano(data.result);
  }
  
  throw new Error('Unsupported network');
};

// Add sendTransaction, estimateGas, etc...