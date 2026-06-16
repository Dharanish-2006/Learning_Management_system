import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../../store';

const ICONS   = { success:'✓', error:'✕', info:'ℹ', warning:'⚠' };
const COLORS  = {
  success:'bg-teal text-white',
  error:'bg-red-500 text-white',
  info:'bg-navy text-white',
  warning:'bg-amber-500 text-white',
};

const Toast = () => {
  const dispatch = useDispatch();
  const toast    = useSelector(s => s.ui.toast);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => dispatch(hideToast()), 3500);
      return () => clearTimeout(t);
    }
  }, [toast, dispatch]);

  if (!toast) return null;
  const type = toast.type || 'success';

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl font-semibold text-sm animate-fade-in ${COLORS[type]}`}>
      <span>{ICONS[type]}</span>
      {toast.message}
      <button onClick={() => dispatch(hideToast())} className="ml-2 opacity-70 hover:opacity-100 text-xs">✕</button>
    </div>
  );
};

export default Toast;
