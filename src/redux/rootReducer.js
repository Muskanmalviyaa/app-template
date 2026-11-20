import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import walletReducer from './slices/walletSlice';
import packageReducer from './slices/packageSlice';
import couponReducer from './slices/couponSlice';
import incomeReducer from './slices/incomeSlice';
import bankReducer from './slices/bankSlice';
import catalogReducer from './slices/catalogSlice';
import notificationReducer from './slices/notificationSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  wallet: walletReducer,
  packages: packageReducer,
  coupons: couponReducer,
  income: incomeReducer,
  bank: bankReducer,
  catalog: catalogReducer,
  notifications: notificationReducer,
});

export default rootReducer;
