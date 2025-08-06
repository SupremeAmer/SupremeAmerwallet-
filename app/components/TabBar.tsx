import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface TabBarProps {
  tabs: string[];
}

const TabBar: React.FC<TabBarProps> = ({ tabs }) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = React.useState(tabs[0]);

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => {
            setActiveTab(tab);
            navigation.navigate(tab as never);
          }}
        >
          <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
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
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tab: {
    padding: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0066cc',
  },
  tabText: {
    color: '#666',
  },
  activeTabText: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});

export default TabBar;