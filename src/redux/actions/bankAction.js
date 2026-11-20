import Toast from '../../utils/toast';
import { getApi, postApi } from '../../services/api';
import { addBankEndpoint, getBankDetailsEndpoint } from '../apiEndpoint';
import {
  setBankDetails,
  setBankLoading,
  setBankError,
} from '../slices/bankSlice';

const handleError = (error, cb, endpoint) => {
  const errorMsg = error?.response?.data?.message || error?.message || 'An error occurred.';
  console.log(`${endpoint} API ERROR -->`, errorMsg);
  Toast.show({ type: 'error', text1: errorMsg });
  cb?.({ success: false, message: errorMsg });
};

export const fetchBankDetailsApi = (params = {}) => async (dispatch) => {
  const cb = params?.cb;

  try {
    cb?.({ loading: true });
    dispatch(setBankLoading(true));
    dispatch(setBankError(null));

    const response = await getApi(getBankDetailsEndpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${getBankDetailsEndpoint} API RESPONSE -->`, response?.data);
      const details = response?.data?.data || response?.data?.bankDetails || response?.data;
      if (details) {
        dispatch(setBankDetails(details));
      }
      dispatch(setBankLoading(false));
      cb?.({ success: true, data: response?.data, bankDetails: details });
      return { success: true, data: response?.data, bankDetails: details };
    }
  } catch (error) {
    dispatch(setBankLoading(false));
    dispatch(setBankError(error.message));
    handleError(error, cb, getBankDetailsEndpoint);
    return { success: false, error: error.message };
  }
};

export const saveBankDetailsApi = (params = {}) => async (dispatch) => {
  const payload = params?.payload || params;
  const cb = params?.cb;

  try {
    if (!payload.accountHolderName || !payload.accountNumber || !payload.ifscCode || !payload.bankName) {
      const msg = 'Please fill all bank account fields';
      Toast.show({ type: 'error', text1: msg });
      cb?.({ success: false, message: msg });
      return { success: false, error: msg };
    }

    cb?.({ loading: true });
    dispatch(setBankLoading(true));
    dispatch(setBankError(null));

    const body = {
      accountHolderName: payload.accountHolderName.trim(),
      accountNumber: payload.accountNumber.trim(),
      ifscCode: payload.ifscCode.trim().toUpperCase(),
      bankName: payload.bankName.trim(),
    };

    const response = await postApi(addBankEndpoint, body);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${addBankEndpoint} API RESPONSE -->`, response?.data);
      const details =
        response?.data?.bankDetails ||
        response?.data?.data || {
          ...body,
          updatedAt: new Date().toLocaleDateString(),
          isVerified: true,
        };

      dispatch(setBankDetails(details));
      dispatch(setBankLoading(false));

      Toast.show({ type: 'success', text1: 'Bank account saved successfully!' });
      cb?.({ success: true, data: response?.data, bankDetails: details });
      return { success: true, data: response?.data, bankDetails: details };
    }
  } catch (error) {
    dispatch(setBankLoading(false));
    dispatch(setBankError(error.message));
    handleError(error, cb, addBankEndpoint);
    return { success: false, error: error.message };
  }
};

export const fetchBankDetails = fetchBankDetailsApi;
export const saveBankDetails = saveBankDetailsApi;
