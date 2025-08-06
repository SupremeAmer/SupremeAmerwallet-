import { Client, Databases } from 'node-appwrite';
import admin from 'firebase-admin';

export default async ({ req, res, log, error }) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS))
    });
  }

  const { userId, txData } = JSON.parse(req.body);
  
  try {
    // Get user's FCM token
    const databases = new Databases(new Client());
    const user = await databases.getDocument(
      'wallet_db', 
      'users', 
      userId
    );
    
    // Send notification
    await admin.messaging().send({
      token: user.fcmToken,
      notification: {
        title: `Transaction ${txData.type}`,
        body: `${txData.amount} ${txData.symbol} ${txData.type}`
      },
      data: {
        txHash: txData.hash,
        network: txData.network
      }
    });
    
    return res.json({ success: true });
  } catch (err) {
    error(err.message);
    return res.json({ success: false, error: err.message }, 500);
  }
};