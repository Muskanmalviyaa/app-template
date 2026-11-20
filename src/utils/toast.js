import Toast from 'react-native-toast-message';
import { Platform, ToastAndroid, Alert } from 'react-native';

export const showToast = (message) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('', message);
  }
};

export { Toast };
export default Toast;
