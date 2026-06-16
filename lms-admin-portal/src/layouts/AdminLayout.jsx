import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminSidebar from '../components/Sidebar/AdminSidebar';
import Toast from '../components/Toast/Toast';

export const AdminLayout = () => {
  const { isAuthenticated } = useSelector(s => s.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen flex bg-slate-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-navy">Admin Panel</span>
            <span className="mx-2 text-gray-300">·</span>
            <span>LearnHub LMS</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-gray-400 hover:text-navy transition-colors">
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
            </button>
            <div className="h-5 w-px bg-gray-200" />
            <a href="http://localhost:3000" target="_blank" rel="noreferrer"
              className="text-sm text-teal font-medium hover:underline flex items-center gap-1">
              🌐 Student Portal
            </a>
          </div>
        </header>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
      <Toast />
    </div>
  );
};
