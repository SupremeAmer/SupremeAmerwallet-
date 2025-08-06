import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TokenItemProps {
  name: string;
  symbol: string;
  price: string;
  change: string;
  balance: string;
}

const TokenItem: React.FC<TokenItemProps> = ({ name, symbol, price, change, balance }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.price}>{price}</Text>
        <Text style={[styles.change, isPositive ? styles.positive : styles.negative]}>{change}</Text>
        <Text style={styles.balance}>{balance} {symbol}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  symbol: {
    color: '#666',
    fontSize: 14,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  change: {
    fontSize: 14,
    marginVertical: 2,
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
  balance: {
    color: '#666',
    fontSize: 14,
  },
});

export default TokenItem;