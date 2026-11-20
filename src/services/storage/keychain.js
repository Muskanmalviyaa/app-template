import AsyncStorage from '@react-native-async-storage/async-storage';

export const setSecureItem = async (key, value) => {
  try {
    const val = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, val);
  } catch (e) {
    console.error('Error setting secure item', e);
  }
};

export const getSecureItem = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error('Error getting secure item', e);
    return null;
  }
};

export const deleteSecureItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error deleting secure item', e);
  }
};

export default {
  setSecureItem,
  getSecureItem,
  deleteSecureItem,
};
