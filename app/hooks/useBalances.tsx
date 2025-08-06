import { useEffect, useState } from 'react';
import { useWallet } from './useWallet';
import { BlockchainService } from '@lib/blockchainService';
import { DEFAULT_TOKENS } from '@constants/tokens';

export const useBalances = () => {
  const { wallet, network } = useWallet();
  const [balances, setBalances] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!wallet) return;
      setLoading(true);
      
      try {
        const newBalances: Record<string, string> = {};
        
        // Get native token balance
        const nativeBalance = await BlockchainService.getBalance(wallet.address, network);
        newBalances['native'] = nativeBalance;
        
        // Get token balances
        const tokens = DEFAULT_TOKENS.filter(t => t.network === network && t.address !== 'native');
        for (const token of tokens) {
          try {
            const balance = await BlockchainService.getTokenBalance(
              wallet.address, 
              token.address, 
              network,
              token.decimals
            );
            newBalances[token.address] = balance;
          } catch (error) {
            console.error(`Error fetching balance for ${token.symbol}:`, error);
            newBalances[token.address] = '0';
          }
        }
        
        setBalances(newBalances);
      } catch (error) {
        console.error('Failed to fetch balances', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
    
    const interval = setInterval(fetchBalances, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [wallet, network]);

  return { balances, loading };
};