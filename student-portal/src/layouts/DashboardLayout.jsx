import DashboardSidebar from '../components/Sidebar/DashboardSidebar';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const DashboardLayout = () => {
  const { isAuthenticated } = useSelector(s => s.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen flex bg-slate-100">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-navy">Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-gray-400 hover:text-navy transition-colors">
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="h-6 w-px bg-gray-200" />
            <span className="text-sm text-gray-500">Need help? <a href="#" className="text-teal font-medium">Get Support</a></span>
          </div>
        </header>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

