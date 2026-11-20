import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  id: null,
  isAuthenticated: false,
  isLoading: false,
  loading: false,
  error: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.id = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.loading = false;
      state.error = null;
      state.status = 'idle';
    },
    deleteState(state) {
      state.user = null;
      state.token = null;
      state.id = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.loading = false;
      state.error = null;
      state.status = 'idle';
    },
    updateState(state, action) {
      Object.assign(state, action.payload);
    },
    setToken(state, action) {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setUser(state, action) {
      let raw = action.payload;
      if (raw?.user) raw = raw.user;
      if (raw?.data && (raw?.data?.name || raw?.data?._id || raw?.data?.email || raw?.data?.username)) {
        raw = raw.data;
      }
      state.user = raw;
      if (raw?._id || raw?.id) {
        state.id = raw._id || raw.id;
      }
    },
    setLoading(state, action) {
      state.loading = !!action.payload;
      state.isLoading = !!action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearAuthError(state) {
      state.error = null;
    },
    setUserDetails(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const {
  logout,
  deleteState,
  updateState,
  setToken,
  setUser,
  setLoading,
  setError,
  clearAuthError,
  setUserDetails,
} = authSlice.actions;

export {
  loginApi,
  registerApi,
  getProfileApi,
  logoutApi,
  loginUser,
  registerUser,
  fetchUserProfile,
  logoutUser,
  bootstrapAuth,
} from '../actions/authAction';

export default authSlice.reducer;
