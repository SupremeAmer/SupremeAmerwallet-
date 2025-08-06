import { Client, Account, Databases, Query } from 'appwrite';
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from '@config';

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

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

export const saveTransaction = async (txData: any) => {
  return databases.createDocument(
    DB_ID,
    COLLECTION_TRANSACTIONS,
    txData.hash,
    txData
  );
};

export const getTransactions = async (userId: string, limit = 20) => {
  return databases.listDocuments(
    DB_ID,
    COLLECTION_TRANSACTIONS,
    [
      Query.equal('userId', userId),
      Query.orderDesc('timestamp'),
      Query.limit(limit)
    ]
  );
};

export const addCustomToken = async (tokenData: any) => {
  return databases.createDocument(
    DB_ID,
    COLLECTION_TOKENS,
    tokenData.address + '_' + tokenData.userId,
    tokenData
  );
};

export const getUserTokens = async (userId: string) => {
  return databases.listDocuments(
    DB_ID,
    COLLECTION_TOKENS,
    [Query.equal('userId', userId)]
  );
};