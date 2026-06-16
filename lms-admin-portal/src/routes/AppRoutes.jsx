import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout }   from '../layouts/AdminLayout';
import { AuthLayout }    from '../layouts/AuthLayout';
import AdminLogin        from '../pages/Admin/AdminLogin';
import AdminDashboard    from '../pages/Admin/AdminDashboard';
import CourseManagement  from '../pages/Admin/CourseManagement';
import UserManagement    from '../pages/Admin/UserManagement';
import Analytics         from '../pages/Admin/Analytics';
import Settings          from '../pages/Admin/Settings';

const AppRoutes = () => (
  <Routes>
    {/* Auth */}
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<AdminLogin />} />
    </Route>

    {/* Protected admin panel */}
    <Route path="/dashboard" element={<AdminLayout />}>
      <Route index           element={<AdminDashboard />} />
      <Route path="courses"  element={<CourseManagement />} />
      <Route path="users"    element={<UserManagement />} />
      <Route path="analytics"element={<Analytics />} />
      <Route path="settings" element={<Settings />} />
    </Route>

    {/* Default redirect */}
    <Route path="/"  element={<Navigate to="/login"     replace />} />
    <Route path="*"  element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

export default AppRoutes;
