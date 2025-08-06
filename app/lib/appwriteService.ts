import { Client, Account, Databases, Storage, Query, ID } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const databases = new Databases(client);

const DB_ID = 'wallet_db';
const COLLECTION_USERS = 'users';
const COLLECTION_TRANSACTIONS = 'transactions';
const COLLECTION_TOKENS = 'tokens';

export const createUserWallet = async (userId: string, encryptedData: string) => {
  return databases.createDocument(DB_ID, COLLECTION_USERS, userId, {
    encryptedData,
    created: new Date().toISOString()
  });
};

export const saveTransaction = async (txData: Transaction) => {
  return databases.createDocument(
    DB_ID,
    COLLECTION_TRANSACTIONS,
    ID.unique(),
    txData
  );
};