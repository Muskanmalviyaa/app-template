import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, Fonts } from '../constants';
import UserDashboard from '../screens/main/UserDashboard';
import PackagesCatalog from '../screens/main/PackagesCatalog';
import ServicesExplorer from '../screens/main/ServicesExplorer';
import AddFunds from '../screens/main/AddFunds';
import UserProfile from '../screens/main/UserProfile';

const Tab = createBottomTabNavigator();

const renderTabIcon = (routeName, focused, color, size) => {
  let iconName;

  if (routeName === 'HomeTab') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (routeName === 'PackagesTab') {
    iconName = focused ? 'cube' : 'cube-outline';
  } else if (routeName === 'ServicesTab') {
    iconName = focused ? 'grid' : 'grid-outline';
  } else if (routeName === 'WalletTab') {
    iconName = focused ? 'wallet' : 'wallet-outline';
  } else if (routeName === 'ProfileTab') {
    iconName = focused ? 'person' : 'person-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

export const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: Fonts.inter.medium,
          fontSize: SIZES.caption,
        },
        tabBarIcon: ({ focused, color, size }) =>
          renderTabIcon(route.name, focused, color, size),
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={UserDashboard}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="PackagesTab"
        component={PackagesCatalog}
        options={{ tabBarLabel: 'Packages' }}
      />
      <Tab.Screen
        name="ServicesTab"
        component={ServicesExplorer}
        options={{ tabBarLabel: 'Services' }}
      />
      <Tab.Screen
        name="WalletTab"
        component={AddFunds}
        options={{ tabBarLabel: 'Wallet' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={UserProfile}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
