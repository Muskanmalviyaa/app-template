import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  WISHLIST: 'wishlist',
  CART: 'cart',
  NOTIFICATIONS: 'notifications',
  USER_TOKEN: 'USER_TOKEN',
  USER_DATA: 'USER_DATA',
};

export const getStorageData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error(`Error getting data for key ${key}:`, e);
    return null;
  }
};

export const setStorageData = async (key, value) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (e) {
    console.error(`Error setting data for key ${key}:`, e);
  }
};

export const removeStorageData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(`Error removing data for key ${key}:`, e);
  }
};

export const reduxPersistStorage = {
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  getItem: async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  },
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};

export default {
  StorageKeys,
  getStorageData,
  setStorageData,
  removeStorageData,
  reduxPersistStorage,
};
