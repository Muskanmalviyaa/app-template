import axios from 'axios';
import { BASE_URL } from '../config/apiKeys';
import { getSecureItem } from './storage/keychain';

let globalStore = null;

export const injectStore = (store) => {
  globalStore = store;
};

const cleanBase = (BASE_URL || '').replace(/\/+$/, '');

const apiClient = axios.create({
  baseURL: cleanBase,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach token & log outgoing requests
apiClient.interceptors.request.use(
  async (config) => {
    try {
      let token = await getSecureItem('USER_TOKEN');
      if (!token && globalStore) {
        token = globalStore.getState()?.auth?.token;
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('Error getting token for API request', error);
    }

    if (config.url) {
      config.url = config.url.replace(/^\/+/, '');
    }

    const fullUrl = `${config.baseURL}/${config.url || ''}`;
    console.log(`[API Request] ${config.method?.toUpperCase()} ${fullUrl}`, config.data ? JSON.stringify(config.data) : '');

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: log responses & handle errors
apiClient.interceptors.response.use(
  (response) => {
    const fullUrl = `${response.config.baseURL}/${(response.config.url || '').replace(/^\/+/, '')}`;
    console.log(`[API Response - Status ${response.status}] ${response.config.method?.toUpperCase()} ${fullUrl} =>`, response.data);
    return response;
  },
  (error) => {
    const fullUrl = error.config
      ? `${error.config.baseURL}/${(error.config.url || '').replace(/^\/+/, '')}`
      : error.message;
    console.log(`❌ [API Error] ${error.config?.method?.toUpperCase()} ${fullUrl} =>`, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getApi = async (url, config = {}) => {
  return await apiClient.get(url, config);
};

export const postApi = async (url, data = {}, config = {}) => {
  return await apiClient.post(url, data, config);
};

export const putApi = async (url, data = {}, config = {}) => {
  return await apiClient.put(url, data, config);
};

export const deleteApi = async (url, config = {}) => {
  return await apiClient.delete(url, config);
};

export default apiClient;
