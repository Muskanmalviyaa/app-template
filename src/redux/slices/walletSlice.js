import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  isLoading: false,
  error: null,
  transactions: [],
  fundRequests: [],
  companyBank: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setCompanyBank: (state, action) => {
      state.companyBank = action.payload;
    },
    setFundRequests: (state, action) => {
      state.fundRequests = action.payload || [];
      state.transactions = action.payload || [];
    },
    addFundRequest: (state, action) => {
      state.fundRequests.unshift(action.payload);
      state.transactions.unshift(action.payload);
    },
    deductBalance: (state, action) => {
      const amount = action.payload.amount;
      const description = action.payload.description || 'Package Purchase';
      if (state.balance >= amount) {
        state.balance -= amount;
        state.transactions.unshift({
          id: 'tx_' + Date.now(),
          type: 'DEBIT',
          amount,
          description,
          date:
            new Date().toLocaleDateString() +
            ' ' +
            new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'SUCCESS',
        });
      }
    },
    addTransaction: (state, action) => {
      state.transactions.unshift(action.payload);
      if (action.payload.amount) {
        state.balance += action.payload.amount;
      }
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setWalletLoading: (state, action) => {
      state.isLoading = !!action.payload;
    },
    setWalletError: (state, action) => {
      state.error = action.payload;
    },
    clearWalletError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setBalance,
  setCompanyBank,
  setFundRequests,
  addFundRequest,
  deductBalance,
  addTransaction,
  setTransactions,
  setWalletLoading,
  setWalletError,
  clearWalletError,
} = walletSlice.actions;

export {
  addFundsApi,
  fetchFundHistoryApi,
  fetchCompanyBankApi,
  addFunds,
  fetchFundHistory,
  fetchCompanyBank,
  getTransactionsApi,
  getUserTransactionsApi,
  submitDepositApi,
  withdrawFundsApi,
  withdrawFunds,
} from '../actions/walletAction';

export default walletSlice.reducer;
