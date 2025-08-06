import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Switch } from 'react-native';
import { DEFAULT_TOKENS } from '@constants/tokens';
import { addCustomToken, getUserTokens } from '@lib/appwriteService';
import { useWallet } from '@hooks/useWallet';

const TokenManagementScreen = () => {
  const { wallet } = useWallet();
  const [customAddress, setCustomAddress] = useState('');
  const [tokens, setTokens] = useState(DEFAULT_TOKENS);
  const [customTokens, setCustomTokens] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomTokens = async () => {
      if (wallet) {
        const result = await getUserTokens(wallet.address);
        setCustomTokens(result.documents);
      }
    };
    
    fetchCustomTokens();
  }, [wallet]);

  const handleAddToken = async () => {
    if (!customAddress) {
      setError('Please enter token address');
      return;
    }
    
    if (!wallet) {
      setError('Wallet not initialized');
      return;
    }
    
    try {
      // In a real app, you would validate the token and get its details
      const newToken = {
        address: customAddress,
        name: 'Custom Token',
        symbol: 'CST',
        decimals: 18,
        network: 'ETH',
        userId: wallet.address,
      };
      
      await addCustomToken(newToken);
      setCustomTokens([...customTokens, newToken]);
      setCustomAddress('');
      setError('');
    } catch (err) {
      setError('Failed to add token: ' + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Tokens</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter token contract address"
        value={customAddress}
        onChangeText={setCustomAddress}
      />
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <Button title="Add Custom Token" onPress={handleAddToken} />
      
      <Text style={styles.sectionHeader}>Default Tokens</Text>
      <FlatList
        data={tokens}
        keyExtractor={(item) => item.address}
        renderItem={({ item }) => (
          <View style={styles.tokenItem}>
            <Text>{item.name} ({item.symbol})</Text>
            <Switch value={true} onValueChange={() => {}} />
          </View>
        )}
      />
      
      {customTokens.length > 0 && (
        <>
          <Text style={styles.sectionHeader}>Custom Tokens</Text>
          <FlatList
            data={customTokens}
            keyExtractor={(item) => item.address}
            renderItem={({ item }) => (
              <View style={styles.tokenItem}>
                <Text>{item.name} ({item.symbol})</Text>
                <Switch value={true} onValueChange={() => {}} />
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  error: {
    color: 'red',
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  tokenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default TokenManagementScreen;