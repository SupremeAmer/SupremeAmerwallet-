import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useWallet } from '@hooks/useWallet';
import { useNavigation } from '@react-navigation/native';

const CreateWalletScreen = () => {
  const { createWallet } = useWallet();
  const navigation = useNavigation();
  const [mnemonic, setMnemonic] = useState('');
  const [step, setStep] = useState(1);

  const handleCreate = async () => {
    const wallet = await createWallet();
    setMnemonic(wallet.mnemonic);
    setStep(2);
  };

  const confirmRecovery = () => {
    setStep(3);
  };

  const goToHome = () => {
    navigation.navigate('Home' as never);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.title}>Create New Wallet</Text>
          <Text style={styles.description}>
            A new wallet will be generated. Make sure to securely store your recovery phrase.
          </Text>
          <Button title="Create Wallet" onPress={handleCreate} />
        </>
      )}
      
      {step === 2 && (
        <>
          <Text style={styles.title}>Your Recovery Phrase</Text>
          <Text style={styles.warning}>
            Write down these words in order and store them securely. Never share them with anyone!
          </Text>
          <View style={styles.mnemonicContainer}>
            <Text style={styles.mnemonic}>{mnemonic}</Text>
          </View>
          <Button title="I've Saved It Securely" onPress={confirmRecovery} />
        </>
      )}
      
      {step === 3 && (
        <>
          <Text style={styles.title}>Wallet Created</Text>
          <Text style={styles.description}>
            Your wallet has been successfully created. You can now start using SupremeAmer Wallet.
          </Text>
          <Button title="Go to Wallet" onPress={goToHome} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  warning: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  mnemonicContainer: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  mnemonic: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CreateWalletScreen;