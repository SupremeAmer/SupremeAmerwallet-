import messaging from '@react-native-firebase/messaging';
import { databases } from './appwriteService';

export class NotificationService {
  static async requestPermissions() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
    if (enabled) {
      console.log('Authorization status:', authStatus);
      const token = await messaging().getToken();
      return token;
    }
    return null;
  }

  static async setupBackgroundListener(userId: string) {
    // Save FCM token to Appwrite
    const token = await this.requestPermissions();
    if (token) {
      await databases.updateDocument('wallet_db', 'users', userId, { fcmToken: token });
    }

    // Background message handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background message:', remoteMessage);
      // Handle background notifications
    });

    // Foreground message handler
    messaging().onMessage(async remoteMessage => {
      console.log('Foreground message:', remoteMessage);
      // Display in-app notification
    });

    // Handle when a notification opens the app
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification opened app:', remoteMessage);
    });

    // Check if an initial notification opened the app
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Initial notification:', remoteMessage);
        }
      });
  }
}