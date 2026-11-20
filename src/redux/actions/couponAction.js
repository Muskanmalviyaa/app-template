import Toast from '../../utils/toast';
import { getApi } from '../../services/api';
import { getServicesEndpoint } from '../apiEndpoint';
import {
  setServices,
  useCoupon,
  redeemCouponPass,
  setCouponLoading,
  setCouponError,
} from '../slices/couponSlice';

const handleError = (error, cb, endpoint) => {
  const errorMsg = error?.response?.data?.message || error?.message || 'An error occurred.';
  console.log(`${endpoint} API ERROR -->`, errorMsg);
  Toast.show({ type: 'error', text1: errorMsg });
  cb?.({ success: false, message: errorMsg });
};

export const fetchServicesListApi = (params = {}) => async (dispatch) => {
  const cb = params?.cb;

  try {
    cb?.({ loading: true });
    dispatch(setCouponLoading(true));
    dispatch(setCouponError(null));

    const response = await getApi(getServicesEndpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${getServicesEndpoint} API RESPONSE -->`, response?.data);
      const rawList = response?.data?.data || response?.data?.services || response?.data;
      const list = Array.isArray(rawList)
        ? rawList.map((srv) => ({
            ...srv,
            id: srv._id || srv.id,
            name: srv.title || srv.name || 'Digital Service',
            title: srv.title || srv.name || 'Digital Service',
            description: srv.description || 'On-demand verified service',
            image: srv.image || '',
            price: srv.price !== undefined ? srv.price : 499,
            icon: srv.icon || 'grid-outline',
            category: srv.category || (srv.title ? 'Official Service' : 'Consulting & Legal'),
            duration: srv.duration || 'Instant CA Access',
            isActive: srv.isActive !== undefined ? srv.isActive : true,
          }))
        : [];

      dispatch(setServices(list));
      dispatch(setCouponLoading(false));
      cb?.({ success: true, data: response?.data, list });
      return { success: true, data: response?.data, list };
    }
  } catch (error) {
    dispatch(setCouponLoading(false));
    dispatch(setCouponError(error.message));
    handleError(error, cb, getServicesEndpoint);
    return { success: false, error: error.message };
  }
};

export const redeemCouponPassApi = (params = {}) => async (dispatch, getState) => {
  const payload = params?.payload || params;
  const cb = params?.cb;

  const currentBalance = getState().coupons.couponBalance;
  if (currentBalance <= 0) {
    const errorMsg = 'No coupons remaining! Please buy a package to unlock services.';
    Toast.show({ type: 'error', text1: errorMsg });
    cb?.({ success: false, message: errorMsg });
    return { success: false, error: errorMsg };
  }

  dispatch(redeemCouponPass(payload));
  Toast.show({
    type: 'success',
    text1: 'Voucher Redeemed!',
    text2: `Redeemed for "${payload.serviceName}". Receipt generated!`,
  });

  cb?.({ success: true, data: payload });
  return { success: true, data: payload };
};

export const consumeServiceCouponApi = (params = {}) => async (dispatch, getState) => {
  const payload = params?.payload || params;
  const cb = params?.cb;

  const currentBalance = getState().coupons.couponBalance;
  if (currentBalance <= 0) {
    const errorMsg = 'No coupons remaining! Please buy a package to unlock services.';
    Toast.show({ type: 'error', text1: errorMsg });
    cb?.({ success: false, message: errorMsg });
    return { success: false, error: errorMsg };
  }

  const timestamp =
    new Date().toLocaleDateString() +
    ' ' +
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const record = {
    serviceId: payload.serviceId,
    serviceName: payload.serviceName,
    timestamp,
  };

  dispatch(useCoupon(record));
  Toast.show({
    type: 'success',
    text1: 'Coupon Redeemed!',
    text2: `1 coupon used for "${payload.serviceName}"`,
  });

  cb?.({ success: true, data: record });
  return { success: true, data: record };
};

export const fetchServicesList = fetchServicesListApi;
export const getServicesApi = fetchServicesListApi;
export const consumeServiceCoupon = consumeServiceCouponApi;
export const redeemCouponPassAction = redeemCouponPassApi;

