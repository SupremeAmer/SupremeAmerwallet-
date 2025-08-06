import * as SecureStore from 'expo-secure-store';
import AES from 'react-native-aes-crypto';
import { randomBytes } from 'react-native-randombytes';

const KEYCHAIN_SERVICE = 'com.supremeamer.wallet';
const IV_SIZE = 16;

export const generateEncryptionKey = async (password: string, salt: string) => {
  return AES.pbkdf2(password, salt, 5000, 256, 'SHA-512');
};

export const encryptData = async (data: string, key: string): Promise<string> => {
  const iv = await new Promise<string>((resolve, reject) => {
    randomBytes(IV_SIZE, (err, bytes) => {
      if (err) reject(err);
      else resolve(bytes.toString('base64'));
    });
  });
  
  const cipherText = await AES.encrypt(data, key, iv, 'aes-256-cbc');
  return `${iv}:${cipherText}`;
};

export const decryptData = async (encryptedData: string, key: string): Promise<string> => {
  const [iv, cipherText] = encryptedData.split(':');
  return AES.decrypt(cipherText, key, iv, 'aes-256-cbc');
};

export const storePrivateKey = async (privateKey: string, password: string) => {
  const salt = await SecureStore.getItemAsync('encryption_salt') || 
               (await new Promise<string>((resolve, reject) => {
                 randomBytes(16, (err, bytes) => {
                   if (err) reject(err);
                   else {
                     const salt = bytes.toString('base64');
                     SecureStore.setItemAsync('encryption_salt', salt);
                     resolve(salt);
                   }
                 });
               }));
  
  const encryptionKey = await generateEncryptionKey(password, salt);
  const encrypted = await encryptData(privateKey, encryptionKey);
  await SecureStore.setItemAsync('encrypted_private_key', encrypted);
};