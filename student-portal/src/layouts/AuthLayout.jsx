// src/layouts/AuthLayout.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AuthLayout = () => {
  const { isAuthenticated } = useSelector(s => s.auth);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy/90 to-teal/20 flex items-center justify-center p-4">
      <Outlet />
    </div>
  );
};