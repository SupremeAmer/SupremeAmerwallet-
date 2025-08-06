import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '../components/Header';
import ActionBar from '../components/ActionBar';
import TokenItem from '../components/TokenItem';
import TabBar from '../components/TabBar';
import { useWallet } from '../hooks/useWallet';
import { NETWORKS } from '../constants/networks';

const HomeScreen = () => {
  const { balances, currentNetwork } = useWallet();
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const loadTokens = async () => {
      const networkTokens = NETWORKS[currentNetwork].tokens;
      const tokensWithBalances = await Promise.all(
        networkTokens.map(async token => ({
          ...token,
          balance: balances[token.address] || '0'
        }))
      );
      setTokens(tokensWithBalances);
    };
    
    loadTokens();
  }, [balances, currentNetwork]);

  return (
    <View style={styles.container}>
      <Header title="SupremeAmer Wallet" />
      
      <ActionBar 
        actions={['Send', 'Receive', 'Buy', 'Sell']}
        onActionPress={(action) => console.log(action)}
      />
      
      <FlatList
        data={tokens}
        keyExtractor={item => item.symbol}
        renderItem={({ item }) => (
          <TokenItem
            name={item.name}
            symbol={item.symbol}
            price={item.price}
            change={item.change}
            balance={item.balance}
          />
        )}
      />
      
      <TabBar tabs={['Home', 'Trending', 'Swap', 'Earn', 'Discover']} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen;
```

### 5. Network Constants
**app/constants/networks.ts**
```typescript
export const NETWORKS = {
  ETH: {
    id: 1,
    name: 'Ethereum',
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    type: 'evm',
    tokens: [
      { name: 'Ethereum', symbol: 'ETH', address: 'native', decimals: 18 },
      // Add other ERC-20 tokens
    ]
  },
  BSC: {
    id: 56,
    name: 'BNB Smart Chain',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    type: 'evm',
    tokens: [
      { name: 'BNB', symbol: 'BNB', address: 'native', decimals: 18 },
      { name: 'Trust Wallet Token', symbol: 'TWT', address: '0x4B0F1812e5Df2A09796481Ff14017e6005508003', decimals: 18 }
    ]
  },
  TON: {
    id: -239,
    name: 'TON Mainnet',
    rpcUrl: 'https://toncenter.com/api/v2/jsonRPC',
    type: 'ton',
    tokens: [
      { name: 'Toncoin', symbol: 'TON', address: 'native', decimals: 9 }
    ]
  }
};

export const DEFAULT_NETWORK = 'ETH';