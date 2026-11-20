import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getApi, postApi } from '../../services/api';
import {
  getNotificationsEndpoint,
  markNotificationReadEndpoint,
  markAllNotificationsReadEndpoint,
} from '../apiEndpoint';

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif_1',
    title: 'Direct Referral Commission Credited',
    message: '₹630.00 direct referral commission credited from Rajesh Kumar (SAR789012).',
    type: 'income',
    category: 'INCOME',
    targetScreen: 'IncomesEarnings',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    isRead: false,
  },
  {
    id: 'notif_2',
    title: 'Diwali Festive Special 50% Off',
    message: 'Upgrade to Package 2 (Diamond) and unlock bumper referral limits up to ₹10,00,000.',
    type: 'offer',
    category: 'OFFERS',
    targetScreen: 'PackageStore',
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    isRead: false,
  },
  {
    id: 'notif_3',
    title: '10 Complimentary Service Passes Ready',
    message: 'Your 10 digital service vouchers are unlocked. Redeem for CA, Legal or Health advice anytime.',
    type: 'service',
    category: 'SERVICES',
    targetScreen: 'ServiceCoupons',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    isRead: false,
  },
  {
    id: 'notif_4',
    title: 'Purchase Wallet Ready',
    message: 'Your purchase wallet is verified. Add funds instantly via official QR code to activate packages.',
    type: 'wallet',
    category: 'WALLET',
    targetScreen: 'AddFundsScreen',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    isRead: true,
  },
  {
    id: 'notif_5',
    title: 'New Member in Binary Right Leg',
    message: 'A new member has joined your right leg. Binary matching points updated in real-time.',
    type: 'team',
    category: 'TEAM',
    targetScreen: 'BinaryNetwork',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    isRead: true,
  },
  {
    id: 'notif_6',
    title: 'Welcome to Sarthi Services & Commerce',
    message: 'We are thrilled to have you! Explore our digital consultancy, eCommerce store, and affiliate rewards.',
    type: 'system',
    category: 'SYSTEM',
    targetScreen: 'BottomTabs',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    isRead: true,
  },
];

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getApi(getNotificationsEndpoint);
      const data = res?.data?.data || res?.data?.notifications || res?.data || [];
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item, index) => ({
          id: item._id || item.id || `server_notif_${index}`,
          title: item.title || 'Notification',
          message: item.message || item.body || item.description || '',
          type: item.type || 'system',
          category: (item.category || item.type || 'SYSTEM').toUpperCase(),
          targetScreen: item.targetScreen || item.screen || null,
          createdAt: item.createdAt || item.date || new Date().toISOString(),
          isRead: !!(item.isRead || item.read),
        }));
      }
      return null;
    } catch (err) {
      console.log('fetchNotifications API returned error or empty, using state fallback:', err?.message);
      return rejectWithValue(err?.message);
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  'notifications/markNotificationRead',
  async (notificationId, { dispatch }) => {
    dispatch(notificationSlice.actions.markReadLocal(notificationId));
    try {
      if (notificationId && !notificationId.startsWith('notif_')) {
        await postApi(markNotificationReadEndpoint(notificationId));
      }
    } catch (err) {
      console.log('markNotificationRead error:', err?.message);
    }
    return notificationId;
  }
);

export const markAllNotificationsRead = createAsyncThunk(
  'notifications/markAllNotificationsRead',
  async (_, { dispatch }) => {
    dispatch(notificationSlice.actions.markAllReadLocal());
    try {
      await postApi(markAllNotificationsReadEndpoint);
    } catch (err) {
      console.log('markAllNotificationsRead error:', err?.message);
    }
  }
);

const initialState = {
  notifications: DEFAULT_NOTIFICATIONS,
  unreadCount: DEFAULT_NOTIFICATIONS.filter((n) => !n.isRead).length,
  isLoading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markReadLocal: (state, action) => {
      const id = action.payload;
      const target = state.notifications.find((n) => n.id === id);
      if (target && !target.isRead) {
        target.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllReadLocal: (state) => {
      state.notifications.forEach((n) => {
        n.isRead = true;
      });
      state.unreadCount = 0;
    },
    deleteNotificationLocal: (state, action) => {
      const id = action.payload;
      const target = state.notifications.find((n) => n.id === id);
      if (target && !target.isRead) {
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
      state.notifications = state.notifications.filter((n) => n.id !== id);
    },
    clearAllNotificationsLocal: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          state.notifications = action.payload;
          state.unreadCount = action.payload.filter((n) => !n.isRead).length;
        }
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.isLoading = false;
        // Keep initial state notifications
      });
  },
});

export const {
  markReadLocal,
  markAllReadLocal,
  deleteNotificationLocal,
  clearAllNotificationsLocal,
} = notificationSlice.actions;

export default notificationSlice.reducer;
