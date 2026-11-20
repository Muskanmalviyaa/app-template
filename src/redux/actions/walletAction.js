import Toast from '../../utils/toast';
import { getApi, postApi } from '../../services/api';
import {
  fundRequestCreateEndpoint,
  fundRequestHistoryEndpoint,
  getCompanyBankEndpoint,
  withdrawalEndpoint,
} from '../apiEndpoint';
import {
  setWalletLoading,
  setWalletError,
  setTransactions,
  setFundRequests,
  addFundRequest,
  setCompanyBank,
} from '../slices/walletSlice';

const handleError = (error, cb, endpoint) => {
  const errorMsg = error?.response?.data?.message || error?.message || 'An error occurred.';
  console.log(`${endpoint} API ERROR -->`, errorMsg);
  Toast.show({ type: 'error', text1: errorMsg });
  cb?.({ success: false, message: errorMsg });
};

// 🔹 1. Fetch Official Company Bank & QR (GET users/company-bank)
export const fetchCompanyBankApi = (params = {}) => async (dispatch) => {
  const cb = params?.cb;

  try {
    cb?.({ loading: true });
    const response = await getApi(getCompanyBankEndpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${getCompanyBankEndpoint} API RESPONSE -->`, response?.data);
      const bank = response?.data?.data || response?.data?.bank || response?.data;
      if (bank) {
        dispatch(setCompanyBank(bank));
      }
      cb?.({ success: true, data: response?.data, bank });
      return { success: true, data: response?.data, bank };
    }
  } catch (error) {
    console.log(`${getCompanyBankEndpoint} API Notice -->`, error?.message);
    cb?.({ success: false, error: error.message });
    return { success: false, error: error.message };
  }
};

// 🔹 2. Submit Fund Request (POST users/fund-request)
export const addFundsApi = (params = {}) => async (dispatch) => {
  const payload = params?.payload || params;
  const cb = params?.cb;

  try {
    cb?.({ loading: true });
    dispatch(setWalletLoading(true));
    dispatch(setWalletError(null));

    const parsedAmount = parseFloat(payload.amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      const msg = 'Please enter a valid deposit amount';
      Toast.show({ type: 'error', text1: msg });
      cb?.({ success: false, message: msg });
      dispatch(setWalletLoading(false));
      return { success: false, error: msg };
    }

    const utr = (payload.utrNumber || payload.transactionId || payload.utr || '').trim();
    if (!utr) {
      const msg = '12-digit UTR or Reference Number is required';
      Toast.show({ type: 'error', text1: msg });
      cb?.({ success: false, message: msg });
      dispatch(setWalletLoading(false));
      return { success: false, error: msg };
    }

    const body = {
      amount: parsedAmount,
      utrNumber: utr,
      transactionId: utr,
      userBankName: payload.userBankName || payload.bankName || '',
      paymentProof: payload.paymentProof || payload.receiptImageUrl || '',
      companyBankId: payload.companyBankId || undefined,
      remarks: payload.remarks || '',
      paymentMode: payload.paymentMode || 'UPI',
    };

    let response;
    try {
      response = await postApi(fundRequestCreateEndpoint, body);
    } catch (err) {
      // Fallback endpoint if primary 404s
      try {
        response = await postApi('users/fund/request', body);
      } catch {
        throw err;
      }
    }

    if (response?.status === 200 || response?.status === 201) {
      console.log(`${fundRequestCreateEndpoint} API RESPONSE -->`, response?.data);

      const newRecord = {
        _id: response?.data?.data?._id || 'fr_' + Date.now(),
        amount: parsedAmount,
        utrNumber: utr,
        userBankName: body.userBankName || 'UPI',
        paymentProof: body.paymentProof,
        status: 'pending',
        remarks: body.remarks,
        createdAt: new Date().toISOString(),
      };

      dispatch(addFundRequest(newRecord));
      dispatch(setWalletLoading(false));

      Toast.show({
        type: 'success',
        text1: 'Fund Request Submitted!',
        text2: `Request of ₹${parsedAmount} (UTR: ${utr}) submitted for admin approval.`,
      });

      // Refresh list
      dispatch(fetchFundHistoryApi());

      cb?.({ success: true, data: response?.data, request: newRecord });
      return { success: true, data: response?.data, request: newRecord };
    }
  } catch (error) {
    dispatch(setWalletLoading(false));
    dispatch(setWalletError(error.message));
    handleError(error, cb, fundRequestCreateEndpoint);
    return { success: false, error: error.message };
  }
};

// 🔹 3. Fetch My Fund Request History (GET users/fund/my-requests)
export const fetchFundHistoryApi = (params = {}) => async (dispatch) => {
  const cb = params?.cb;

  try {
    cb?.({ loading: true });
    dispatch(setWalletLoading(true));
    dispatch(setWalletError(null));

    let response;
    try {
      response = await getApi(fundRequestHistoryEndpoint);
    } catch {
      try {
        response = await getApi('users/fund-request/history');
      } catch {
        response = null;
      }
    }

    if (response?.status === 200 || response?.status === 201) {
      console.log(`${fundRequestHistoryEndpoint} API RESPONSE -->`, response?.data);
      const rawList = response?.data?.data || response?.data?.history || response?.data;
      const list = Array.isArray(rawList) ? rawList : [];

      dispatch(setFundRequests(list));
      dispatch(setTransactions(list));
      dispatch(setWalletLoading(false));
      cb?.({ success: true, data: response?.data, list });
      return { success: true, data: response?.data, list };
    }
  } catch (error) {
    dispatch(setWalletLoading(false));
    console.log(`${fundRequestHistoryEndpoint} API Notice -->`, error?.message);
    dispatch(setFundRequests([]));
    dispatch(setTransactions([]));
    cb?.({ success: true, data: [], list: [] });
    return { success: true, data: [], list: [] };
  }
};

// 🔹 4. Request Withdrawal (POST users/withdraw)
export const withdrawFundsApi = (params = {}) => async (dispatch) => {
  const payload = params?.payload || params;
  const cb = params?.cb;

  try {
    cb?.({ loading: true });
    dispatch(setWalletLoading(true));
    dispatch(setWalletError(null));

    const parsedAmount = parseFloat(payload.amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      const msg = 'Please enter a valid withdrawal amount';
      Toast.show({ type: 'error', text1: msg });
      cb?.({ success: false, message: msg });
      dispatch(setWalletLoading(false));
      return { success: false, error: msg };
    }

    const body = {
      amount: parsedAmount,
      remarks: payload.remarks || '',
      paymentMode: payload.paymentMode || 'BANK_TRANSFER',
    };

    const response = await postApi(withdrawalEndpoint, body);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${withdrawalEndpoint} API RESPONSE -->`, response?.data);
      dispatch(setWalletLoading(false));
      Toast.show({
        type: 'success',
        text1: 'Withdrawal Request Submitted!',
        text2: `Request for ₹${parsedAmount} submitted successfully.`,
      });
      cb?.({ success: true, data: response?.data });
      return { success: true, data: response?.data };
    }
  } catch (error) {
    dispatch(setWalletLoading(false));
    dispatch(setWalletError(error.message));
    handleError(error, cb, withdrawalEndpoint);
    return { success: false, error: error.message };
  }
};

export const addFunds = addFundsApi;
export const submitDepositApi = addFundsApi;
export const fetchFundHistory = fetchFundHistoryApi;
export const fetchCompanyBank = fetchCompanyBankApi;
export const getTransactionsApi = fetchFundHistoryApi;
export const getUserTransactionsApi = fetchFundHistoryApi;
export const withdrawFunds = withdrawFundsApi;
