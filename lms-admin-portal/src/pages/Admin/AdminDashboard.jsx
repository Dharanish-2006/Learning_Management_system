import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { adminDashboardService } from '../../services/api';
import Loader from '../../components/Loader/Loader';

const StatCard = ({ icon, label, value, sub, color, trend }) => (
  <div className="stat-card" style={{ borderLeftColor: color }}>
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: color + '20' }}>
        {icon}
      </div>
      {trend && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div className="text-2xl font-extrabold text-navy mb-0.5">{value}</div>
    <div className="text-xs font-semibold text-gray-500">{label}</div>
    {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
  </div>
);

export default function AdminDashboard() {
  const { user }  = useSelector(s => s.auth);
  const [summary, setSummary]   = useState(null);
  const [users,   setUsers]     = useState([]);
  const [courses, setCourses]   = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([
      adminDashboardService.getSummary(),
      adminDashboardService.getRecentUsers(),
      adminDashboardService.getRecentCourses(),
    ]).then(([s, u, c]) => { setSummary(s); setUsers(u); setCourses(c); setLoading(false); });
  }, []);

  if (loading) return <Loader center text="Loading dashboard..." />;

  const STATS = [
    { icon:'👥', label:'Total Users',       value: summary.totalUsers.toLocaleString(),       sub:`+${summary.newUsersThisMonth.toLocaleString()} this month`,       color:'#00D4AA', trend:18.7 },
    { icon:'📚', label:'Total Courses',     value: summary.totalCourses,                       sub:`+${summary.newCoursesThisMonth} this month`,                      color:'#6C5CE7', trend:12.5 },
    { icon:'🎓', label:'Total Enrollments', value: summary.totalEnrollments.toLocaleString(),  sub:`+${summary.newEnrollmentsThisMonth.toLocaleString()} this month`,  color:'#0F2D4A', trend:14.2 },
    { icon:'💰', label:'Total Revenue',     value:`₹${(summary.revenue/100000).toFixed(1)}L`,  sub:`₹${(summary.revenueThisMonth/100000).toFixed(1)}L this month`,    color:'#F59E0B', trend:22.1 },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="page-title">Good morning, {user?.name?.split(' ')[0]}! 👋</h1>
          <p className="page-subtitle">Here's what's happening on your platform today.</p>
        </div>
        <Link to="/dashboard/courses" className="btn-primary">+ New Course</Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {STATS.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent users */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-extrabold text-navy">Recent Sign-ups</h2>
            <Link to="/dashboard/users" className="text-sm text-teal font-semibold hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {users.map(u => (
              <div key={u.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-9 h-9 rounded-full bg-teal-light text-teal-dark font-bold text-xs flex items-center justify-center flex-shrink-0">
                  {u.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy truncate">{u.name}</p>
                  <p className="text-xs text-gray-400 truncate">{u.email}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`badge ${u.status === 'active' ? 'badge-green' : 'badge-red'}`}>
                    {u.status}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">{u.courses} courses</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent courses */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-extrabold text-navy">Top Courses</h2>
            <Link to="/dashboard/courses" className="text-sm text-teal font-semibold hover:underline">Manage →</Link>
          </div>
          <div className="space-y-3">
            {courses.map(c => (
              <div key={c.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-9 h-9 rounded-lg bg-navy/5 flex items-center justify-center text-xl flex-shrink-0">
                  {c.thumbnail}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy truncate">{c.title}</p>
                  <p className="text-xs text-gray-400">{c.instructor}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-navy">₹{c.price.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{c.students.toLocaleString()} students</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon:'📚', label:'Add Course',   to:'/dashboard/courses', color:'#00D4AA' },
          { icon:'👥', label:'View Users',   to:'/dashboard/users',   color:'#6C5CE7' },
          { icon:'📈', label:'Analytics',    to:'/dashboard/analytics',color:'#0F2D4A'},
          { icon:'⚙️', label:'Settings',     to:'/dashboard/settings',color:'#F59E0B' },
        ].map(item => (
          <Link key={item.label} to={item.to}
            className="card flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-4 no-underline">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: item.color + '20' }}>
              {item.icon}
            </div>
            <span className="font-semibold text-sm text-navy">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
