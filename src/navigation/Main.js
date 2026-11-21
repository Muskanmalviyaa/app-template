import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, Fonts } from '../constants';
import UserDashboard from '../screens/main/UserDashboard';
import PackagesCatalog from '../screens/main/PackagesCatalog';
import ServicesExplorer from '../screens/main/ServicesExplorer';
import AddFunds from '../screens/main/AddFunds';
import UserProfile from '../screens/main/UserProfile';
import BinaryNetwork from '../screens/main/BinaryNetwork';
import PrivacyPolicyScreen from '../screens/public/PrivacyPolicyScreen';
import TermsConditionScreen from '../screens/public/TermsConditionScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTabs" component={BottomTabNav} />
      <Stack.Screen name="BinaryNetwork" component={BinaryNetwork} />
      <Stack.Screen name="AddFunds" component={AddFunds} />
      <Stack.Screen name="Packages" component={PackagesCatalog} />
      <Stack.Screen name="Services" component={ServicesExplorer} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="TermsCondition" component={TermsConditionScreen} />
    </Stack.Navigator>
  );
};

export const Main = MainNavigator;
export default MainNavigator;
