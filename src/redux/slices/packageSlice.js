import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  catalog: [],
  myPurchases: [],
  earningTarget: {
    goal: 0,
    earned: 0,
    remaining: 0,
    percent: 0,
    activeCycle: false,
  },
  activePackages: [],
  isLoading: false,
  error: null,
  successMessage: null,
};

const packageSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    setCatalog: (state, action) => {
      state.catalog = action.payload || [];
    },
    setMyPurchases: (state, action) => {
      const list = Array.isArray(action.payload) ? action.payload : [];
      state.myPurchases = list;
      state.activePackages = list.map((item, idx) => ({
        id: item._id || item.id || `pkg_${idx}`,
        packageId: item.packageId?._id || item.packageId || item.id,
        name: item.packageId?.title || item.title || item.packageId?.name || 'Sarthi Package',
        price: item.amount || item.packageId?.price || 0,
        couponsGranted: item.packageId?.services?.length || 10,
        validity: '1-Year Full Validity',
        status: (item.status || 'ACTIVE').toUpperCase(),
        purchasedAt: item.createdAt
          ? new Date(item.createdAt).toLocaleDateString()
          : 'Active',
        features: Array.isArray(item.packageId?.features) && item.packageId?.features.length > 0
          ? item.packageId.features
          : ['Full Free Service Access', 'Direct Member Benefits'],
      }));
    },
    setEarningTarget: (state, action) => {
      state.earningTarget = {
        ...state.earningTarget,
        ...action.payload,
      };
    },
    addActivePackage: (state, action) => {
      state.activePackages.unshift(action.payload);
      state.successMessage = `Congratulations! You bought ${action.payload.name} and received ${action.payload.couponsGranted} coupons!`;
    },
    setPackageLoading: (state, action) => {
      state.isLoading = !!action.payload;
    },
    setPackageError: (state, action) => {
      state.error = action.payload;
    },
    clearPackageStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const {
  setCatalog,
  setMyPurchases,
  setEarningTarget,
  addActivePackage,
  setPackageLoading,
  setPackageError,
  clearPackageStatus,
} = packageSlice.actions;

export {
  fetchPackagesApi,
  buyPackageApi,
  fetchPackages,
  buyPackage,
  fetchMyPurchasesApi,
  fetchMyPurchases,
} from '../actions/packageAction';

export default packageSlice.reducer;
