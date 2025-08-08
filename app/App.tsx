import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WalletProvider } from '@hooks/useWallet';
import { AuthService } from '@services/authService';
import CreateWalletScreen from '@screens/CreateWalletScreen';
import ImportWalletScreen from '@screens/ImportWalletScreen';
import HomeScreen from '@screens/HomeScreen';
import SendScreen from '@screens/SendScreen';
import ReceiveScreen from '@screens/ReceiveScreen';
import SettingsScreen from '@screens/SettingsScreen';
import TokenManagementScreen from '@screens/TokenManagementScreen';
import { AppNavigator } from '@navigation/AppNavigator'; // Make sure this exists
import { RootStackParamList } from '@types/types'; // Add proper typing

// Create typed stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Update your App component
import { User } from '@types/types';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null); // Use proper type

  
}

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
              <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ headerShown: false }} 
              />
              <Stack.Screen 
                name="Send" 
                component={SendScreen} 
                options={{ title: 'Send Crypto' }} 
              />
              <Stack.Screen 
                name="Receive" 
                component={ReceiveScreen} 
                options={{ title: 'Receive Crypto' }} 
              />
              <Stack.Screen 
                name="Settings" 
                component={SettingsScreen} 
                options={{ title: 'Settings' }} 
              />
              <Stack.Screen 
                name="TokenManagement" 
                component={TokenManagementScreen} 
                options={{ title: 'Manage Tokens' }} 
              />
            </>
          ) : (
            <>
              <Stack.Screen 
                name="CreateWallet" 
                component={CreateWalletScreen} 
                options={{ title: 'Create Wallet' }} 
              />
              <Stack.Screen 
                name="ImportWallet" 
                component={ImportWalletScreen} 
                options={{ title: 'Import Wallet' }} 
              />
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
    backgroundColor: '#fff',
  },
});