import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useWallet } from '@hooks/useWallet';
import { NETWORKS } from '@constants/networks';

const NetworkSelector: React.FC = () => {
  const { network, setNetwork } = useWallet();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (net: keyof typeof NETWORKS) => {
    setNetwork(net);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.button}>
        <Text>{NETWORKS[network].name}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          {Object.keys(NETWORKS).map((net) => (
            <TouchableOpacity 
              key={net} 
              style={styles.dropdownItem}
              onPress={() => handleSelect(net as keyof typeof NETWORKS)}
            >
              <Text>{NETWORKS[net as keyof typeof NETWORKS].name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    zIndex: 10,
    minWidth: 120,
  },
  dropdownItem: {
    padding: 8,
  },
});

export default NetworkSelector;