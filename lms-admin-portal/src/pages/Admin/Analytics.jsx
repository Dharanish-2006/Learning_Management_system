import { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area,
} from 'recharts';
import { adminAnalyticsService } from '../../services/api';
import Loader from '../../components/Loader/Loader';

const COLORS = ['#00D4AA','#6C5CE7','#0F2D4A','#FF6B6B','#F59E0B'];

const Card = ({ title, children, className = '' }) => (
  <div className={`card ${className}`}>
    <h3 className="text-base font-extrabold text-navy mb-5">{title}</h3>
    {children}
  </div>
);

const fmtRevenue = v => v >= 100000 ? `₹${(v/100000).toFixed(1)}L` : `₹${(v/1000).toFixed(0)}K`;

export default function Analytics() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [range,   setRange]   = useState('12m');   // '3m' | '6m' | '12m'

  useEffect(() => {
    adminAnalyticsService.getAll().then(d => { setData(d); setLoading(false); });
  }, []);

  if (loading) return <Loader center text="Loading analytics…" />;

  const sliceMap = { '3m': 3, '6m': 6, '12m': 12 };
  const slice = n => data.userGrowth.slice(-sliceMap[n]).map((_, i, arr) => arr[i]);
  const ugData  = data.userGrowth.slice(-sliceMap[range]);
  const enData  = data.enrollments.slice(-sliceMap[range]);
  const revData = data.revenue.slice(-sliceMap[range]);

  const totalRev = revData.reduce((a, r) => a + r.revenue, 0);
  const totalEnr = enData.reduce((a, r) => a + r.enrollments, 0);
  const totalUsr = ugData[ugData.length - 1]?.users ?? 0;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Platform performance overview</p>
        </div>
        {/* Range picker */}
        <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {['3m','6m','12m'].map(r => (
            <button key={r} onClick={() => setRange(r)}
              className={`px-4 py-2 text-sm font-semibold transition-all ${range === r ? 'bg-navy text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              {r === '3m' ? 'Last 3M' : r === '6m' ? 'Last 6M' : 'Full Year'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        {[
          { label:'Total Users',       value: totalUsr.toLocaleString(),    icon:'👥', color:'#00D4AA' },
          { label:'Total Enrollments', value: totalEnr.toLocaleString(),    icon:'🎓', color:'#6C5CE7' },
          { label:'Revenue (Period)',   value: fmtRevenue(totalRev),         icon:'💰', color:'#F59E0B' },
        ].map(k => (
          <div key={k.label} className="stat-card" style={{ borderLeftColor: k.color }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: k.color + '20' }}>{k.icon}</div>
              <div>
                <p className="text-2xl font-extrabold text-navy">{k.value}</p>
                <p className="text-xs text-gray-500">{k.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 1: Area + Bar */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card title="User Growth">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={ugData} margin={{ top:4, right:8, left:-10, bottom:0 }}>
              <defs>
                <linearGradient id="ugGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#00D4AA" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#00D4AA" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize:11 }} />
              <YAxis tick={{ fontSize:11 }} />
              <Tooltip formatter={v => [v.toLocaleString(), 'Users']} />
              <Area type="monotone" dataKey="users" stroke="#00D4AA" strokeWidth={2.5} fill="url(#ugGrad)" dot={false} activeDot={{ r:4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Course Enrollments">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={enData} margin={{ top:4, right:8, left:-10, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize:11 }} />
              <YAxis tick={{ fontSize:11 }} />
              <Tooltip formatter={v => [v.toLocaleString(), 'Enrollments']} />
              <Bar dataKey="enrollments" fill="#6C5CE7" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Row 2: Revenue line + Pie */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card title="Revenue Trend" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revData} margin={{ top:4, right:8, left:0, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize:11 }} />
              <YAxis tick={{ fontSize:11 }} tickFormatter={fmtRevenue} />
              <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={2.5} dot={false} activeDot={{ r:4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Category Breakdown">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={data.categoryBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={40} paddingAngle={3}>
                {data.categoryBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color || COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={v => [`${v}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {data.categoryBreakdown.map((c, i) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.color || COLORS[i % COLORS.length] }} />
                  <span className="text-gray-600">{c.name}</span>
                </div>
                <span className="font-bold text-navy">{c.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 3: Popular courses horizontal bar */}
      <Card title="Most Popular Courses (by Students)">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data.popularCourses} layout="vertical" margin={{ top:0, right:20, left:60, bottom:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
            <XAxis type="number" tick={{ fontSize:11 }} tickFormatter={v => v.toLocaleString()} />
            <YAxis type="category" dataKey="name" tick={{ fontSize:11 }} width={60} />
            <Tooltip formatter={v => [v.toLocaleString(), 'Students']} />
            <Bar dataKey="students" radius={[0,4,4,0]}>
              {data.popularCourses.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
