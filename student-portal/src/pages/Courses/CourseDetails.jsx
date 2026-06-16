import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { courseService } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import { showToast, hideToast } from '../../store';

const Stars = ({ rating }) => <span className="text-amber-400">{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}</span>;

const CourseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [openSection, setOpenSection] = useState(0);

  useEffect(() => {
    courseService.getById(id).then(data => { setCourse(data); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  const handleEnroll = () => {
    dispatch(showToast({ message: '🎉 Enrolled successfully!', type: 'success' }));
    setTimeout(() => dispatch(hideToast()), 3500);
  };

  if (loading) return <Loader center text="Loading course..." />;
  if (!course) return <div className="text-center py-20"><h2 className="text-2xl font-bold text-navy">Course not found</h2><Link to="/courses" className="btn-primary mt-4">Browse Courses</Link></div>;

  const discount = Math.round((1 - course.price / course.originalPrice) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="bg-navy rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden">
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[120px] opacity-20">{course.thumbnail}</div>
        <div className="relative z-10 max-w-2xl">
          <span className="badge badge-teal mb-4">{course.category}</span>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">{course.title}</h1>
          <p className="text-gray-400 mb-6">{course.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6">
            <span className="flex items-center gap-1"><Stars rating={course.rating} /> <span className="text-amber-400 font-bold">{course.rating}</span> ({course.reviews.toLocaleString()} reviews)</span>
            <span>👥 {course.students.toLocaleString()} students</span>
            <span>⏱️ {course.duration}</span>
            <span>📊 {course.level}</span>
            <span>📖 {course.lessons} lessons</span>
          </div>
          <p className="text-gray-400 text-sm">Created by <span className="text-teal font-semibold">{course.instructor}</span></p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6">
            {['overview', 'curriculum', 'instructor'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold capitalize transition-all ${activeTab === tab ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}>{tab}</button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-lg font-extrabold text-navy mb-4">What you'll learn</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.outcomes.map((o, i) => <div key={i} className="flex items-start gap-2 text-sm"><span className="text-teal font-bold mt-0.5">✓</span><span className="text-gray-600">{o}</span></div>)}
                </div>
              </div>
              <div className="card">
                <h2 className="text-lg font-extrabold text-navy mb-3">About this course</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {course.tags.map(tag => <span key={tag} className="badge badge-gray">#{tag}</span>)}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div className="card">
              <h2 className="text-lg font-extrabold text-navy mb-4">Course Curriculum</h2>
              <p className="text-sm text-gray-500 mb-4">{course.lessons} lessons · {course.duration} total</p>
              <div className="space-y-2">
                {course.curriculum.map((section, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={() => setOpenSection(openSection === i ? -1 : i)} className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left">
                      <span className="font-semibold text-navy text-sm">{section.title}</span>
                      <span className="text-gray-400 text-xs">{section.lessons.length} lessons {openSection === i ? '▲' : '▼'}</span>
                    </button>
                    {openSection === i && (
                      <div className="divide-y divide-gray-100">
                        {section.lessons.map((lesson, j) => (
                          <div key={j} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
                            <span className="text-teal">▶</span> {lesson}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'instructor' && (
            <div className="card">
              <h2 className="text-lg font-extrabold text-navy mb-4">Your Instructor</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-teal-light text-teal-dark text-xl font-black flex items-center justify-center">{course.instructor.split(' ').map(n => n[0]).join('')}</div>
                <div><div className="font-extrabold text-navy">{course.instructor}</div><div className="text-sm text-teal">{course.category} Expert</div></div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{course.instructorBio}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <div className="text-center p-4 bg-gray-50 rounded-xl mb-4">
              <div className="text-4xl mb-2">{course.thumbnail}</div>
            </div>
            <div className="mb-4">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-extrabold text-navy">₹{course.price.toLocaleString()}</span>
                <span className="text-gray-400 line-through text-lg">₹{course.originalPrice.toLocaleString()}</span>
                <span className="badge badge-red">{discount}% OFF</span>
              </div>
            </div>
            {course.enrolled ? (
              <Link to="/dashboard/my-courses" className="btn-primary w-full justify-center py-3 text-base mb-3">Continue Learning →</Link>
            ) : (
              <button onClick={handleEnroll} className="btn-primary w-full justify-center py-3 text-base mb-3">Enroll Now</button>
            )}
            <button className="btn-outline w-full justify-center py-2.5 mb-4">Add to Wishlist</button>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2"><span>📖</span> {course.lessons} lessons</div>
              <div className="flex items-center gap-2"><span>⏱️</span> {course.duration} of content</div>
              <div className="flex items-center gap-2"><span>📊</span> {course.level}</div>
              <div className="flex items-center gap-2"><span>♾️</span> Lifetime access</div>
              <div className="flex items-center gap-2"><span>🏆</span> Certificate of completion</div>
              <div className="flex items-center gap-2"><span>📱</span> Access on mobile & desktop</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
