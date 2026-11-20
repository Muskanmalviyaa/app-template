import Toast from '../../utils/toast';
import { getApi, postApi } from '../../services/api';
import {
  getCmsContentEndpoint,
  getCategoriesEndpoint,
  getSubcategoriesEndpoint,
  getProductsEndpoint,
  getServicesEndpoint,
  viewCartEndpoint,
  addToCartEndpoint,
} from '../apiEndpoint';
import {
  setCmsContent,
  setBanners,
  setCategories,
  setSubcategories,
  setProducts,
  setServicesList,
  setCartItems,
  addCartItem,
  setCatalogLoading,
  setCatalogError,
} from '../slices/catalogSlice';

const handleError = (error, cb, endpoint) => {
  const errorMsg = error?.response?.data?.message || error?.message || 'An error occurred.';
  console.log(`${endpoint} API ERROR -->`, errorMsg);
  Toast.show({ type: 'error', text1: errorMsg });
  cb?.({ success: false, message: errorMsg });
};

// 1. CMS Content (GET /api/cms/content)
export const fetchCmsContentApi = (params = {}) => async (dispatch) => {
  const cb = params?.cb;

  try {
    cb?.({ loading: true });
    dispatch(setCatalogLoading(true));
    dispatch(setCatalogError(null));

    const response = await getApi(getCmsContentEndpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${getCmsContentEndpoint} API RESPONSE -->`, response?.data);
      const raw = response?.data;
      const bannerList = Array.isArray(raw?.data)
        ? raw.data
        : Array.isArray(raw?.banners)
        ? raw.banners
        : Array.isArray(raw)
        ? raw
        : [];
      if (bannerList.length > 0) {
        dispatch(setBanners(bannerList));
      }
      const content = raw?.content || raw?.data || raw;
      if (content) {
        dispatch(setCmsContent(content));
      }
      dispatch(setCatalogLoading(false));
      cb?.({ success: true, data: response?.data, banners: bannerList });
      return { success: true, data: response?.data, banners: bannerList, content };
    }
  } catch (error) {
    dispatch(setCatalogLoading(false));
    dispatch(setCatalogError(error.message));
    handleError(error, cb, getCmsContentEndpoint);
    return { success: false, error: error.message };
  }
};

// 2. All Categories (GET /api/category/list)
export const fetchCategoriesApi = (params = {}) => async (dispatch) => {
  const cb = params?.cb;

  try {
    cb?.({ loading: true });
    dispatch(setCatalogLoading(true));

    const response = await getApi(getCategoriesEndpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${getCategoriesEndpoint} API RESPONSE -->`, response?.data);
      const list = response?.data?.categories || response?.data?.data || response?.data;
      if (Array.isArray(list)) {
        dispatch(setCategories(list));
      }
      dispatch(setCatalogLoading(false));
      cb?.({ success: true, data: response?.data });
      return { success: true, data: response?.data, list };
    }
  } catch (error) {
    dispatch(setCatalogLoading(false));
    handleError(error, cb, getCategoriesEndpoint);
    return { success: false, error: error.message };
  }
};

// 3. Subcategories (GET /api/subcategory/list/:categoryId)
export const fetchSubcategoriesApi = (params = {}) => async (dispatch) => {
  const categoryId = params?.categoryId || params?.payload?.categoryId || params;
  const cb = params?.cb;

  try {
    cb?.({ loading: true });
    dispatch(setCatalogLoading(true));

    const endpoint = typeof getSubcategoriesEndpoint === 'function'
      ? getSubcategoriesEndpoint(categoryId)
      : `api/subcategory/list/${categoryId}`;

    const response = await getApi(endpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${endpoint} API RESPONSE -->`, response?.data);
      const list = response?.data?.subcategories || response?.data?.data || response?.data;
      if (Array.isArray(list)) {
        dispatch(setSubcategories(list));
      }
      dispatch(setCatalogLoading(false));
      cb?.({ success: true, data: response?.data });
      return { success: true, data: response?.data, list };
    }
  } catch (error) {
    dispatch(setCatalogLoading(false));
    handleError(error, cb, `subcategoryList_${categoryId}`);
    return { success: false, error: error.message };
  }
};

// 4. Products (GET /api/product/list)
export const fetchProductsApi = (params = {}) => async (dispatch) => {
  const cb = params?.cb;

  try {
    cb?.({ loading: true });
    dispatch(setCatalogLoading(true));

    const response = await getApi(getProductsEndpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${getProductsEndpoint} API RESPONSE -->`, response?.data);
      const list = response?.data?.products || response?.data?.data || response?.data;
      if (Array.isArray(list)) {
        dispatch(setProducts(list));
      }
      dispatch(setCatalogLoading(false));
      cb?.({ success: true, data: response?.data });
      return { success: true, data: response?.data, list };
    }
  } catch (error) {
    dispatch(setCatalogLoading(false));
    handleError(error, cb, getProductsEndpoint);
    return { success: false, error: error.message };
  }
};

// 5. Services List (GET /api/service/list)
export const fetchServicesApi = (params = {}) => async (dispatch) => {
  const cb = params?.cb;

  try {
    cb?.({ loading: true });
    dispatch(setCatalogLoading(true));

    const response = await getApi(getServicesEndpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${getServicesEndpoint} API RESPONSE -->`, response?.data);
      const list = response?.data?.services || response?.data?.data || response?.data;
      if (Array.isArray(list)) {
        dispatch(setServicesList(list));
      }
      dispatch(setCatalogLoading(false));
      cb?.({ success: true, data: response?.data });
      return { success: true, data: response?.data, list };
    }
  } catch (error) {
    dispatch(setCatalogLoading(false));
    handleError(error, cb, getServicesEndpoint);
    return { success: false, error: error.message };
  }
};

// 6. View Cart (GET /api/cart/view)
export const fetchCartApi = (params = {}) => async (dispatch) => {
  const cb = params?.cb;

  try {
    cb?.({ loading: true });
    dispatch(setCatalogLoading(true));

    const response = await getApi(viewCartEndpoint);
    if (response?.status === 200 || response?.status === 201) {
      console.log(`${viewCartEndpoint} API RESPONSE -->`, response?.data);
      const items = response?.data?.items || response?.data?.data || response?.data;
      if (Array.isArray(items)) {
        dispatch(setCartItems(items));
      }
      dispatch(setCatalogLoading(false));
      cb?.({ success: true, data: response?.data });
      return { success: true, data: response?.data, items };
    }
  } catch (error) {
    dispatch(setCatalogLoading(false));
    handleError(error, cb, viewCartEndpoint);
    return { success: false, error: error.message };
  }
};

// 7. Add to Cart (POST /api/cart/add)
export const addToCartApi = (params = {}) => async (dispatch) => {
  const payload = params?.payload || params;
  const cb = params?.cb;

  try {
    cb?.({ loading: true });
    const response = await postApi(addToCartEndpoint, {
      productId: payload.productId,
      quantity: payload.quantity || 1,
    });

    if (response?.status === 200 || response?.status === 201) {
      console.log(`${addToCartEndpoint} API RESPONSE -->`, response?.data);
      const cartItem = {
        productId: payload.productId,
        quantity: payload.quantity || 1,
        product: payload.product || { id: payload.productId, name: 'Service Item' },
      };
      dispatch(addCartItem(cartItem));
      Toast.show({ type: 'success', text1: 'Item added to cart!' });
      cb?.({ success: true, data: response?.data });
      return { success: true, data: response?.data, cartItem };
    }
  } catch (error) {
    handleError(error, cb, addToCartEndpoint);
    return { success: false, error: error.message };
  }
};

// Aliases
export const fetchCmsContent = fetchCmsContentApi;
export const fetchCategories = fetchCategoriesApi;
export const fetchSubcategories = fetchSubcategoriesApi;
export const fetchProducts = fetchProductsApi;
export const fetchServices = fetchServicesApi;
export const fetchCart = fetchCartApi;
export const addToCart = addToCartApi;
