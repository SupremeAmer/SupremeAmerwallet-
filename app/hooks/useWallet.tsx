import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { NETWORKS } from '@constants/networks';
import { WalletService } from '@lib/walletService';
import { decryptData } from '@lib/security';
import { BlockchainService } from '@lib/blockchainService';

interface WalletContextType {
  wallet: any;
  network: keyof typeof NETWORKS;
  setNetwork: (network: keyof typeof NETWORKS) => void;
  createWallet: () => Promise<void>;
  importWallet: (mnemonic: string) => Promise<void>;
  isInitialized: boolean;
  sendTransaction: (to: string, amount: string) => Promise<string>;
}

const WalletContext = createContext<WalletContextType>({} as WalletContextType);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<any>(null);
  const [network, setNetwork] = useState<keyof typeof NETWORKS>('ETH');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      const storedNetwork = await SecureStore.getItemAsync('network');
      if (storedNetwork && Object.keys(NETWORKS).includes(storedNetwork)) {
        setNetwork(storedNetwork as keyof typeof NETWORKS);
      }
      
      const encryptedWallet = await SecureStore.getItemAsync('encryptedWallet');
      if (encryptedWallet) {
        setWallet(JSON.parse(encryptedWallet));
      }
      
      setIsInitialized(true);
    };
    init();
  }, []);

  const createWallet = useCallback(async () => {
    const newWallet = await WalletService.createWallet();
    setWallet(newWallet);
    await SecureStore.setItemAsync('encryptedWallet', JSON.stringify(newWallet));
  }, []);

  const importWallet = useCallback(async (mnemonic: string) => {
    const importedWallet = await WalletService.importWallet(mnemonic);
    setWallet(importedWallet);
    await SecureStore.setItemAsync('encryptedWallet', JSON.stringify(importedWallet));
  }, []);

  const sendTransaction = useCallback(async (to: string, amount: string) => {
    if (!wallet) throw new Error('Wallet not initialized');
    
    const txHash = await BlockchainService.sendTransaction(
      wallet.address,
      to,
      amount,
      wallet.privateKey,
      network
    );
    
    return txHash;
  }, [wallet, network]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        network,
        setNetwork: (net) => {
          setNetwork(net);
          SecureStore.setItemAsync('network', net);
        },
        createWallet,
        importWallet,
        isInitialized,
        sendTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);