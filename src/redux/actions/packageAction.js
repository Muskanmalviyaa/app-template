import Toast from '../../utils/toast';
import { getApi, postApi } from '../../services/api';
import {
  getPackagesWithParamsEndpoint,
  purchasePackageEndpoint,
  getMyPurchasesEndpoint,
} from '../apiEndpoint';
import {
  setCatalog,
  setMyPurchases,
  setEarningTarget,
  addActivePackage,
  setPackageLoading,
  setPackageError,
} from '../slices/packageSlice';
import { deductBalance } from '../slices/walletSlice';
import { addCoupons, syncCouponsFromPurchases } from '../slices/couponSlice';
import { getProfileApi } from './authAction';

const handleError = (error, cb, endpoint) => {
  const errorMsg = error?.response?.data?.message || error?.message || 'An error occurred.';
  console.log(`${endpoint} API ERROR -->`, errorMsg);
  Toast.show({ type: 'error', text1: errorMsg });
  cb?.({ success: false, message: errorMsg });
};

export const fetchPackagesApi = (params = {}) => async (dispatch) => {
  const cb = params?.cb;
  const status = params?.status !== undefined ? params.status : 'active';
  const search = params?.search !== undefined ? params.search : '';

  try {
    cb?.({ loading: true });
    dispatch(setPackageLoading(true));
    dispatch(setPackageError(null));

    const endpoint = getPackagesWithParamsEndpoint({ status, search });

    const response = await getApi(endpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${endpoint} API RESPONSE -->`, response?.data);
      const rawList = response?.data?.data || response?.data?.packages || response?.data;
      const list = Array.isArray(rawList)
        ? rawList.map((pkg) => ({
            ...pkg,
            id: pkg._id || pkg.id,
            name: pkg.title || pkg.name || 'Sarthi Package',
            title: pkg.title || pkg.name || 'Sarthi Package',
            description: pkg.description || 'Purchase package',
            image: pkg.image || '',
            price: pkg.price || pkg.amount || 0,
            services: Array.isArray(pkg.services) ? pkg.services : [],
            couponsYield: pkg.couponsYield || 10,
            features: Array.isArray(pkg.features) && pkg.features.length > 0
              ? pkg.features
              : ['Full Ecosystem Member Privileges'],
          }))
        : [];

      dispatch(setCatalog(list));
      dispatch(setPackageLoading(false));
      cb?.({ success: true, data: response?.data, list });
      return { success: true, data: response?.data, list };
    }
  } catch (error) {
    dispatch(setPackageLoading(false));
    dispatch(setPackageError(error.message));
    handleError(error, cb, 'users/packages');
    return { success: false, error: error.message };
  }
};

export const buyPackageApi = (params = {}) => async (dispatch, getState) => {
  const pkg = params?.payload || params;
  const cb = params?.cb;

  const currentBalance = getState().wallet.balance;
  const pkgPrice = Number(pkg.price || 0);
  const pkgId = pkg._id || pkg.id;
  const pkgName = pkg.title || pkg.name || 'Sarthi Package';

  if (currentBalance < pkgPrice) {
    const errorMsg = `Insufficient wallet balance (₹${currentBalance}). Package costs ₹${pkgPrice}. Please add funds to proceed.`;
    Toast.show({ type: 'error', text1: errorMsg });
    cb?.({ success: false, message: errorMsg });
    return { success: false, error: errorMsg };
  }

  const transactionId = 'pay_' + Date.now();

  try {
    cb?.({ loading: true });
    dispatch(setPackageLoading(true));

    const response = await postApi(purchasePackageEndpoint, {
      packageId: pkgId,
      paymentMethod: 'WALLET',
      transactionId,
    });

    if (response?.status === 200 || response?.status === 201) {
      console.log(`${purchasePackageEndpoint} API RESPONSE -->`, response?.data);

      dispatch(
        deductBalance({
          amount: pkgPrice,
          description: `Purchased ${pkgName}`,
        })
      );

      dispatch(
        addCoupons({
          amount: pkg.couponsYield || 10,
          source: pkgName,
        })
      );

      const activePkg = {
        id: response?.data?.id || response?.data?._id || 'active_pkg_' + Date.now(),
        packageId: pkgId,
        name: pkgName,
        title: pkgName,
        price: pkgPrice,
        couponsGranted: pkg.couponsYield || 10,
        transactionId,
        purchasedAt:
          new Date().toLocaleDateString() +
          ' ' +
          new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const newPurch = {
        _id: response?.data?._id || response?.data?.id || 'purch_' + Date.now(),
        packageId: {
          _id: pkgId,
          title: pkgName,
          price: pkgPrice,
          services: pkg.services || [],
        },
        amount: pkgPrice,
        paymentMethod: 'wallet',
        status: 'completed',
        transactionId,
        createdAt: new Date().toISOString(),
      };

      const updatedPurchases = [newPurch, ...(getState()?.packages?.myPurchases || [])];
      dispatch(setMyPurchases(updatedPurchases));
      dispatch(
        syncCouponsFromPurchases({
          purchases: updatedPurchases,
          user: getState()?.auth?.user,
        })
      );

      dispatch(addActivePackage(activePkg));
      dispatch(setPackageLoading(false));

      // Refresh profile to sync wallet balance & package ownership from server
      dispatch(getProfileApi()).catch(() => {});

      Toast.show({
        type: 'success',
        text1: `Bought ${pkgName}!`,
        text2: `Received ${pkg.couponsYield || 10} coupons!`,
      });
      cb?.({ success: true, data: response?.data, activePackage: activePkg });
      return { success: true, data: response?.data, activePackage: activePkg };
    }
  } catch (error) {
    dispatch(setPackageLoading(false));
    dispatch(setPackageError(error.message));
    handleError(error, cb, purchasePackageEndpoint);
    return { success: false, error: error.message };
  }
};

export const fetchMyPurchasesApi = (params = {}) => async (dispatch, getState) => {
  const cb = params?.cb;
  try {
    cb?.({ loading: true });
    dispatch(setPackageLoading(true));

    let response;
    try {
      response = await getApi(getMyPurchasesEndpoint);
    } catch {
      // Fallback endpoint if needed
      try {
        response = await getApi('users/packages/my-purchases');
      } catch {
        response = null;
      }
    }

    if (response?.status === 200 || response?.status === 201) {
      console.log(`${getMyPurchasesEndpoint} API RESPONSE -->`, response?.data);
      const rawPurchases = response?.data?.data || response?.data?.purchases || [];
      const purchases = Array.isArray(rawPurchases) ? rawPurchases : [];

      dispatch(setMyPurchases(purchases));
      dispatch(syncCouponsFromPurchases({ purchases, user: getState()?.auth?.user }));

      // Calculate 2X Target dynamically from REAL purchase and REAL income data
      const user = getState()?.auth?.user;
      const earned =
        user?.wallets?.incomeWallet ||
        ((user?.wallets?.referralWallet || 0) +
          (user?.wallets?.levelWallet || 0) +
          (user?.wallets?.passiveWallet || 0) +
          (user?.wallets?.ctoWallet || 0)) ||
        getState()?.income?.totalEarnings ||
        0;

      if (purchases.length > 0) {
        const activePurchase =
          purchases.find((p) => p.status === 'completed' || p.status === 'active') || purchases[0];
        const packageAmount = activePurchase?.amount || activePurchase?.packageId?.price || 0;
        const goal = packageAmount * 2;
        const remaining = Math.max(0, goal - earned);
        const percent = goal > 0 ? Math.min(100, Math.round((earned / goal) * 100)) : 0;

        const targetData = {
          goal,
          earned,
          remaining,
          percent,
          activeCycle: goal > 0,
          packageTitle: activePurchase?.packageId?.title || activePurchase?.title || 'Active Package',
        };

        dispatch(syncCouponsFromPurchases({ purchases: [], user }));
        dispatch(setEarningTarget(targetData));
        dispatch(setPackageLoading(false));
        cb?.({ success: true, data: response?.data, purchases, targetData });
        return { success: true, data: response?.data, purchases, targetData };
      } else {
        const targetData = {
          goal: 0,
          earned,
          remaining: 0,
          percent: 0,
          activeCycle: false,
          packageTitle: 'No Active Package',
        };
        dispatch(syncCouponsFromPurchases({ purchases: [], user }));
        dispatch(setEarningTarget(targetData));
        dispatch(setPackageLoading(false));
        cb?.({ success: true, purchases: [], targetData });
        return { success: true, purchases: [], targetData };
      }
    } else {
      const user = getState()?.auth?.user;
      const earned =
        user?.wallets?.incomeWallet ||
        ((user?.wallets?.referralWallet || 0) +
          (user?.wallets?.levelWallet || 0) +
          (user?.wallets?.passiveWallet || 0) +
          (user?.wallets?.ctoWallet || 0)) ||
        0;
      const targetData = {
        goal: 0,
        earned,
        remaining: 0,
        percent: 0,
        activeCycle: false,
        packageTitle: 'No Active Package',
      };
      dispatch(setEarningTarget(targetData));
      dispatch(setPackageLoading(false));
      cb?.({ success: true, targetData });
      return { success: true, targetData };
    }
  } catch (error) {
    dispatch(setPackageLoading(false));
    console.log(`${getMyPurchasesEndpoint} API ERROR -->`, error?.message);
    const user = getState()?.auth?.user;
    const earned = user?.wallets?.incomeWallet || 0;
    const targetData = {
      goal: 0,
      earned,
      remaining: 0,
      percent: 0,
      activeCycle: false,
      packageTitle: 'No Active Package',
    };
    dispatch(setEarningTarget(targetData));
    cb?.({ success: false, error: error.message });
    return { success: false, error: error.message };
  }
};

export const fetchPackages = fetchPackagesApi;
export const buyPackage = buyPackageApi;
export const fetchMyPurchases = fetchMyPurchasesApi;
