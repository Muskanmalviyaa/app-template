import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  couponBalance: 0,
  usedCount: 0,
  totalCoupons: 0,
  couponsList: [],
  services: [],
  isLoading: false,
  error: null,
  successMessage: null,
  history: [],
};

const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload || [];
    },
    syncCouponsFromPurchases: (state, action) => {
      const { purchases = [], user } = action.payload || {};
      const userCode = user?.username ? String(user.username).replace(/[^0-9]/g, '') || '1001' : '1001';

      if (!purchases || purchases.length === 0) {
        state.couponBalance = 0;
        state.totalCoupons = 0;
        state.usedCount = 0;
        state.couponsList = [];
        return;
      }

      const total = purchases.length * 10;
      const allVouchers = [];

      purchases.forEach((purch, pIdx) => {
        const pkg = purch.packageId || {};
        const count = 10;
        const packageName = pkg.title || purch.title || pkg.name || 'Sarthi Official Elite Package';

        for (let i = 0; i < count; i++) {
          const idx = allVouchers.length + 1;
          allVouchers.push({
            id: `cpn_${purch._id || pIdx}_${i}`,
            index: idx,
            total,
            code: `SAR-SART-${userCode}-${String(idx).padStart(2, '0')}`,
            packageName,
            status: 'AVAILABLE',
            entitlement: '1x Full Service Access (100% Free)',
            validity: '1-Year Validity',
            expiresAt: '14/11/2027',
          });
        }
      });

      const redeemedCodes = new Set(
        (state.history || [])
          .filter((h) => h.type === 'CONSUMED')
          .map((h) => h.voucherCode)
      );

      allVouchers.forEach((v) => {
        if (redeemedCodes.has(v.code)) {
          v.status = 'REDEEMED';
        }
      });

      const redeemedCount = allVouchers.filter((v) => v.status === 'REDEEMED').length;
      state.totalCoupons = allVouchers.length;
      state.usedCount = redeemedCount;
      state.couponBalance = Math.max(0, allVouchers.length - redeemedCount);
      state.couponsList = allVouchers;
    },
    addCoupons: (state, action) => {
      const { amount, source, username } = action.payload;
      const count = amount || 10;
      state.couponBalance += count;
      state.totalCoupons += count;

      const userCode = username ? String(username).replace(/[^0-9]/g, '') || '4444' : '4444';
      const startIndex = state.couponsList.length + 1;
      const newVouchers = [];

      for (let i = 0; i < count; i++) {
        const idx = startIndex + i;
        newVouchers.push({
          id: 'cpn_' + Date.now() + '_' + i,
          index: idx,
          total: state.totalCoupons,
          code: `SAR-SART-${userCode}-${String(idx).padStart(2, '0')}`,
          packageName: source || 'Sarthi Official Elite Package',
          status: 'AVAILABLE',
          entitlement: '1x Full Service Access (100% Free)',
          validity: '1-Year Validity',
          expiresAt: '14/11/2027',
        });
      }

      state.couponsList = [...state.couponsList, ...newVouchers];
      state.history.unshift({
        id: 'cpn_' + Date.now(),
        type: 'ALLOCATED',
        amount: count,
        description: `Allocated from ${source || 'Package Purchase'}`,
        date:
          new Date().toLocaleDateString() +
          ' ' +
          new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    },
    redeemCouponPass: (state, action) => {
      const { couponId, serviceName, serviceId } = action.payload;
      const now = new Date();
      const dateFormatted =
        now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
        ', ' +
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const receiptId = 'RDM-' + Math.floor(100000 + Math.random() * 900000);

      const target = state.couponsList.find((c) => c.id === couponId || c.code === couponId);
      if (target) {
        target.status = 'REDEEMED';
        target.redeemedService = serviceName;
        target.serviceId = serviceId;
        target.receiptId = receiptId;
        target.redeemedAt = dateFormatted;
      }

      state.couponBalance = Math.max(0, state.couponBalance - 1);
      state.usedCount += 1;
      state.successMessage = `Redeemed voucher for "${serviceName}"!`;

      state.history.unshift({
        id: 'cpn_rdm_' + Date.now(),
        receiptId,
        serviceName,
        voucherCode: target?.code || 'SAR-VOUCHER',
        date: dateFormatted,
        type: 'CONSUMED',
      });
    },
    useCoupon: (state, action) => {
      state.couponBalance = Math.max(0, state.couponBalance - 1);
      state.usedCount += 1;
      state.successMessage = `Successfully consumed 1 coupon for "${action.payload.serviceName}"!`;
      state.history.unshift({
        id: 'cpn_' + Date.now(),
        type: 'CONSUMED',
        amount: 1,
        description: `Used for ${action.payload.serviceName}`,
        date: action.payload.timestamp,
      });
    },
    setCouponLoading: (state, action) => {
      state.isLoading = !!action.payload;
    },
    setCouponError: (state, action) => {
      state.error = action.payload;
    },
    clearCouponStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const {
  setServices,
  syncCouponsFromPurchases,
  addCoupons,
  redeemCouponPass,
  useCoupon,
  setCouponLoading,
  setCouponError,
  clearCouponStatus,
} = couponSlice.actions;

export {
  fetchServicesListApi,
  consumeServiceCouponApi,
  fetchServicesList,
  getServicesApi,
  consumeServiceCoupon,
  redeemCouponPassAction,
} from '../actions/couponAction';

export default couponSlice.reducer;
