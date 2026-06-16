import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { loginStart, loginSuccess, loginFailure, logout as logoutAction, showToast, hideToast } from '../store';
import { adminAuthService } from '../services/api';

export const useAdminAuth = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector(s => s.auth);

  const login = useCallback(async (credentials) => {
    dispatch(loginStart());
    try {
      const data = await adminAuthService.login(credentials);
      dispatch(loginSuccess(data));
      dispatch(showToast({ message: `Welcome back, ${data.user.name}! 👋`, type: 'success' }));
      setTimeout(() => dispatch(hideToast()), 3500);
      navigate('/dashboard');
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  }, [dispatch, navigate]);

  const logout = useCallback(() => {
    dispatch(logoutAction());
    navigate('/login');
  }, [dispatch, navigate]);

  return { user, isAuthenticated, loading, error, login, logout };
};

export const useToast = () => {
  const dispatch = useDispatch();
  const toast    = useSelector(s => s.ui.toast);
  const show = useCallback((message, type = 'success') => {
    dispatch(showToast({ message, type }));
    setTimeout(() => dispatch(hideToast()), 3500);
  }, [dispatch]);
  return { toast, show };
};
