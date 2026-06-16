// src/components/Sidebar/DashboardSidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store';

const NAV = [
  { icon: '📊', label: 'Overview', to: '/dashboard' },
  { icon: '📚', label: 'My Courses', to: '/dashboard/my-courses' },
  { icon: '👤', label: 'Profile', to: '/dashboard/profile' },
  { icon: '⚙️', label: 'Settings', to: '/dashboard/profile' },
];

const DashboardSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(s => s.auth);

  const handleLogout = () => { dispatch(logout()); navigate('/'); };

  return (
    <aside className="w-60 min-h-screen bg-navy flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <NavLink to="/" className="text-xl font-extrabold text-white no-underline">
          Learn<span className="text-teal">Hub</span>
        </NavLink>
      </div>

      {/* User info */}
      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-light text-teal-dark font-bold flex items-center justify-center">
            {user?.avatar || 'U'}
          </div>
          <div>
            <div className="text-sm font-semibold text-white truncate">{user?.name || 'Student'}</div>
            <div className="text-xs text-gray-400 truncate">{user?.email}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <div className="px-5 pb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Main Menu</div>
        {NAV.map(item => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === '/dashboard'}
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}

        <div className="px-5 pt-4 pb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Explore</div>
        <NavLink to="/courses" className="sidebar-item">
          <span className="text-lg">🧭</span><span>Browse Courses</span>
        </NavLink>
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-5 py-3.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all"
        >
          <span className="text-lg">🚪</span> Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
