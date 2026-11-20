import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cms: null,
  banners: [],
  categories: [],
  subcategories: [],
  products: [],
  services: [],
  cartItems: [],
  isLoading: false,
  error: null,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCmsContent: (state, action) => {
      state.cms = action.payload;
    },
    setBanners: (state, action) => {
      state.banners = Array.isArray(action.payload) ? action.payload : [];
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSubcategories: (state, action) => {
      state.subcategories = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setServicesList: (state, action) => {
      state.services = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    addCartItem: (state, action) => {
      const payloadId = action.payload.productId || action.payload.id || action.payload._id;
      const existing = state.cartItems.find(
        (item) => (item.productId || item.id || item._id) === payloadId
      );
      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          productId: payloadId,
          quantity: action.payload.quantity || 1,
        });
      }
    },
    removeCartItem: (state, action) => {
      const removeId = action.payload.productId || action.payload.id || action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => (item.productId || item.id || item._id) !== removeId
      );
    },
    updateCartQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existing = state.cartItems.find(
        (item) => (item.productId || item.id || item._id) === productId
      );
      if (existing) {
        if (quantity <= 0) {
          state.cartItems = state.cartItems.filter(
            (item) => (item.productId || item.id || item._id) !== productId
          );
        } else {
          existing.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    setCatalogLoading: (state, action) => {
      state.isLoading = !!action.payload;
    },
    setCatalogError: (state, action) => {
      state.error = action.payload;
    },
    clearCatalogError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCmsContent,
  setBanners,
  setCategories,
  setSubcategories,
  setProducts,
  setServicesList,
  setCartItems,
  addCartItem,
  removeCartItem,
  updateCartQuantity,
  clearCart,
  setCatalogLoading,
  setCatalogError,
  clearCatalogError,
} = catalogSlice.actions;

export {
  fetchCmsContentApi,
  fetchCategoriesApi,
  fetchSubcategoriesApi,
  fetchProductsApi,
  fetchServicesApi,
  fetchCartApi,
  addToCartApi,
  fetchCmsContent,
  fetchCategories,
  fetchSubcategories,
  fetchProducts,
  fetchServices,
  fetchCart,
  addToCart,
} from '../actions/catalogAction';

export default catalogSlice.reducer;
