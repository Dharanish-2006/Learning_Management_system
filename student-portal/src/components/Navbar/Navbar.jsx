// src/components/Navbar/Navbar.jsx
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { logout } from '../../store';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { dispatch(logout()); navigate('/'); };

  return (
    <nav className="bg-navy sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-extrabold text-white no-underline">
            Learn<span className="text-teal">Hub</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={({ isActive }) => `nav-link px-3 py-2 rounded-lg ${isActive ? 'text-teal' : ''}`}>Home</NavLink>
            <NavLink to="/courses" className={({ isActive }) => `nav-link px-3 py-2 rounded-lg ${isActive ? 'text-teal' : ''}`}>Courses</NavLink>
            {isAuthenticated && (
              <NavLink to="/dashboard" className={({ isActive }) => `nav-link px-3 py-2 rounded-lg ${isActive ? 'text-teal' : ''}`}>Dashboard</NavLink>
            )}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard/profile" className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-teal-light text-teal-dark font-bold text-sm flex items-center justify-center">
                    {user?.avatar || 'U'}
                  </div>
                </Link>
                <button onClick={handleLogout} className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white text-sm font-semibold transition-colors">Log In</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">Sign Up Free</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy/95 border-t border-white/10 px-4 py-4 flex flex-col gap-2">
          <Link to="/" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-white py-2 font-medium">Home</Link>
          <Link to="/courses" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-white py-2 font-medium">Courses</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-white py-2 font-medium">Dashboard</Link>
              <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-gray-300 hover:text-white py-2 font-medium text-left">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-white py-2 font-medium">Log In</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary py-2 text-center mt-2">Sign Up Free</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
