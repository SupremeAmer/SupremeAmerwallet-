import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useWallet } from '@hooks/useWallet';
import { useNavigation } from '@react-navigation/native';

const ImportWalletScreen = () => {
  const { importWallet } = useWallet();
  const navigation = useNavigation();
  const [mnemonic, setMnemonic] = useState('');
  const [error, setError] = useState('');

  const handleImport = async () => {
    if (!mnemonic.trim()) {
      setError('Please enter your recovery phrase');
      return;
    }
    
    try {
      await importWallet(mnemonic.trim());
      navigation.navigate('Home' as never);
    } catch (err) {
      setError('Invalid recovery phrase. Please check and try again.');
      console.error('Import error:', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Import Wallet</Text>
      <Text style={styles.description}>
        Enter your 12 or 24-word recovery phrase to restore your wallet
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter recovery phrase"
        value={mnemonic}
        onChangeText={setMnemonic}
        multiline
        numberOfLines={4}
        autoCapitalize="none"
      />
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <Button title="Import Wallet" onPress={handleImport} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ImportWalletScreen;