import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bankDetails: null,
  isLoading: false,
  error: null,
  successMessage: null,
};

const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    setBankDetails: (state, action) => {
      state.bankDetails = action.payload;
    },
    setBankLoading: (state, action) => {
      state.isLoading = !!action.payload;
    },
    setBankError: (state, action) => {
      state.error = action.payload;
    },
    clearBankStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const {
  setBankDetails,
  setBankLoading,
  setBankError,
  clearBankStatus,
} = bankSlice.actions;

export {
  fetchBankDetailsApi,
  saveBankDetailsApi,
  fetchBankDetails,
  saveBankDetails,
} from '../actions/bankAction';

export default bankSlice.reducer;
