import Toast from '../../utils/toast';
import { getApi, postApi } from '../../services/api';
import {
  binaryTreeEndpoint,
  getBinaryTreeEndpoint,
  getProfileEndpoint,
  referralIncomeEndpoint,
  levelIncomeEndpoint,
  passiveIncomeEndpoint,
  passiveCategoriesEndpoint,
  passiveSubmitLeadEndpoint,
  passiveMyRequestsEndpoint,
  ctoIncomeEndpoint,
  getReferralIncomeHistoryEndpoint,
  referralIncomeHistoryEndpoint,
  manualTransactionsEndpoint,
} from '../apiEndpoint';
import {
  setIncomeData,
  setIncomeLoading,
  setIncomeError,
} from '../slices/incomeSlice';

const handleError = (error, cb, endpoint) => {
  const errorMsg = error?.response?.data?.message || error?.message || 'An error occurred.';
  console.log(`${endpoint} API ERROR -->`, errorMsg);
  // Do not alert 404 for optional/unimplemented income streams
  if (error?.response?.status !== 404) {
    Toast.show({ type: 'error', text1: errorMsg });
  }
  cb?.({ success: false, message: errorMsg });
};

// 1. Referral Income
export const getReferralIncomeApi = (params = {}) => async (dispatch, getState) => {
  const cb = params?.cb;
  try {
    cb?.({ loading: true });
    // Try profile wallets first if available
    const userWallets = getState()?.auth?.user?.wallets;
    if (userWallets) {
      const data = { referralIncome: userWallets.referralWallet || 0 };
      cb?.({ success: true, data });
      return { success: true, data };
    }
    const response = await getApi(referralIncomeEndpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${referralIncomeEndpoint} API RESPONSE -->`, response?.data);
      cb?.({ success: true, data: response?.data });
      return { success: true, data: response?.data };
    }
  } catch (error) {
    handleError(error, cb, referralIncomeEndpoint);
    return { success: false, error: error.message };
  }
};

// 2. Binary Tree API (GET users/binary-tree?depth=3)
export const fetchBinaryTreeApi = (params = {}) => async () => {
  const depth = params?.depth !== undefined ? params.depth : 3;
  const userId = params?.userId || null;
  const cb = params?.cb;

  try {
    cb?.({ loading: true });
    const endpoint = typeof getBinaryTreeEndpoint === 'function'
      ? getBinaryTreeEndpoint(depth, userId)
      : `users/binary-tree?depth=${depth}${userId ? `&userId=${userId}` : ''}`;

    const response = await getApi(endpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${endpoint} API RESPONSE -->`, response?.data);
      const tree = response?.data?.data !== undefined ? response?.data?.data : response?.data;
      cb?.({ success: true, data: tree });
      return { success: true, data: tree };
    }
    return { success: false, data: null };
  } catch (error) {
    handleError(error, cb, 'users/binary-tree');
    return { success: false, error: error.message };
  }
};

// 2b. Level / Binary Income (GET users/binary-tree)
export const getLevelIncomeApi = (params = {}) => async () => {
  const cb = params?.cb;
  try {
    cb?.({ loading: true });
    const response = await getApi(levelIncomeEndpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${levelIncomeEndpoint} API RESPONSE -->`, response?.data);
      cb?.({ success: true, data: response?.data });
      return { success: true, data: response?.data };
    }
  } catch (error) {
    handleError(error, cb, levelIncomeEndpoint);
    return { success: false, error: error.message };
  }
};

// 3. Passive Income
export const getPassiveIncomeApi = (params = {}) => async (dispatch, getState) => {
  const cb = params?.cb;
  try {
    cb?.({ loading: true });
    const userWallets = getState()?.auth?.user?.wallets;
    if (userWallets) {
      const data = { passiveIncome: userWallets.passiveWallet || 0 };
      cb?.({ success: true, data });
      return { success: true, data };
    }
    const response = await getApi(passiveIncomeEndpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${passiveIncomeEndpoint} API RESPONSE -->`, response?.data);
      cb?.({ success: true, data: response?.data });
      return { success: true, data: response?.data };
    }
  } catch (error) {
    handleError(error, cb, passiveIncomeEndpoint);
    return { success: false, error: error.message };
  }
};

// 4. CTO Income
export const getCtoIncomeApi = (params = {}) => async (dispatch, getState) => {
  const cb = params?.cb;
  try {
    cb?.({ loading: true });
    const userWallets = getState()?.auth?.user?.wallets;
    if (userWallets) {
      const data = { ctoIncome: userWallets.ctoWallet || 0 };
      cb?.({ success: true, data });
      return { success: true, data };
    }
    const response = await getApi(ctoIncomeEndpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${ctoIncomeEndpoint} API RESPONSE -->`, response?.data);
      cb?.({ success: true, data: response?.data });
      return { success: true, data: response?.data };
    }
  } catch (error) {
    handleError(error, cb, ctoIncomeEndpoint);
    return { success: false, error: error.message };
  }
};

// 5. Combined Income Reports (Live Backend: users/profile + users/binary-tree)
export const fetchIncomeReportsApi = (params = {}) => async (dispatch, getState) => {
  const cb = params?.cb;

  try {
    cb?.({ loading: true });
    dispatch(setIncomeLoading(true));
    dispatch(setIncomeError(null));

    // Live backend serves wallet balances in users/profile and network structure in users/binary-tree
    const [profileRes, treeRes] = await Promise.allSettled([
      getApi(getProfileEndpoint),
      getApi(binaryTreeEndpoint),
    ]);

    const profileData = profileRes.status === 'fulfilled' ? profileRes.value?.data : null;
    const treeData = treeRes.status === 'fulfilled' ? treeRes.value?.data : null;

    const user = profileData?.data || profileData?.user || profileData || getState()?.auth?.user;
    const wallets = user?.wallets || {};

    const binaryIncome = wallets?.levelWallet || 0;
    const passiveIncome = wallets?.passiveWallet || 0;
    const referralIncome = wallets?.referralWallet || 0;
    const ctoIncome = wallets?.ctoWallet || 0;
    const totalEarnings = wallets?.incomeWallet || (binaryIncome + passiveIncome + referralIncome + ctoIncome);

    const treeNode = treeData?.data || treeData;
    const levelData = {
      userNode: treeNode ? {
        id: treeNode._id || 'USR_ROOT',
        name: treeNode.name || user?.name || 'Sarthi User',
        rank: treeNode.username || user?.username || 'Active Member',
        status: 'Active',
        leftBV: treeNode.leftCount || 0,
        rightBV: treeNode.rightCount || 0,
        matchedBV: Math.min(treeNode.leftCount || 0, treeNode.rightCount || 0),
      } : null,
      leftTeam: treeNode?.leftUser ? [treeNode.leftUser] : [],
      rightTeam: treeNode?.rightUser ? [treeNode.rightUser] : [],
    };

    const reportData = {
      totalEarnings,
      binaryIncome,
      passiveIncome,
      referralIncome,
      ctoIncome,
      levelData,
      referralData: { amount: referralIncome },
      passiveData: { amount: passiveIncome },
      ctoData: { amount: ctoIncome },
    };

    console.log('[incomeReports Loaded Successfully]:', {
      totalEarnings,
      binaryIncome,
      passiveIncome,
      referralIncome,
      ctoIncome,
    });

    dispatch(setIncomeData(reportData));
    dispatch(setIncomeLoading(false));

    cb?.({ success: true, data: reportData });
    return { success: true, data: reportData };
  } catch (error) {
    dispatch(setIncomeLoading(false));
    dispatch(setIncomeError(error.message));
    handleError(error, cb, 'incomeReports');
    return { success: false, error: error.message };
  }
};

export const getUserReferralIncomeHistoryApi = ({ level = null, cb } = {}) => async () => {
  try {
    cb?.({ loading: true });
    const endpoint = typeof getReferralIncomeHistoryEndpoint === 'function'
      ? getReferralIncomeHistoryEndpoint(level)
      : level ? `${referralIncomeHistoryEndpoint}?level=${level}` : referralIncomeHistoryEndpoint;

    const response = await getApi(endpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${endpoint} API RESPONSE -->`, response?.data);
      const data = response?.data?.data || response?.data;
      cb?.({ success: true, data });
      return { success: true, data };
    }
    return { success: false, data: null };
  } catch (error) {
    handleError(error, cb, referralIncomeHistoryEndpoint);
    return { success: false, error: error.message };
  }
};

// 🔹 4b. Fetch Manual Wallet Adjustments (GET users/wallet/manual-transactions)
export const fetchManualTransactionsApi = (params = {}) => async () => {
  const cb = params?.cb;
  try {
    cb?.({ loading: true });
    const response = await getApi(manualTransactionsEndpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${manualTransactionsEndpoint} API RESPONSE -->`, response?.data);
      const data = response?.data;
      cb?.({ success: true, data });
      return { success: true, data };
    }
    return { success: false, data: null };
  } catch (error) {
    handleError(error, cb, manualTransactionsEndpoint);
    return { success: false, error: error.message };
  }
};

// 🔹 5. Fetch Passive Income Categories (GET users/passive-income/categories)
export const fetchPassiveCategoriesApi = (params = {}) => async () => {
  const cb = params?.cb;
  try {
    cb?.({ loading: true });
    const response = await getApi(passiveCategoriesEndpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${passiveCategoriesEndpoint} API RESPONSE -->`, response?.data);
      const list = Array.isArray(response?.data?.data)
        ? response.data.data
        : Array.isArray(response?.data)
        ? response.data
        : [];
      cb?.({ success: true, data: list });
      return { success: true, data: list };
    }
  } catch (error) {
    console.log(`${passiveCategoriesEndpoint} API Notice -->`, error?.message);
    cb?.({ success: false, error: error.message });
    return { success: false, error: error.message };
  }
};

// 🔹 6. Fetch My Passive Requests & Summary (GET users/passive-income/my-requests)
export const fetchPassiveRequestsApi = (params = {}) => async () => {
  const cb = params?.cb;
  try {
    cb?.({ loading: true });
    const response = await getApi(passiveMyRequestsEndpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${passiveMyRequestsEndpoint} API RESPONSE -->`, response?.data);
      const payload = response?.data?.data || response?.data || {};
      cb?.({ success: true, data: payload });
      return { success: true, data: payload };
    }
  } catch (error) {
    console.log(`${passiveMyRequestsEndpoint} API Notice -->`, error?.message);
    cb?.({ success: false, error: error.message });
    return { success: false, error: error.message };
  }
};

// 🔹 7. Submit Passive Income Lead Request (POST users/passive-income/request)
export const submitPassiveLeadApi = (params = {}) => async () => {
  const payload = params?.payload || params;
  const cb = params?.cb;
  try {
    cb?.({ loading: true });
    const response = await postApi(passiveSubmitLeadEndpoint, payload);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${passiveSubmitLeadEndpoint} API RESPONSE -->`, response?.data);
      Toast.show({
        type: 'success',
        text1: 'Lead Submitted Successfully!',
        text2: `Client lead for ${payload.clientName || 'deal'} registered.`,
      });
      cb?.({ success: true, data: response?.data });
      return { success: true, data: response?.data };
    }
  } catch (error) {
    handleError(error, cb, passiveSubmitLeadEndpoint);
    return { success: false, error: error.message };
  }
};

export const fetchIncomeReports = fetchIncomeReportsApi;
export const fetchBinaryTree = fetchBinaryTreeApi;
export const getReferralIncomeHistoryApi = getUserReferralIncomeHistoryApi;
export const fetchReferralIncomeHistory = getUserReferralIncomeHistoryApi;
export const fetchManualTransactions = fetchManualTransactionsApi;
export const fetchPassiveCategories = fetchPassiveCategoriesApi;
export const fetchPassiveRequests = fetchPassiveRequestsApi;
export const submitPassiveLead = submitPassiveLeadApi;

