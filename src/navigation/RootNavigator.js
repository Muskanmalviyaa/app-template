import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AuthNavigator from './Auth';
import MainNavigator from './Main';
import { bootstrapAuth } from '../redux/slices/authSlice';
import CommonScreen from '../screens/comman/CommonScreen';

export const RootNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const [showSplash, setShowSplash] = useState(true);

  // Restore authentication session in the background while splash is shown
  useEffect(() => {
    dispatch(bootstrapAuth()).catch((err) => {
      console.log('Session bootstrap error:', err);
    });
  }, [dispatch]);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  // Display animated splash screen with logo on app launch
  if (showSplash) {
    return <CommonScreen onFinish={handleSplashFinish} duration={3000} />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
