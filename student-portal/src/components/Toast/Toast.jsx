// src/components/Toast/Toast.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../../store';

const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
const colors = {
  success: 'bg-teal text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-navy text-white',
  warning: 'bg-amber-500 text-white',
};

const Toast = () => {
  const dispatch = useDispatch();
  const toast = useSelector(s => s.ui.toast);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => dispatch(hideToast()), 3500);
      return () => clearTimeout(t);
    }
  }, [toast, dispatch]);

  if (!toast) return null;
  const type = toast.type || 'success';

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg font-semibold text-sm animate-fade-in ${colors[type]}`}>
      <span className="text-base">{icons[type]}</span>
      {toast.message}
    </div>
  );
};

export default Toast;
