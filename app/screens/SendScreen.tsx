import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useWallet } from '@hooks/useWallet';
import QRCodeScanner from './QRCodeScanner';

const SendScreen = () => {
  const { wallet, sendTransaction } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!wallet) {
      setError('Wallet not initialized');
      return;
    }
    
    if (!recipient) {
      setError('Please enter recipient address');
      return;
    }
    
    if (!amount || isNaN(parseFloat(amount)) {
      setError('Please enter a valid amount');
      return;
    }
    
    try {
      const txHash = await sendTransaction(recipient, amount);
      Alert.alert(
        'Transaction Sent', 
        `Transaction hash: ${txHash}`,
        [{ text: 'OK' }]
      );
      setRecipient('');
      setAmount('');
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to send transaction');
    }
  };

  const handleScan = (data: string) => {
    setRecipient(data);
    setIsScanning(false);
  };

  if (isScanning) {
    return <QRCodeScanner onScan={handleScan} onCancel={() => setIsScanning(false)} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Crypto</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Recipient Address"
        value={recipient}
        onChangeText={setRecipient}
      />
      
      <Button title="Scan QR Code" onPress={() => setIsScanning(true)} />
      
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
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
});

export default SendScreen;