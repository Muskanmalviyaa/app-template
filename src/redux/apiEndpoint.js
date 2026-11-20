/*
    API Endpoints Configuration for Sarthi App
    Base URL in .env already includes /api/
    All endpoints here start from resource level (e.g. 'users/login')
*/

// 🔹 1. Authentication & Profile Endpoints
export const loginEndpoint = 'users/login';
export const registerEndpoint = 'users/register';
export const getProfileEndpoint = 'users/profile';
export const logoutEndpoint = 'users/logout';
export const sendOtpEndpoint = 'users/send-otp';
export const verifyOtpEndpoint = 'users/verify-otp';
export const submitKycEndpoint = 'users/kyc/submit';
export const getKycStatusEndpoint = 'users/kyc/status';
export const uploadImageEndpoint = 'users/upload/image';

// 🔹 2. Home, Catalog & CMS Endpoints
export const getCategoriesEndpoint = 'users/categories';
export const getSubcategoriesEndpoint = (categoryId) =>
  categoryId ? `users/subcategories/${categoryId}` : 'users/subcategories';
export const getProductsEndpoint = 'users/products';
export const getServicesEndpoint = 'users/services';
export const getCmsContentEndpoint = 'users/banners';
export const getCmsPublicEndpoint = 'users/banners';

// 🔹 3. Cart & Checkout Endpoints
export const addToCartEndpoint = 'users/cart/add';
export const viewCartEndpoint = 'users/cart';

// 🔹 4. Packages & Subscription Endpoints
export const getPackagesEndpoint = 'users/packages';
export const getPackagesWithParamsEndpoint = (params = {}) => {
  const status = params?.status !== undefined ? params.status : 'active';
  const search = params?.search !== undefined ? params.search : '';
  const queryParts = [];
  if (status) queryParts.push(`status=${encodeURIComponent(status)}`);
  if (search !== undefined) queryParts.push(`search=${encodeURIComponent(search)}`);
  return queryParts.length > 0 ? `users/packages?${queryParts.join('&')}` : 'users/packages';
};
export const purchasePackageEndpoint = 'users/package/buy';
export const getMyPurchasesEndpoint = 'users/package/my-purchases';

// 🔹 5. Wallet & Fund Requests Endpoints
export const fundRequestCreateEndpoint = 'users/fund/request';
export const fundRequestHistoryEndpoint = 'users/fund/my-requests';
export const getCompanyBankEndpoint = 'users/company-bank';
export const depositEndpoint = 'users/fund/request';
export const getTransactionsEndpoint = 'users/transactions';
export const withdrawalEndpoint = 'users/withdraw';

// 🔹 6. Earnings & Network Endpoints
export const binaryTreeEndpoint = 'users/binary-tree';
export const getBinaryTreeEndpoint = (depth = 3, userId = null) => {
  const query = [];
  if (depth !== undefined && depth !== null) query.push(`depth=${depth}`);
  if (userId) query.push(`userId=${encodeURIComponent(userId)}`);
  return query.length > 0 ? `users/binary-tree?${query.join('&')}` : 'users/binary-tree';
};
export const referralIncomeEndpoint = 'users/referral-income';
export const levelIncomeEndpoint = 'users/binary-tree';
export const passiveIncomeEndpoint = 'users/passive-income';
export const passiveCategoriesEndpoint = 'users/passive-income/categories';
export const passiveSubmitLeadEndpoint = 'users/passive-income/request';
export const passiveMyRequestsEndpoint = 'users/passive-income/my-requests';
export const ctoIncomeEndpoint = 'users/cto-income';
export const claimIncomeEndpoint = 'users/claim-income';
export const getClaimHistoryEndpoint = 'users/claim-history';
export const referralIncomeHistoryEndpoint = 'users/referral-income/history';
export const getReferralIncomeHistoryEndpoint = (level = null) =>
  level ? `users/referral-income/history?level=${level}` : 'users/referral-income/history';
export const manualTransactionsEndpoint = 'users/wallet/manual-transactions';

// 🔹 7. Bank & Account Endpoints
export const addBankEndpoint = 'users/bank-details';
export const getBankDetailsEndpoint = 'users/bank-details';
export const getActiveBankQrsEndpoint = 'users/bank/active';

// 🔹 Legacy Aliases
export const getUtilityOperatorsEndpoint = 'users/utility/operators';
export const getElectricityOperatorsEndpoint = 'users/get-electricity-operators';
export const getDthOperatorsEndpoint = 'users/get-dth-operators';
export const getGasOperatorsEndpoint = 'users/get-gas-operators';
export const getFastagOperatorsEndpoint = 'users/get-fastag-operators';
export const getFetchOperatorsEndpoint = 'users/fetch-operators';
export const getAllCirclesEndpoint = 'users/get-all-circles';
export const getCircleEndpoint = 'users/get-circle';
export const getRechargePlansEndpoint = 'users/utility/plans';
export const getRechargePlansExactEndpoint = 'users/get-recharge-plans';
export const getParticularOperatorEndpoint = (opCode) => `users/get-particular-operator/${opCode}`;
export const fetchLiveBillEndpoint = 'users/utility/fetch-bill';
export const fetchBillsEndpoint = 'users/fetch-bills';
export const payUtilityBillEndpoint = 'users/utility/pay';
export const utilityPaymentEndpoint = 'users/utility-payment';
export const rechargePrepaidEndpoint = 'users/recharge';
export const rechargePostpaidEndpoint = 'users/postpaid-recharge';
export const rechargeDthEndpoint = 'users/dth/recharge';
export const rechargeGasEndpoint = 'users/gas/recharge';
export const payFastagEndpoint = 'users/fastag-payment';
export const getUtilityHistoryEndpoint = 'users/utility/history';
export const getNotificationsEndpoint = 'users/notifications';
export const markNotificationReadEndpoint = (id) => `users/notifications/${id}/read`;
export const markAllNotificationsReadEndpoint = 'users/notifications/read-all';
export const adminGetAllNotificationsEndpoint = 'users/notifications/admin/all';
export const adminCreateNotificationEndpoint = 'users/notifications/admin/create';
export const adminDeleteNotificationEndpoint = (id) => `users/notifications/admin/${id}`;
