import { useState } from "react";
import useAuth from "../../hooks";
import { Link } from 'react-router-dom';
import Button from "../../components/Buttons/Button";
export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const { register, loading, error } = useAuth();

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return;
    await register({ name: form.name, email: form.email, password: form.password });
  };

  const strength = form.password.length >= 8 ? 'strong' : form.password.length >= 5 ? 'medium' : form.password ? 'weak' : '';

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-7">
          <Link to="/" className="text-2xl font-black text-navy no-underline">
            Learn<span className="text-teal">Hub</span>
          </Link>
          <h2 className="text-xl font-bold text-navy mt-4 mb-1">Create your account</h2>
          <p className="text-gray-500 text-sm">Join 135K+ learners today — it's free</p>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">⚠ {error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" placeholder="Your full name"
              value={form.name} onChange={e => update('name', e.target.value)} required />
          </div>
          <div>
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" placeholder="you@example.com"
              value={form.email} onChange={e => update('email', e.target.value)} required />
          </div>
          <div>
            <label className="form-label">Password</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} className="form-input pr-10" placeholder="Create a strong password"
                value={form.password} onChange={e => update('password', e.target.value)} required />
              <button type="button" onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
            {strength && (
              <div className="mt-1.5 flex items-center gap-2">
                <div className={`h-1.5 w-20 rounded-full ${strength === 'strong' ? 'bg-green-500' : strength === 'medium' ? 'bg-amber-400' : 'bg-red-400'}`} />
                <span className="text-xs text-gray-400 capitalize">{strength}</span>
              </div>
            )}
          </div>
          <div>
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-input" placeholder="Repeat your password"
              value={form.confirm} onChange={e => update('confirm', e.target.value)} required />
            {form.confirm && form.password !== form.confirm && (
              <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
            )}
          </div>

          <Button type="submit" loading={loading} fullWidth className="py-3 text-base mt-1"
            disabled={form.password !== form.confirm && !!form.confirm}>
            Create Account
          </Button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          By signing up you agree to our{' '}
          <span className="text-teal cursor-pointer">Terms</span> &{' '}
          <span className="text-teal cursor-pointer">Privacy Policy</span>
        </p>
        <p className="text-center text-sm text-gray-500 mt-3">
          Already have an account?{' '}
          <Link to="/login" className="text-teal font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};