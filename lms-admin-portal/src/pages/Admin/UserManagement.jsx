import { useState, useEffect } from 'react';
import { adminUserService } from '../../services/api';
import { useToast } from '../../hooks';
import Loader from '../../components/Loader/Loader';
import ConfirmModal from '../../components/Modal/ConfirmModal';

export default function UserManagement() {
  const { show } = useToast();
  const [users,    setUsers]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [statusF,  setStatusF]  = useState('all');
  const [delModal, setDelModal] = useState(null);
  const [viewUser, setViewUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    const { users: data } = await adminUserService.getAll({ search, status: statusF });
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, [search, statusF]);

  const handleBlock = async (id, currentStatus) => {
    const isBlocking = currentStatus === 'active';
    if (isBlocking) await adminUserService.block(id);
    else            await adminUserService.unblock(id);
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: isBlocking ? 'blocked' : 'active' } : u));
    show(isBlocking ? 'User blocked.' : 'User unblocked!', isBlocking ? 'warning' : 'success');
  };

  const handleDelete = async () => {
    await adminUserService.delete(delModal);
    setUsers(prev => prev.filter(u => u.id !== delModal));
    show('User deleted.', 'info');
    setDelModal(null);
  };

  const activeCount  = users.filter(u => u.status === 'active').length;
  const blockedCount = users.filter(u => u.status === 'blocked').length;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">{users.length} users · {activeCount} active · {blockedCount} blocked</p>
        </div>
        <div className="flex gap-3">
          <span className="badge badge-green text-xs py-1.5 px-3">{activeCount} Active</span>
          <span className="badge badge-red   text-xs py-1.5 px-3">{blockedCount} Blocked</span>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-5">
        <div className="flex flex-wrap gap-3">
          <input
            type="text" placeholder="Search by name or email…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="form-input flex-1 min-w-56"
          />
          <select value={statusF} onChange={e => setStatusF(e.target.value)} className="form-select w-36">
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? <Loader center text="Loading users…" /> : (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-th">User</th>
                  <th className="table-th">Joined</th>
                  <th className="table-th">Courses</th>
                  <th className="table-th">Total Spent</th>
                  <th className="table-th">Status</th>
                  <th className="table-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-16 text-gray-400">
                    <div className="text-4xl mb-2">👥</div>
                    <p className="font-semibold">No users found</p>
                  </td></tr>
                ) : users.map(u => (
                  <tr key={u.id} className="table-row">
                    <td className="table-td">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-teal-light text-teal-dark font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {u.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-navy">{u.name}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-td text-gray-500">{u.joinedDate}</td>
                    <td className="table-td font-medium">{u.courses}</td>
                    <td className="table-td font-semibold text-navy">₹{u.spent.toLocaleString()}</td>
                    <td className="table-td">
                      <span className={`badge ${u.status === 'active' ? 'badge-green' : 'badge-red'}`}>
                        {u.status === 'active' ? '● Active' : '● Blocked'}
                      </span>
                    </td>
                    <td className="table-td">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setViewUser(u)}
                          className="text-xs bg-gray-100 text-gray-600 font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
                          👁 View
                        </button>
                        <button onClick={() => handleBlock(u.id, u.status)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                            u.status === 'active'
                              ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                              : 'bg-green-50 text-green-700 hover:bg-green-100'
                          }`}>
                          {u.status === 'active' ? '🚫 Block' : '✅ Unblock'}
                        </button>
                        <button onClick={() => setDelModal(u.id)}
                          className="text-xs bg-red-50 text-red-600 font-semibold px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {viewUser && (
        <div className="modal-overlay" onClick={() => setViewUser(null)}>
          <div className="modal-box p-0" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-navy">User Details</h2>
              <button onClick={() => setViewUser(null)} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-teal-light text-teal-dark font-bold text-xl flex items-center justify-center">
                  {viewUser.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-navy">{viewUser.name}</h3>
                  <p className="text-gray-500 text-sm">{viewUser.email}</p>
                  <span className={`badge mt-1 ${viewUser.status === 'active' ? 'badge-green' : 'badge-red'}`}>
                    {viewUser.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  ['📅 Joined',  viewUser.joinedDate],
                  ['📚 Courses', viewUser.courses],
                  ['💰 Spent',   `₹${viewUser.spent.toLocaleString()}`],
                  ['🎭 Role',    'Student'],
                ].map(([k, v]) => (
                  <div key={k} className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">{k}</p>
                    <p className="font-bold text-navy">{v}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => { handleBlock(viewUser.id, viewUser.status); setViewUser(null); }}
                  className={`flex-1 justify-center inline-flex font-semibold px-4 py-2.5 rounded-lg text-sm transition-all ${
                    viewUser.status === 'active' ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}>
                  {viewUser.status === 'active' ? '🚫 Block User' : '✅ Unblock User'}
                </button>
                <button onClick={() => { setDelModal(viewUser.id); setViewUser(null); }}
                  className="flex-1 justify-center inline-flex btn-danger">
                  🗑️ Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      <ConfirmModal
        open={!!delModal}
        title="Delete this user?"
        message="This will permanently remove the user and all their enrollment history."
        onConfirm={handleDelete}
        onCancel={() => setDelModal(null)}
      />
    </div>
  );
}
