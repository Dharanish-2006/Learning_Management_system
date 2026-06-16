import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useToast } from '../../hooks';

export default function Settings() {
  const { user }   = useSelector(s => s.auth);
  const { show }   = useToast();
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name:  user?.name  || 'Sneha Kapoor',
    email: user?.email || 'admin@learnhub.com',
    role:  user?.role  || 'Super Admin',
    phone: '+91 98765 43210',
  });
  const [notifications, setNotifications] = useState({
    newUser: true, newEnrollment: true, revenueAlert: false, weeklyReport: true,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    setSaving(false);
    show('Settings saved!', 'success');
  };

  const upd = (k, v) => setProfile(f => ({ ...f, [k]: v }));

  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="mb-6">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your admin account and portal preferences</p>
      </div>

      {/* Profile */}
      <div className="card mb-5">
        <h2 className="text-base font-extrabold text-navy mb-5">Admin Profile</h2>
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100">
          <div className="w-16 h-16 rounded-full bg-teal-light text-teal-dark font-black text-2xl flex items-center justify-center">
            {profile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-bold text-navy">{profile.name}</p>
            <p className="text-sm text-gray-400">{profile.role}</p>
            <button className="mt-1.5 text-xs text-teal font-medium hover:underline">Change avatar</button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[['Full Name','name','text'],['Email','email','email'],['Phone','phone','tel'],['Role','role','text']].map(([label, key, type]) => (
            <div key={key}>
              <label className="form-label">{label}</label>
              <input type={type} className="form-input" value={profile[key]} onChange={e => upd(key, e.target.value)} />
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="card mb-5">
        <h2 className="text-base font-extrabold text-navy mb-5">Notification Preferences</h2>
        <div className="space-y-4">
          {[
            ['newUser',       'New user sign-ups',          'Get notified when a new student registers'],
            ['newEnrollment', 'New course enrollments',     'Alert when someone enrolls in a course'],
            ['revenueAlert',  'Revenue milestones',         'Notify on significant revenue events'],
            ['weeklyReport',  'Weekly summary report',      'Receive a weekly digest every Monday'],
          ].map(([key, label, desc]) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-semibold text-navy">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
              <button
                onClick={() => setNotifications(n => ({ ...n, [key]: !n[key] }))}
                className={`relative w-11 h-6 rounded-full transition-colors ${notifications[key] ? 'bg-teal' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications[key] ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="card mb-6">
        <h2 className="text-base font-extrabold text-navy mb-5">Security</h2>
        <div className="space-y-3">
          <div>
            <label className="form-label">Current Password</label>
            <input type="password" className="form-input" placeholder="••••••••" />
          </div>
          <div>
            <label className="form-label">New Password</label>
            <input type="password" className="form-input" placeholder="••••••••" />
          </div>
          <div>
            <label className="form-label">Confirm New Password</label>
            <input type="password" className="form-input" placeholder="••••••••" />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : null}
          Save Changes
        </button>
        <button className="btn-outline">Discard</button>
      </div>
    </div>
  );
}
