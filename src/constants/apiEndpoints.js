import { BASE_URL } from '../config/apiKeys';

export { BASE_URL };
export * from '../redux/apiEndpoint';

export const API_ENDPOINTS = {
  // 1. Authentication & Profile Screens
  USER: {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    PROFILE: 'users/profile',
  },

  // 2. Home & Catalog Screens
  CATALOG: {
    CATEGORIES: 'users/categories',
    SUBCATEGORIES: (categoryId) =>
      categoryId ? `users/subcategories/${categoryId}` : 'users/subcategories',
    PRODUCTS: 'users/products',
    SERVICES: 'users/services',
    CMS_CONTENT: 'users/banners',
  },

  // 3. Cart & Checkout Screens
  CART: {
    ADD: 'users/cart/add',
    VIEW: 'users/cart',
  },

  // 4. Package & Subscription Screens
  PACKAGES: {
    LIST: 'users/packages',
    PURCHASE_CREATE: 'users/package/buy',
    MY_PURCHASES: 'users/package/my-purchases',
  },

  // 5. Wallet & Fund Request Screens
  WALLET: {
    FUND_REQUEST_CREATE: 'users/fund-request',
    FUND_REQUEST_HISTORY: 'users/fund-request/history',
  },

  // 6. Earnings & Network Screens (MLM/Referral)
  EARNINGS: {
    REFERRAL_INCOME: 'users/referral-income',
    LEVEL_INCOME: 'users/binary-tree',
    PASSIVE_INCOME: 'users/passive-income',
    CTO_INCOME: 'users/cto-income',
  },

  // 7. Bank & Withdrawal Screens
  BANK: {
    ADD: 'users/bank-details',
    DETAILS: 'users/bank-details',
  },

  // Backward-compatible aliases for existing code
  AUTH: {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    PROFILE: 'users/profile',
    LOGOUT: 'users/logout',
  },
  SERVICES: {
    LIST: 'users/services',
    USE: 'users/services/use',
  },
  INCOMES: {
    BINARY: 'users/binary-tree',
    PASSIVE: 'users/passive-income',
  },
};
