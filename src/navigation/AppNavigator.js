import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import AuthNavigator from './AuthNavigator';
import BottomTabNav from './BottomTabNav';
import BinaryNetwork from '../screens/main/BinaryNetwork';
import AddFunds from '../screens/main/AddFunds';
import PackagesCatalog from '../screens/main/PackagesCatalog';
import ServicesExplorer from '../screens/main/ServicesExplorer';
import PrivacyPolicyScreen from '../screens/public/PrivacyPolicyScreen';
import TermsConditionScreen from '../screens/public/TermsConditionScreen';
import CommonScreen from '../screens/comman/CommonScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Common" component={CommonScreen} />
        {isAuthenticated ? (
          <>
            <Stack.Screen name="MainTabs" component={BottomTabNav} />
            <Stack.Screen name="BinaryNetwork" component={BinaryNetwork} />
            <Stack.Screen name="AddFunds" component={AddFunds} />
            <Stack.Screen name="Packages" component={PackagesCatalog} />
            <Stack.Screen name="Services" component={ServicesExplorer} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            <Stack.Screen name="TermsCondition" component={TermsConditionScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Auth" component={AuthNavigator} />
            <Stack.Screen name="MainTabs" component={BottomTabNav} />
            <Stack.Screen name="BinaryNetwork" component={BinaryNetwork} />
            <Stack.Screen name="AddFunds" component={AddFunds} />
            <Stack.Screen name="Packages" component={PackagesCatalog} />
            <Stack.Screen name="Services" component={ServicesExplorer} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            <Stack.Screen name="TermsCondition" component={TermsConditionScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
