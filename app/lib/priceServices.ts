import { useEffect, useState } from 'react';
import { DEFAULT_TOKENS } from '@constants/tokens';

export const useTokenPrices = () => {
  const [prices, setPrices] = useState<Record<string, { price: string; change: string }>>({});
  
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // In a real app, this would be an API call to CoinGecko or similar
        const mockPrices: Record<string, { price: string; change: string }> = {
          ETH: { price: '3191.14', change: '-1.09%' },
          BNB: { price: '603.56', change: '-0.71%' },
          TON: { price: '2.20', change: '+0.53%' },
          USDC: { price: '1.00', change: '0.00%' },
          TWT: { price: '1.20', change: '+2.28%' },
        };
        
        const newPrices: Record<string, { price: string; change: string }> = {};
        
        DEFAULT_TOKENS.forEach(token => {
          if (mockPrices[token.symbol]) {
            newPrices[token.address] = mockPrices[token.symbol];
          } else {
            newPrices[token.address] = { price: '0.00', change: '0.00%' };
          }
        });
        
        setPrices(newPrices);
      } catch (error) {
        console.error('Failed to fetch prices', error);
      }
    };
    
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Refresh every minute
    
    return () => clearInterval(interval);
  }, []);
  
  return prices;
};