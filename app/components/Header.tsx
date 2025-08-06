import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetworkSelector from './NetworkSelector';

interface HeaderProps {
  title: string;
  balance: string;
}

const Header: React.FC<HeaderProps> = ({ title, balance }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.balance}>{balance}</Text>
      </View>
      <NetworkSelector />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  balance: {
    fontSize: 18,
    marginTop: 4,
  },
});

export default Header;