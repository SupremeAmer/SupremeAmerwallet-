import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen';
import SettingsScreen from '@screens/SettingsScreen';
import { TabBar } from '@components/TabBar';
import TrendingScreen from '@screens/TrendingScreen';
import SwapScreen from '@screens/SwapScreen';
import EarnScreen from '@screens/EarnScreen';
import DiscoverScreen from '@screens/DiscoverScreen';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Trending" 
        component={TrendingScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Swap" 
        component={SwapScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Earn" 
        component={EarnScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Discover" 
        component={DiscoverScreen} 
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  );
};