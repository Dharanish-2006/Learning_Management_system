// src/pages/Dashboard/MyCourses.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardService } from '../../services/api';
import Loader from '../../components/Loader/Loader';

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService.getMyCourses().then(data => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader center text="Loading your courses..." />;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="page-title">My Courses</h1>
        <p className="page-subtitle">
          {courses.length} course{courses.length !== 1 ? 's' : ''} enrolled
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-bold text-navy mb-2">No courses yet</h3>
          <p className="text-sm mb-5">Browse our catalog to start your learning journey</p>
          <Link to="/courses" className="btn-primary">Browse Courses</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map(c => (
            <div key={c.id} className="card flex flex-col">
              <div
                className="h-36 rounded-xl flex items-center justify-center text-5xl mb-4"
                style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}99)` }}
              >
                {c.thumbnail}
              </div>
              <span className="badge badge-teal mb-2">{c.category}</span>
              <h3 className="font-bold text-sm text-navy leading-snug mb-1 line-clamp-2">{c.title}</h3>
              <p className="text-xs text-gray-400 mb-4">{c.instructor}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>{c.progress === 100 ? '✅ Completed!' : `${c.progress}% complete`}</span>
                  <span>{c.lessons} lessons</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${c.progress}%` }} />
                </div>
              </div>

              <div className="mt-auto flex gap-2">
                <Link
                  to={`/courses/${c.id}`}
                  className="btn-primary btn-sm flex-1 justify-center text-xs"
                >
                  {c.progress === 100 ? 'Review Course' : '▶ Continue'}
                </Link>
                {c.progress === 100 && (
                  <button className="btn-outline btn-sm text-xs">🏆 Certificate</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
