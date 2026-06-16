import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AuthLayout = () => {
  const { isAuthenticated } = useSelector(s => s.auth);
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-navy flex">
      {/* Left panel — brand */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 bg-navy/95 p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-teal/5 border border-teal/10" />
        <div className="absolute -bottom-32 -right-16 w-80 h-80 rounded-full bg-teal/5 border border-teal/10" />

        {/* Logo */}
        <div className="relative z-10 text-2xl font-extrabold text-white">
          Learn<span className="text-teal">Hub</span>
          <span className="ml-2 text-xs bg-teal/20 text-teal px-2 py-0.5 rounded-full">Admin</span>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <div className="text-5xl mb-6">🎓</div>
          <h2 className="text-3xl font-black text-white leading-tight mb-4">
            Manage your<br /><span className="text-teal">learning platform</span><br />with confidence
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Full control over courses, users, and analytics.<br />
            Everything you need to run LearnHub efficiently.
          </p>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { num:'18K+', label:'Active Students' },
              { num:'8',    label:'Live Courses'    },
              { num:'596K', label:'Enrollments'     },
              { num:'₹1Cr', label:'Revenue / Month' },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-2xl font-black text-teal">{s.num}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-gray-600">© 2024 LearnHub Technologies Pvt. Ltd.</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-100">
        <Outlet />
      </div>
    </div>
  );
};
