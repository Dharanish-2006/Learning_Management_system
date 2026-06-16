import { useState } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector(s => s.auth);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'Arjun Joshi',
    email: user?.email || 'arjun.j@gmail.com',
    phone: '+91 98765 43210',
    bio: 'Full Stack Developer passionate about continuous learning and building scalable products.',
    location: 'Bangalore, India',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await new Promise(r => setTimeout(r, 600));
    setEditing(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (k, v) => setProfile(f => ({ ...f, [k]: v }));
  const initials = profile.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="animate-fade-in max-w-4xl">
      <div className="mb-6"><h1 className="page-title">Profile Settings</h1><p className="page-subtitle">Manage your account information and preferences</p></div>
      {saved && <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-4 flex items-center gap-2">✅ Profile updated successfully!</div>}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="w-24 h-24 rounded-full bg-teal-light text-teal-dark font-black text-3xl flex items-center justify-center mx-auto mb-4">{initials}</div>
          <h2 className="font-extrabold text-navy text-lg">{profile.name}</h2>
          <p className="text-sm text-gray-400 mb-1">{profile.email}</p>
          <p className="text-xs text-gray-400 mb-4">📍 {profile.location}</p>
          <div className="flex justify-center gap-6 py-4 border-y border-gray-100 mb-4">
            {[['2', 'Courses'], ['47h', 'Learned'], ['1', 'Certs']].map(([v, l]) => (
              <div key={l} className="text-center"><div className="text-lg font-extrabold text-navy">{v}</div><div className="text-xs text-gray-400">{l}</div></div>
            ))}
          </div>
          <button className="btn-outline w-full justify-center btn-sm text-xs">Change Avatar</button>
        </div>
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-extrabold text-navy text-base">Account Information</h3>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="btn-outline btn-sm text-xs">✏ Edit Profile</button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setEditing(false)} className="btn-outline btn-sm text-xs">Cancel</button>
                <button onClick={handleSave} className="btn-primary btn-sm text-xs">Save Changes</button>
              </div>
            )}
          </div>
          {editing ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {[['Full Name', 'name', 'text', 'Your full name'], ['Email Address', 'email', 'email', 'your@email.com'], ['Phone Number', 'phone', 'tel', '+91 XXXXX XXXXX'], ['Location', 'location', 'text', 'City, Country']].map(([label, key, type, placeholder]) => (
                <div key={key}><label className="form-label">{label}</label><input type={type} className="form-input" placeholder={placeholder} value={profile[key]} onChange={e => update(key, e.target.value)} /></div>
              ))}
              <div className="sm:col-span-2"><label className="form-label">Bio</label><textarea className="form-input resize-none" placeholder="Tell us about yourself..." value={profile.bio} onChange={e => update('bio', e.target.value)} rows={3} /></div>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {[['👤', 'Full Name', profile.name], ['📧', 'Email', profile.email], ['📱', 'Phone', profile.phone], ['📍', 'Location', profile.location], ['📝', 'Bio', profile.bio]].map(([icon, label, value]) => (
                <div key={label} className="py-3.5 flex gap-3">
                  <span className="text-lg w-7">{icon}</span>
                  <div><div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</div><div className="text-sm text-navy">{value}</div></div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card lg:col-span-3">
          <h3 className="font-extrabold text-navy text-base mb-4">Security</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[{ icon: '🔑', title: 'Change Password', desc: 'Update your account password regularly' }, { icon: '📱', title: 'Two-Factor Auth', desc: 'Add an extra layer of security to your account' }, { icon: '🔔', title: 'Notifications', desc: 'Manage your email and push notification preferences' }].map(item => (
              <div key={item.title} className="border border-gray-200 rounded-xl p-4 hover:border-teal transition-colors cursor-pointer">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-semibold text-sm text-navy mb-1">{item.title}</div>
                <div className="text-xs text-gray-400 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

