import { useState, useEffect } from 'react';
import { adminCourseService } from '../../services/api';
import { useToast } from '../../hooks';
import { CATEGORIES } from '../../utils/mockData';
import Loader from '../../components/Loader/Loader';
import ConfirmModal from '../../components/Modal/ConfirmModal';

const EMPTY_FORM = { title:'', instructor:'', category:'Programming', price:'', originalPrice:'', duration:'', lessons:'', status:'draft', description:'', thumbnail:'📚' };
const THUMBNAILS = ['📚','🐍','🤖','🌐','☁️','🎨','⚛️','📈','🗄️','🔐','🎯','💡'];

export default function CourseManagement() {
  const { show } = useToast();
  const [courses,  setCourses]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [statusF,  setStatusF]  = useState('all');
  const [catF,     setCatF]     = useState('all');
  const [modal,    setModal]    = useState(false);      // create/edit modal
  const [editing,  setEditing]  = useState(null);       // course being edited
  const [form,     setForm]     = useState(EMPTY_FORM);
  const [saving,   setSaving]   = useState(false);
  const [delModal, setDelModal] = useState(null);       // course id to delete

  const fetchCourses = async () => {
    setLoading(true);
    const { courses: data } = await adminCourseService.getAll({ search, status: statusF, category: catF });
    setCourses(data);
    setLoading(false);
  };

  useEffect(() => { fetchCourses(); }, [search, statusF, catF]);

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setModal(true); };
  const openEdit   = c  => { setEditing(c); setForm({ ...c, price: String(c.price), originalPrice: String(c.originalPrice), lessons: String(c.lessons) }); setModal(true); };

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), originalPrice: Number(form.originalPrice), lessons: Number(form.lessons) };
      if (editing) {
        await adminCourseService.update(editing.id, payload);
        show('Course updated successfully!', 'success');
        setCourses(prev => prev.map(c => c.id === editing.id ? { ...c, ...payload } : c));
      } else {
        const created = await adminCourseService.create(payload);
        show('Course created successfully!', 'success');
        setCourses(prev => [created, ...prev]);
      }
      setModal(false);
    } catch { show('Something went wrong', 'error'); }
    setSaving(false);
  };

  const handleDelete = async () => {
    await adminCourseService.delete(delModal);
    setCourses(prev => prev.filter(c => c.id !== delModal));
    show('Course deleted.', 'info');
    setDelModal(null);
  };

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title">Course Management</h1>
          <p className="page-subtitle">{courses.length} courses total</p>
        </div>
        <button onClick={openCreate} className="btn-primary">+ Create Course</button>
      </div>

      {/* Filters */}
      <div className="card mb-5">
        <div className="flex flex-wrap gap-3">
          <input
            type="text" placeholder="Search courses or instructors…"
            value={search} onChange={e => setSearch(e.target.value)}
            className="form-input flex-1 min-w-48"
          />
          <select value={statusF} onChange={e => setStatusF(e.target.value)} className="form-select w-36">
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select value={catF} onChange={e => setCatF(e.target.value)} className="form-select w-44">
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? <Loader center text="Loading courses…" /> : (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-th">Course</th>
                  <th className="table-th">Category</th>
                  <th className="table-th">Price</th>
                  <th className="table-th">Students</th>
                  <th className="table-th">Rating</th>
                  <th className="table-th">Status</th>
                  <th className="table-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-16 text-gray-400">
                    <div className="text-4xl mb-2">📭</div>
                    <p className="font-semibold">No courses found</p>
                  </td></tr>
                ) : courses.map(c => (
                  <tr key={c.id} className="table-row">
                    <td className="table-td">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">{c.thumbnail}</div>
                        <div>
                          <p className="font-semibold text-navy text-sm leading-tight">{c.title}</p>
                          <p className="text-xs text-gray-400">{c.instructor} · {c.duration}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-td"><span className="badge badge-teal">{c.category}</span></td>
                    <td className="table-td">
                      <p className="font-bold text-navy">₹{c.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-400 line-through">₹{c.originalPrice.toLocaleString()}</p>
                    </td>
                    <td className="table-td font-medium">{c.students?.toLocaleString() ?? '—'}</td>
                    <td className="table-td">
                      <span className="text-amber-500">★</span> {c.rating || '—'}
                    </td>
                    <td className="table-td">
                      <span className={`badge ${c.status === 'published' ? 'badge-green' : 'badge-amber'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="table-td">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(c)}
                          className="text-xs bg-violet-100 text-violet font-semibold px-3 py-1.5 rounded-lg hover:bg-violet-200 transition-colors">
                          ✏️ Edit
                        </button>
                        <button onClick={() => setDelModal(c.id)}
                          className="text-xs bg-red-50 text-red-600 font-semibold px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
                          🗑️ Delete
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

      {/* Create / Edit Modal */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal-box p-0" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-navy">{editing ? 'Edit Course' : 'Create New Course'}</h2>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-700 text-xl leading-none">✕</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {/* Thumbnail picker */}
              <div>
                <label className="form-label">Thumbnail Icon</label>
                <div className="flex flex-wrap gap-2">
                  {THUMBNAILS.map(t => (
                    <button type="button" key={t} onClick={() => upd('thumbnail', t)}
                      className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center border-2 transition-all ${form.thumbnail === t ? 'border-teal bg-teal-light' : 'border-gray-200 hover:border-teal/50'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label">Course Title *</label>
                <input className="form-input" placeholder="e.g. Complete React Bootcamp" value={form.title} onChange={e => upd('title', e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Instructor *</label>
                  <input className="form-input" placeholder="Instructor name" value={form.instructor} onChange={e => upd('instructor', e.target.value)} required />
                </div>
                <div>
                  <label className="form-label">Category</label>
                  <select className="form-select" value={form.category} onChange={e => upd('category', e.target.value)}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Price (₹) *</label>
                  <input className="form-input" type="number" placeholder="1999" value={form.price} onChange={e => upd('price', e.target.value)} required min={0} />
                </div>
                <div>
                  <label className="form-label">Original Price (₹)</label>
                  <input className="form-input" type="number" placeholder="4999" value={form.originalPrice} onChange={e => upd('originalPrice', e.target.value)} min={0} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Duration</label>
                  <input className="form-input" placeholder="e.g. 22h 30m" value={form.duration} onChange={e => upd('duration', e.target.value)} />
                </div>
                <div>
                  <label className="form-label">Lessons</label>
                  <input className="form-input" type="number" placeholder="185" value={form.lessons} onChange={e => upd('lessons', e.target.value)} min={0} />
                </div>
              </div>
              <div>
                <label className="form-label">Status</label>
                <select className="form-select" value={form.status} onChange={e => upd('status', e.target.value)}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea className="form-input resize-none" rows={3} placeholder="Brief course description…" value={form.description} onChange={e => upd('description', e.target.value)} />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="btn-outline flex-1 justify-center">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
                  {saving ? <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : null}
                  {editing ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      <ConfirmModal
        open={!!delModal}
        title="Delete this course?"
        message="This action cannot be undone. All enrollment data will also be lost."
        onConfirm={handleDelete}
        onCancel={() => setDelModal(null)}
      />
    </div>
  );
}
