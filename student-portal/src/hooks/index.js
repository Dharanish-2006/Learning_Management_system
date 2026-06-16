import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { loginStart, loginSuccess, loginFailure, logout as logoutAction, showToast, hideToast } from '../store';
import { authService } from '../services/api';

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector(s => s.auth);

  const login = useCallback(async (credentials) => {
    dispatch(loginStart());
    try {
      const data = await authService.login(credentials);
      dispatch(loginSuccess(data));
      dispatch(showToast({ message: 'Welcome back! 👋', type: 'success' }));
      navigate('/dashboard');
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  }, [dispatch, navigate]);

  const register = useCallback(async (data) => {
    dispatch(loginStart());
    try {
      const result = await authService.register(data);
      dispatch(loginSuccess(result));
      dispatch(showToast({ message: 'Account created! Welcome 🎉', type: 'success' }));
      navigate('/dashboard');
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  }, [dispatch, navigate]);

  const logout = useCallback(() => {
    dispatch(logoutAction());
    navigate('/');
  }, [dispatch, navigate]);

  return { user, isAuthenticated, loading, error, login, register, logout };
};

export const useToast = () => {
  const dispatch = useDispatch();
  const toast = useSelector(s => s.ui.toast);

  const show = useCallback((message, type = 'success') => {
    dispatch(showToast({ message, type }));
    setTimeout(() => dispatch(hideToast()), 3500);
  }, [dispatch]);

  return { toast, show };
};

export const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};