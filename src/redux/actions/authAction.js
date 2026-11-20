import Toast from '../../utils/toast';
import { getApi, postApi } from '../../services/api';
import { deleteSecureItem, setSecureItem, getSecureItem } from '../../services/storage/keychain';
import {
  loginEndpoint,
  registerEndpoint,
  getProfileEndpoint,
  logoutEndpoint,
  sendOtpEndpoint,
  verifyOtpEndpoint,
  submitKycEndpoint,
  getKycStatusEndpoint,
  uploadImageEndpoint,
} from '../apiEndpoint';
import {
  logout,
  setToken,
  setUser,
  setLoading,
  setError,
} from '../slices/authSlice';
import { setBalance } from '../slices/walletSlice';

// 🔹 Centralized error handler for all thunks
const handleError = (error, cb, endpoint) => {
  const errorMsg = error?.response?.data?.message || error?.message || 'An error occurred.';
  console.log(`${endpoint} API ERROR -->`, errorMsg);
  Toast.show({ type: 'error', text1: errorMsg });
  cb?.({ success: false, message: errorMsg });
};

// ------------------------------
// AUTHENTICATION THUNKS
// ------------------------------

export const loginApi = (params = {}) => async (dispatch) => {
  const payload = params.payload ? params.payload : params;
  const cb = params.cb;

  try {
    cb?.({ loading: true });
    dispatch(setLoading(true));
    dispatch(setError(null));

    const identifier = (
      payload.emailOrPhone ||
      payload.email ||
      payload.phone ||
      payload.mobile ||
      payload.username ||
      ''
    ).trim();

    const body = {
      username: identifier,
      mobile: identifier,
      identifier: identifier,
      emailOrPhone: identifier,
      password: payload.password,
    };

    const response = await postApi(loginEndpoint, body);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${loginEndpoint} API RESPONSE -->`, response?.data);
      const resData = response?.data;
      const token = resData?.token || resData?.jwt || resData?.data?.token;
      let user = resData?.user || resData?.data?.user || resData?.data || resData;
      if (user?.data && !user.name) {
        user = user.data;
      }

      if (token) {
        dispatch(setToken(token));
        await setSecureItem('USER_TOKEN', token);
      }
      if (user) {
        dispatch(setUser(user));
        await setSecureItem('USER_DATA', user);
        if (user.wallets) {
          const bal = user.wallets.purchaseWallet ?? user.wallets.incomeWallet ?? 0;
          dispatch(setBalance(bal));
        }
      }
      dispatch(setLoading(false));

      Toast.show({ type: 'success', text1: response?.data?.message || 'Login successful!' });
      cb?.({ success: true, data: response?.data });
      return { success: true, data: response?.data, token, user };
    }
  } catch (error) {
    dispatch(setLoading(false));
    const errorMsg = error?.response?.data?.message || error?.message || 'Login failed';
    dispatch(setError(errorMsg));
    handleError(error, cb, loginEndpoint);
    return { success: false, error: errorMsg };
  }
};

export const registerApi = (params = {}) => async (dispatch) => {
  const payload = params.payload ? params.payload : params;
  const cb = params.cb;

  try {
    cb?.({ loading: true });
    dispatch(setLoading(true));
    dispatch(setError(null));

    const userPhone = (payload.phone || payload.mobileNumber || payload.mobile || '').trim();
    const legValue = (payload.leg || payload.binaryLeg || 'left').toLowerCase();
    const refCode = (payload.referralCode || payload.sponsorCode || '').trim();

    const body = {
      name: payload.name ? payload.name.trim() : undefined,
      mobile: userPhone,
      phone: userPhone,
      email: payload.email ? payload.email.trim() : undefined,
      password: payload.password,
      referralCode: refCode,
      sponsorCode: refCode,
      leg: legValue,
      binaryLeg: legValue,
    };

    const response = await postApi(registerEndpoint, body);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${registerEndpoint} API RESPONSE -->`, response?.data);
      const resData = response?.data;
      const token = resData?.token || resData?.jwt || resData?.data?.token;
      let user = resData?.user || resData?.data?.user || resData?.data || resData;
      if (user?.data && !user.name) {
        user = user.data;
      }

      if (token) {
        dispatch(setToken(token));
        await setSecureItem('USER_TOKEN', token);
      }
      if (user) {
        dispatch(setUser(user));
        await setSecureItem('USER_DATA', user);
        if (user.wallets) {
          const bal = user.wallets.purchaseWallet ?? user.wallets.incomeWallet ?? 0;
          dispatch(setBalance(bal));
        }
      }
      dispatch(setLoading(false));

      Toast.show({ type: 'success', text1: response?.data?.message || 'Registration successful!' });
      cb?.({ success: true, data: response?.data });
      return { success: true, data: response?.data, token, user };
    }
  } catch (error) {
    dispatch(setLoading(false));
    const errorMsg = error?.response?.data?.message || error?.message || 'Registration failed';
    dispatch(setError(errorMsg));
    handleError(error, cb, registerEndpoint);
    return { success: false, error: errorMsg };
  }
};

export const logoutApi = () => async (dispatch) => {
  try {
    await postApi(logoutEndpoint).catch(() => {});
  } catch {
    // Ignore network error on logout
  }
  await deleteSecureItem('USER_TOKEN');
  await deleteSecureItem('USER_DATA');
  dispatch(logout());
};

// ------------------------------
// OTP THUNKS
// ------------------------------

export const sendOtpApi = ({ payload, cb } = {}) => async (dispatch) => {
  try {
    cb?.({ loading: true });
    const response = await postApi(sendOtpEndpoint, payload);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${sendOtpEndpoint} API RESPONSE -->`, response?.data);
      Toast.show({ type: 'success', text1: response?.data?.message || 'OTP Sent!' });
      cb?.({ success: true, data: response?.data });
    }
  } catch (error) {
    handleError(error, cb, sendOtpEndpoint);
  }
};

export const verifyOtpApi = ({ payload, cb } = {}) => async (dispatch, getState) => {
  try {
    cb?.({ loading: true });
    const response = await postApi(verifyOtpEndpoint, payload);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${verifyOtpEndpoint} API RESPONSE -->`, response?.data);
      const { user } = getState().auth;
      if (user) {
        dispatch(setUser({ ...user, isVerified: true }));
      }
      Toast.show({ type: 'success', text1: response?.data?.message || 'OTP Verified!' });
      cb?.({ success: true, data: response?.data });
    }
  } catch (error) {
    handleError(error, cb, verifyOtpEndpoint);
  }
};

// ------------------------------
// PROFILE & KYC THUNKS
// ------------------------------

export const getProfileApi = (params = {}) => async (dispatch) => {
  const cb = params?.cb;

  try {
    cb?.({ loading: true });
    dispatch(setLoading(true));
    const response = await getApi(getProfileEndpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${getProfileEndpoint} API RESPONSE -->`, response?.data);
      const resData = response?.data;
      let user = resData?.user || resData?.data?.user || resData?.data || resData;
      if (user?.data && !user.name) {
        user = user.data;
      }
      if (user) {
        dispatch(setUser(user));
        await setSecureItem('USER_DATA', user);
        if (user.wallets) {
          const bal = user.wallets.purchaseWallet ?? user.wallets.incomeWallet ?? 0;
          dispatch(setBalance(bal));
        }
      }
      dispatch(setLoading(false));
      cb?.({ success: true, data: response?.data });
      return { success: true, data: response?.data, user };
    }
  } catch (error) {
    dispatch(setLoading(false));
    handleError(error, cb, getProfileEndpoint);
    return { success: false, error: error?.message };
  }
};

export const submitKycApi = ({ payload, isFormData = false, cb } = {}) => async (dispatch, getState) => {
  try {
    cb?.({ loading: true });
    const headers = isFormData ? { 'Content-Type': 'multipart/form-data' } : {};
    const response = await postApi(submitKycEndpoint, payload, { headers });
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${submitKycEndpoint} API RESPONSE -->`, response?.data);
      const { user } = getState().auth;
      if (user) {
        dispatch(setUser({ ...user, kyc: response?.data?.kyc }));
      }
      Toast.show({ type: 'success', text1: response?.data?.message || 'KYC Submitted!' });
      cb?.({ success: true, data: response?.data });
    }
  } catch (error) {
    handleError(error, cb, submitKycEndpoint);
  }
};

export const getKycStatusApi = ({ cb } = {}) => async (dispatch, getState) => {
  try {
    cb?.({ loading: true });
    const response = await getApi(getKycStatusEndpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${getKycStatusEndpoint} API RESPONSE -->`, response?.data);
      const { user } = getState().auth;
      if (user && response?.data) {
        dispatch(
          setUser({
            ...user,
            isVerified: response.data.isVerified,
            kyc: response.data.kyc,
          })
        );
      }
      cb?.({ success: true, data: response?.data });
    }
  } catch (error) {
    handleError(error, cb, getKycStatusEndpoint);
  }
};

export const uploadImageApi = ({ file, folder = 'sarthi', cb } = {}) => async () => {
  try {
    cb?.({ loading: true });
    const formData = new FormData();
    formData.append('image', file);
    if (folder) formData.append('folder', folder);

    const response = await postApi(uploadImageEndpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (response?.status === 200 || response?.status === 201) {
      cb?.({ success: true, data: response?.data });
    }
  } catch (error) {
    handleError(error, cb, uploadImageEndpoint);
  }
};

// ------------------------------
// AUTH BOOTSTRAP / PERSISTENCE
// ------------------------------
export const bootstrapAuth = () => async (dispatch) => {
  try {
    const token = await getSecureItem('USER_TOKEN');
    const storedUserRaw = await getSecureItem('USER_DATA');

    if (token) {
      dispatch(setToken(token));

      if (storedUserRaw) {
        try {
          const parsedUser =
            typeof storedUserRaw === 'string'
              ? JSON.parse(storedUserRaw)
              : storedUserRaw;
          if (parsedUser) {
            dispatch(setUser(parsedUser));
            if (parsedUser.wallets) {
              const bal =
                parsedUser.wallets.purchaseWallet ??
                parsedUser.wallets.incomeWallet ??
                0;
              dispatch(setBalance(bal));
            }
          }
        } catch (e) {
          console.log('Error parsing stored user data', e);
        }
      }

      // Sync fresh profile in background without blocking navigation
      dispatch(getProfileApi()).catch(() => {});
      return { isAuthenticated: true, token };
    }
    return { isAuthenticated: false };
  } catch (error) {
    console.log('Error during auth bootstrap', error);
    return { isAuthenticated: false };
  }
};

// ------------------------------
// ALIASES FOR COMPONENT COMPATIBILITY
// ------------------------------
export const loginUser = loginApi;
export const registerUser = registerApi;
export const fetchUserProfile = getProfileApi;
export const getUserProfile = getProfileApi;
export const userLogin = loginApi;
export const userRegister = registerApi;
export const logoutUser = logoutApi;
export const initAuth = bootstrapAuth;
