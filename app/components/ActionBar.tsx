import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ActionBarProps {
  actions: string[];
  onActionPress: (action: string) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ actions, onActionPress }) => {
  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity 
          key={action} 
          style={styles.button} 
          onPress={() => onActionPress(action)}
        >
          <Text style={styles.buttonText}>{action}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default ActionBar;