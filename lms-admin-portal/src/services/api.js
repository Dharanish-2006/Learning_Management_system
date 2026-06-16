import { COURSES, USERS, ANALYTICS, SUMMARY, ADMIN_USER } from '../utils/mockData';

const delay = (ms = 400) => new Promise(r => setTimeout(r, ms));

// ── AUTH ────────────────────────────────────────────────────────────────────
export const adminAuthService = {
  login: async ({ email, password }) => {
    await delay(700);
    if (!email || !password) throw new Error('Email and password are required');
    if (email !== 'admin@learnhub.com') throw new Error('No admin account found for this email');
    return { user: ADMIN_USER, token: 'admin-jwt-' + Date.now() };
  },
  logout: async () => { await delay(200); return { success: true }; },
};

// ── DASHBOARD ────────────────────────────────────────────────────────────────
export const adminDashboardService = {
  getSummary: async () => { await delay(); return SUMMARY; },
  getRecentUsers: async () => { await delay(300); return USERS.slice(0, 5); },
  getRecentCourses: async () => { await delay(300); return COURSES.slice(0, 5); },
};

// ── COURSES ──────────────────────────────────────────────────────────────────
export const adminCourseService = {
  getAll: async ({ search = '', status = 'all', category = 'all' } = {}) => {
    await delay();
    let data = [...COURSES];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(c => c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q));
    }
    if (status !== 'all')   data = data.filter(c => c.status === status);
    if (category !== 'all') data = data.filter(c => c.category === category);
    return { courses: data, total: data.length };
  },
  getById: async (id) => { await delay(300); return COURSES.find(c => c.id === Number(id)) || null; },
  create: async (data) => { await delay(600); return { ...data, id: Date.now(), students: 0, rating: 0, createdAt: new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }) }; },
  update: async (id, data) => { await delay(500); return { ...data, id }; },
  delete: async (id) => { await delay(400); return { success: true, id }; },
};

// ── USERS ─────────────────────────────────────────────────────────────────────
export const adminUserService = {
  getAll: async ({ search = '', status = 'all' } = {}) => {
    await delay();
    let data = [...USERS];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    if (status !== 'all') data = data.filter(u => u.status === status);
    return { users: data, total: data.length };
  },
  block:  async (id) => { await delay(400); return { success: true, id }; },
  unblock:async (id) => { await delay(400); return { success: true, id }; },
  delete: async (id) => { await delay(400); return { success: true, id }; },
}
// ── ANALYTICS ─────────────────────────────────────────────────────────────────
export const adminAnalyticsService = {
  getAll: async () => { await delay(500); return ANALYTICS; },
};
