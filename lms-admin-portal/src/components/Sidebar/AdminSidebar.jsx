import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store';

const NAV = [
  { icon: '📊', label: 'Dashboard',        to: '/dashboard'         },
  { icon: '📚', label: 'Courses',          to: '/dashboard/courses' },
  { icon: '👥', label: 'Users',            to: '/dashboard/users'   },
  { icon: '📈', label: 'Analytics',        to: '/dashboard/analytics'},
];

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(s => s.auth);

  const handleLogout = () => { dispatch(logout()); navigate('/login'); };

  return (
    <aside className="w-60 min-h-screen bg-navy flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="text-xl font-extrabold text-white">
          Learn<span className="text-teal">Hub</span>
          <span className="ml-2 text-xs bg-teal/20 text-teal px-2 py-0.5 rounded-full font-semibold">Admin</span>
        </div>
      </div>

      {/* Admin info */}
      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-light text-teal-dark font-bold flex items-center justify-center text-sm">
            {user?.avatar || 'A'}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white truncate">{user?.name || 'Admin'}</div>
            <div className="text-xs text-teal">{user?.role || 'Administrator'}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-0.5">
        <div className="px-4 pb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Main Menu</div>
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
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 p-2">
        <NavLink to="/dashboard/settings" className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''} mb-0.5`}>
          <span className="text-lg">⚙️</span><span>Settings</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 text-sm font-medium rounded-lg transition-all mx-0"
        >
          <span className="text-lg">🚪</span> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
