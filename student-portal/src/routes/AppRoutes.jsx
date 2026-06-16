import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import HomePage from '../pages/Home/HomePage';
import CourseList from '../pages/Courses/CourseList';
import CourseDetails from '../pages/Courses/CourseDetails';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import DashboardHome from '../pages/Dashboard/DashboardHome';
import MyCourses from '../pages/Dashboard/MyCourses';
import Profile from '../pages/Dashboard/Profile';

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<CourseList />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
    </Route>
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Route>
    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route index element={<DashboardHome />} />
      <Route path="my-courses" element={<MyCourses />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Profile />} />
    </Route>
  </Routes>
);

export default AppRoutes;
