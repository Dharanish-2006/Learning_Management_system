// src/pages/Dashboard/DashboardHome.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { dashboardService } from '../../services/api';
import Loader from '../../components/Loader/Loader';

export default function DashboardHome() {
  const { user } = useSelector(s => s.auth);
  const [data, setData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([dashboardService.getOverview(), dashboardService.getMyCourses()]).then(([overview, myCourses]) => {
      setData(overview);
      setCourses(myCourses);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader center text="Loading dashboard..." />;

  const STAT_CARDS = [
    { label: 'Enrolled Courses', value: data.enrolledCount, icon: '📚', color: '#00D4AA' },
    { label: 'Hours Learned', value: `${data.hoursLearned}h`, icon: '⏱️', color: '#6366F1' },
    { label: 'Completed Lessons', value: data.completedLessons, icon: '✅', color: '#10B981' },
    { label: 'Certificates Earned', value: data.certificates, icon: '🏆', color: '#F59E0B' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="page-title">Good morning, {user?.name?.split(' ')[0]}! 👋</h1>
        <p className="page-subtitle">
          You're on a <span className="text-teal font-semibold">{data.streak}-day learning streak</span>. Keep it up!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map(s => (
          <div key={s.label} className="stat-card" style={{ borderLeftColor: s.color }}>
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-2xl font-extrabold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs font-medium text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Continue Learning */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-extrabold text-navy">Continue Learning</h2>
            <Link to="/dashboard/my-courses" className="text-sm text-teal font-semibold hover:underline">View all →</Link>
          </div>
          {courses.map(c => (
            <div key={c.id} className="mb-5 last:mb-0">
              <div className="flex gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: c.color + '30' }}>{c.thumbnail}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-navy truncate">{c.title}</p>
                  <p className="text-xs text-gray-400">{c.instructor}</p>
                </div>
                <span className="text-sm font-bold text-navy">{c.progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${c.progress}%` }} />
              </div>
              <div className="mt-2">
                <Link to={`/courses/${c.id}`} className="btn-primary btn-sm text-xs">
                  ▶ Continue
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-lg font-extrabold text-navy mb-5">Recent Activity</h2>
          <div className="space-y-4">
            {data.recentActivities.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-light flex items-center justify-center text-lg flex-shrink-0">
                  {a.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-navy">{a.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress summary */}
      <div className="mt-6 bg-gradient-to-r from-navy to-navy/80 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg mb-1">Weekly Learning Goal</h3>
            <p className="text-gray-400 text-sm">You've learned 4.5 of your 5-hour weekly goal</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-teal">90%</div>
            <div className="text-gray-400 text-xs">4.5 / 5 hours</div>
          </div>
        </div>
        <div className="mt-4 progress-bar">
          <div className="progress-fill" style={{ width: '90%' }} />
        </div>
      </div>
    </div>
  );
};

// ---- PROFILE ----
