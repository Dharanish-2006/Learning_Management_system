// src/pages/Auth/Login.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import  useAuth  from '../../hooks';
import Button from '../../components/Buttons/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-7">
          <Link to="/" className="text-2xl font-black text-navy no-underline">
            Learn<span className="text-teal">Hub</span>
          </Link>
          <h2 className="text-xl font-bold text-navy mt-4 mb-1">Welcome back!</h2>
          <p className="text-gray-500 text-sm">Sign in to continue learning</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
            ⚠ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="form-label mb-0">Password</label>
              <Link to="/forgot-password" className="text-xs text-teal hover:underline font-medium">Forgot password?</Link>
            </div>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} className="form-input pr-10" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm">
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <Button type="submit" loading={loading} fullWidth className="py-3 text-base mt-2">
            Sign In
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">
            <span>🔵</span> Google
          </button>
          <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">
            <span>🐙</span> GitHub
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-teal font-semibold hover:underline">Sign up free</Link>
        </p>
        <p className="text-center text-xs text-gray-400 mt-2">Demo: enter any email/password and click Sign In</p>
      </div>
    </div>
  );
};
