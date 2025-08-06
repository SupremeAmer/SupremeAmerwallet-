import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '@components/Header';
import ActionBar from '@components/ActionBar';
import TokenList from '@components/TokenList';
import { useWallet } from '@hooks/useWallet';
import { useBalances } from '@hooks/useBalances';

const HomeScreen = () => {
  const { wallet } = useWallet();
  const { balances } = useBalances();
  
  const balanceTotal = balances['native'] || '0.00';
  
  const handleActionPress = (action: string) => {
    console.log(`Action: ${action}`);
    // Navigation would be implemented here
  };

  return (
    <View style={styles.container}>
      <Header 
        title="SupremeAmer Wallet" 
        balance={`$${balanceTotal}`} 
      />
      
      <ActionBar 
        actions={['Send', 'Receive', 'Buy', 'Sell']} 
        onActionPress={handleActionPress} 
      />
      
      <TokenList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;