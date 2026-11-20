import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import store from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootNavigator />
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
