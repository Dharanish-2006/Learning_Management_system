import { configureStore, createSlice } from '@reduxjs/toolkit';

// ── AUTH SLICE ────────────────────────────────────────────────────────────────
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, isAuthenticated: false, loading: false, error: null },
  reducers: {
    loginStart:   state => { state.loading = true; state.error = null; },
    loginSuccess: (state, { payload }) => {
      state.loading = false; state.user = payload.user;
      state.token = payload.token; state.isAuthenticated = true;
    },
    loginFailure: (state, { payload }) => { state.loading = false; state.error = payload; },
    logout:       state => { state.user = null; state.token = null; state.isAuthenticated = false; },
    clearError:   state => { state.error = null; },
  },
});

// ── UI SLICE ──────────────────────────────────────────────────────────────────
const uiSlice = createSlice({
  name: 'ui',
  initialState: { toast: null, sidebarOpen: true },
  reducers: {
    showToast:     (state, { payload }) => { state.toast = payload; },
    hideToast:     state => { state.toast = null; },
    toggleSidebar: state => { state.sidebarOpen = !state.sidebarOpen; },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export const { showToast, hideToast, toggleSidebar } = uiSlice.actions;

export const store = configureStore({
  reducer: { auth: authSlice.reducer, ui: uiSlice.reducer },
});

export default store;
