import React from 'react';
import { FlatList } from 'react-native';
import TokenItem from './TokenItem';
import { useBalances } from '@hooks/useBalances';
import { useWallet } from '@hooks/useWallet';
import { DEFAULT_TOKENS } from '@constants/tokens';

const TokenList: React.FC = () => {
  const { network } = useWallet();
  const { balances } = useBalances();
  
  const networkTokens = DEFAULT_TOKENS.filter(token => token.network === network);
  
  const tokensWithBalances = networkTokens.map(token => ({
    ...token,
    balance: balances[token.address] || '0'
  }));

  return (
    <FlatList
      data={tokensWithBalances}
      keyExtractor={(item) => item.address}
      renderItem={({ item }) => (
        <TokenItem
          name={item.name}
          symbol={item.symbol}
          price={item.price || '$0.00'}
          change={item.change || '0.00%'}
          balance={item.balance}
        />
      )}
    />
  );
};

export default TokenList;