import { useState } from 'react';
import { useAdminAuth } from '../../hooks';
import Button from '../../components/Buttons/Button';

export default function AdminLogin() {
  const [email,    setEmail]    = useState('admin@learnhub.com');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { login, loading, error } = useAdminAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="mb-7">
          <div className="w-14 h-14 bg-teal-light rounded-2xl flex items-center justify-center text-2xl mb-4">🔐</div>
          <h1 className="text-2xl font-extrabold text-navy mb-1">Admin Sign In</h1>
          <p className="text-gray-500 text-sm">Access the LearnHub admin panel</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5 flex items-start gap-2">
            <span className="mt-0.5">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Admin Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="admin@learnhub.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="form-label">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                className="form-input pr-12"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm px-1"
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-teal" />
              <span className="text-gray-600">Keep me signed in</span>
            </label>
            <button type="button" className="text-teal font-medium hover:underline">Forgot password?</button>
          </div>

          <Button type="submit" loading={loading} fullWidth className="py-3 text-base mt-2">
            Sign In to Admin Panel
          </Button>
        </form>

        {/* Demo hint */}
        <div className="mt-5 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-xs text-gray-500 font-medium mb-1">🧪 Demo credentials</p>
          <p className="text-xs text-gray-400">Email: <span className="font-mono text-navy">admin@learnhub.com</span></p>
          <p className="text-xs text-gray-400">Password: <span className="font-mono text-navy">any value</span></p>
        </div>

        {/* Link to student portal */}
        <p className="text-center text-xs text-gray-400 mt-5">
          Not an admin?{' '}
          <a href="http://localhost:3000/login" className="text-teal font-medium hover:underline">Go to Student Portal →</a>
        </p>
      </div>
    </div>
  );
}
