import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNav from './BottomTabNav';
import BinaryNetwork from '../screens/main/BinaryNetwork';
import AddFunds from '../screens/main/AddFunds';
import PackagesCatalog from '../screens/main/PackagesCatalog';
import ServicesExplorer from '../screens/main/ServicesExplorer';
import PrivacyPolicyScreen from '../screens/public/PrivacyPolicyScreen';
import TermsConditionScreen from '../screens/public/TermsConditionScreen';

const Stack = createNativeStackNavigator();

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

export default MainNavigator;
