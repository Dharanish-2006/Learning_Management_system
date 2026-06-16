import { configureStore, createSlice } from '@reduxjs/toolkit';

// ---- AUTH SLICE ----
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: state => { state.loading = true; state.error = null; },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    clearError: state => { state.error = null; },
    updateUser: (state, action) => { state.user = { ...state.user, ...action.payload }; },
  },
});

// ---- COURSES SLICE ----
const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    list: [],
    featured: [],
    current: null,
    loading: false,
    error: null,
    total: 0,
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {
    setLoading: (state, action) => { state.loading = action.payload; },
    setCourses: (state, action) => {
      state.list = action.payload.courses;
      state.total = action.payload.total;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.loading = false;
    },
    setFeatured: (state, action) => { state.featured = action.payload; },
    setCurrentCourse: (state, action) => { state.current = action.payload; },
    setError: (state, action) => { state.error = action.payload; state.loading = false; },
  },
});

// ---- UI SLICE ----
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    toast: null,
    sidebarOpen: true,
  },
  reducers: {
    showToast: (state, action) => { state.toast = action.payload; },
    hideToast: state => { state.toast = null; },
    toggleSidebar: state => { state.sidebarOpen = !state.sidebarOpen; },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError, updateUser } = authSlice.actions;
export const { setLoading, setCourses, setFeatured, setCurrentCourse, setError } = coursesSlice.actions;
export const { showToast, hideToast, toggleSidebar } = uiSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    courses: coursesSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
