import { Client, Databases } from 'node-appwrite';
import admin from 'firebase-admin';

export default async ({ req, res, log, error }) => {
  // Initialize Firebase if not already initialized
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS)),
    });
  }

  const { userId, txData } = JSON.parse(req.body);

  try {
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);

    const user = await databases.getDocument('wallet_db', 'users', userId);
    if (!user || !user.fcmToken) {
      throw new Error('User FCM token not found');
    }

    const message = {
      notification: {
        title: `Transaction ${txData.type === 'send' ? 'Sent' : 'Received'}`,
        body: `${txData.amount} ${txData.symbol} ${txData.type === 'send' ? 'to' : 'from'} ${txData.counterparty.substring(0, 6)}...`,
      },
      data: {
        txHash: txData.hash,
        network: txData.network,
        type: 'transaction'
      },
      token: user.fcmToken
    };

    await admin.messaging().send(message);

    return res.json({ success: true });
  } catch (err) {
    error(err.message);
    return res.json({ success: false, error: err.message }, 500);
  }
};