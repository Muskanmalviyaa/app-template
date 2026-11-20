import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalEarnings: 0,
  binaryIncome: 0,
  passiveIncome: 0,
  referralIncome: 0,
  ctoIncome: 0,
  binaryNetwork: {
    userNode: {
      id: 'USR_ROOT',
      name: 'Sarthi User',
      rank: 'Active Member',
      status: 'Active',
      leftBV: 0,
      rightBV: 0,
      matchedBV: 0,
    },
    leftTeam: [],
    rightTeam: [],
  },
  passiveLeads: [],
  isLoading: false,
  error: null,
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setIncomeData: (state, action) => {
      const payload = action.payload;
      state.totalEarnings = payload.totalEarnings ?? 0;
      state.binaryIncome = payload.binaryIncome ?? 0;
      state.passiveIncome = payload.passiveIncome ?? 0;
      state.referralIncome = payload.referralIncome ?? 0;
      state.ctoIncome = payload.ctoIncome ?? 0;

      if (Array.isArray(payload.passiveData?.list)) {
        state.passiveLeads = payload.passiveData.list;
      } else if (Array.isArray(payload.passiveData)) {
        state.passiveLeads = payload.passiveData;
      }

      if (payload.levelData?.userNode) {
        state.binaryNetwork.userNode = payload.levelData.userNode;
      }
      if (Array.isArray(payload.levelData?.leftTeam)) {
        state.binaryNetwork.leftTeam = payload.levelData.leftTeam;
      }
      if (Array.isArray(payload.levelData?.rightTeam)) {
        state.binaryNetwork.rightTeam = payload.levelData.rightTeam;
      }
    },
    setIncomeLoading: (state, action) => {
      state.isLoading = !!action.payload;
    },
    setIncomeError: (state, action) => {
      state.error = action.payload;
    },
    clearIncomeError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setIncomeData,
  setIncomeLoading,
  setIncomeError,
  clearIncomeError,
} = incomeSlice.actions;

export {
  fetchIncomeReportsApi,
  getReferralIncomeApi,
  getLevelIncomeApi,
  getPassiveIncomeApi,
  getCtoIncomeApi,
  fetchIncomeReports,
  fetchBinaryTreeApi,
  fetchBinaryTree,
  getUserReferralIncomeHistoryApi,
  fetchReferralIncomeHistory,
  fetchManualTransactionsApi,
  fetchManualTransactions,
  getReferralIncomeHistoryApi,
  fetchPassiveCategoriesApi,
  fetchPassiveRequestsApi,
  submitPassiveLeadApi,
  fetchPassiveCategories,
  fetchPassiveRequests,
  submitPassiveLead,
} from '../actions/incomeAction';

export default incomeSlice.reducer;
