// ============================================================
// MOCK API SERVICE
// Replace these with real Axios calls when backend is ready.
// Example: import axios from 'axios'; const API = axios.create({ baseURL: 'http://localhost:5000/api' });
// ============================================================

import { COURSES, MOCK_USERS } from '../utils/mockData';

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

// ---- AUTH ----
export const authService = {
  login: async ({ email, password }) => {
    await delay();
    if (!email || !password) throw new Error('Email and password are required');
    return {
      user: { id: 1, name: 'Arjun Joshi', email, avatar: 'AJ', role: 'student' },
      token: 'mock-jwt-token-' + Date.now(),
    };
  },
  register: async ({ name, email, password }) => {
    await delay(600);
    if (!name || !email || !password) throw new Error('All fields are required');
    return {
      user: { id: Date.now(), name, email, avatar: name.split(' ').map(n => n[0]).join('').toUpperCase(), role: 'student' },
      token: 'mock-jwt-token-' + Date.now(),
    };
  },
  forgotPassword: async ({ email }) => {
    await delay(500);
    if (!email) throw new Error('Email is required');
    return { message: `Password reset link sent to ${email}` };
  },
  logout: async () => {
    await delay(200);
    return { success: true };
  },
};

// ---- COURSES ----
export const courseService = {
  getAll: async ({ category, search, sort, page = 1, limit = 6 } = {}) => {
    await delay();
    let data = [...COURSES];
    if (category && category !== 'All') data = data.filter(c => c.category === category);
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(c => c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q));
    }
    if (sort === 'price-asc') data.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') data.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') data.sort((a, b) => b.rating - a.rating);
    else data.sort((a, b) => b.students - a.students); // popular default
    const total = data.length;
    const paginated = data.slice((page - 1) * limit, page * limit);
    return { courses: paginated, total, totalPages: Math.ceil(total / limit), currentPage: page };
  },
  getById: async (id) => {
    await delay(300);
    const course = COURSES.find(c => c.id === Number(id));
    if (!course) throw new Error('Course not found');
    return course;
  },
  getFeatured: async () => {
    await delay(300);
    return COURSES.sort((a, b) => b.students - a.students).slice(0, 6);
  },
  enroll: async (courseId) => {
    await delay(500);
    return { success: true, message: 'Enrolled successfully!' };
  },
};

// ---- STUDENT DASHBOARD ----
export const dashboardService = {
  getOverview: async () => {
    await delay();
    return {
      enrolledCount: 2,
      hoursLearned: 47,
      completedLessons: 83,
      certificates: 1,
      streak: 7,
      recentActivities: [
        { icon: '📚', text: 'Completed "Python Basics" lesson', time: '2 hours ago' },
        { icon: '🏆', text: 'Earned "Fast Learner" badge', time: 'Yesterday' },
        { icon: '✅', text: 'Finished Week 2 quiz — scored 92%', time: '2 days ago' },
        { icon: '🔖', text: 'Bookmarked "Advanced ML Techniques"', time: '3 days ago' },
        { icon: '💬', text: 'Posted in Python community forum', time: '4 days ago' },
      ],
    };
  },
  getMyCourses: async () => {
    await delay();
    return COURSES.filter(c => c.enrolled);
  },
};

// ---- USER PROFILE ----
export const userService = {
  getProfile: async () => {
    await delay();
    return {
      id: 1,
      name: 'Arjun Joshi',
      email: 'arjun.j@gmail.com',
      phone: '+91 98765 43210',
      bio: 'Full Stack Developer passionate about continuous learning and building scalable products.',
      location: 'Bangalore, India',
      avatar: 'AJ',
      joinedDate: 'January 2024',
      socialLinks: { linkedin: '', github: '', twitter: '' },
    };
  },
  updateProfile: async (data) => {
    await delay(500);
    return { ...data, success: true };
  },
};
