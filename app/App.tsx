import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppNavigator } from '@navigation/AppNavigator';
import { AuthService } from '@services/authService';
import { WalletProvider } from '@hooks/useWallet';
import CreateWalletScreen from '@screens/CreateWalletScreen';
import ImportWalletScreen from '@screens/ImportWalletScreen';
import HomeScreen from '@screens/HomeScreen';
import SendScreen from '@screens/SendScreen';
import ReceiveScreen from '@screens/ReceiveScreen';
import SettingsScreen from '@screens/SettingsScreen';
import TokenManagementScreen from '@screens/TokenManagementScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.log('No user logged in');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <WalletProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Send" component={SendScreen} />
              <Stack.Screen name="Receive" component={ReceiveScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="TokenManagement" component={TokenManagementScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="CreateWallet" component={CreateWalletScreen} options={{ title: 'Create Wallet' }} />
              <Stack.Screen name="ImportWallet" component={ImportWalletScreen} options={{ title: 'Import Wallet' }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </WalletProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});