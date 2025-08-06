import * as SecureStore from 'expo-secure-store';
import AES from 'react-native-aes-crypto';
import { randomBytes } from 'react-native-randombytes';

const KEYCHAIN_SERVICE = 'com.supremeamer.wallet';
const IV_SIZE = 16;

export const generateKey = (password: string, salt: string): Promise<string> => {
  return AES.pbkdf2(password, salt, 5000, 256, 'SHA-512');
};

export const encryptData = async (data: string, key: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    randomBytes(IV_SIZE, (err, iv) => {
      if (err) return reject(err);
      
      AES.encrypt(data, key, iv.toString('base64'), 'aes-256-cbc')
        .then(cipherText => resolve(`${iv.toString('base64')}:${cipherText}`))
        .catch(reject);
    });
  });
};

export const decryptData = async (encryptedData: string, key: string): Promise<string> => {
  const [ivBase64, cipherText] = encryptedData.split(':');
  return AES.decrypt(cipherText, key, ivBase64, 'aes-256-cbc');
};

export const storePrivateKey = async (privateKey: string, password: string) => {
  let salt = await SecureStore.getItemAsync('encryption_salt');
  if (!salt) {
    salt = await new Promise<string>((resolve, reject) => {
      randomBytes(16, (err, bytes) => {
        if (err) return reject(err);
        const newSalt = bytes.toString('base64');
        SecureStore.setItemAsync('encryption_salt', newSalt);
        resolve(newSalt);
      });
    });
  }
  
  const key = await generateKey(password, salt);
  const encrypted = await encryptData(privateKey, key);
  await SecureStore.setItemAsync('encrypted_private_key', encrypted);
};

export const getPrivateKey = async (password: string): Promise<string> => {
  const salt = await SecureStore.getItemAsync('encryption_salt');
  if (!salt) throw new Error('Salt not found');
  
  const key = await generateKey(password, salt);
  const encrypted = await SecureStore.getItemAsync('encrypted_private_key');
  if (!encrypted) throw new Error('No private key stored');
  
  return decryptData(encrypted, key);
};