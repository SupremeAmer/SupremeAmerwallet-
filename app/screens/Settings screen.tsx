import React from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [biometricEnabled, setBiometricEnabled] = React.useState(false);
  
  const handleLogout = () => {
    // Implement logout logic
    navigation.navigate('CreateWallet' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      
      <View style={styles.settingItem}>
        <Text>Enable Biometric Authentication</Text>
        <Switch
          value={biometricEnabled}
          onValueChange={setBiometricEnabled}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text>Currency: USD</Text>
      </View>
      
      <View style={styles.settingItem}>
        <Text>Network Settings</Text>
      </View>
      
      <Button 
        title="Manage Tokens" 
        onPress={() => navigation.navigate('TokenManagement' as never)} 
      />
      
      <View style={styles.logoutContainer}>
        <Button title="Log Out" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logoutContainer: {
    marginTop: 40,
  },
});

export default SettingsScreen;