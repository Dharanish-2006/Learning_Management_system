// src/components/CourseCard/CourseCard.jsx
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showToast, hideToast } from '../../store';

const Stars = ({ rating }) => {
  const full = Math.floor(rating);
  return (
    <span className="text-amber-400 text-sm">
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </span>
  );
};

const CourseCard = ({ course, onEnroll, compact = false }) => {
  const dispatch = useDispatch();
  const discount = Math.round((1 - course.price / course.originalPrice) * 100);

  const handleEnroll = (e) => {
    e.preventDefault();
    if (onEnroll) { onEnroll(course); return; }
    dispatch(showToast({ message: 'Course added to cart! 🛒', type: 'success' }));
    setTimeout(() => dispatch(hideToast()), 3500);
  };

  return (
    <Link to={`/courses/${course.id}`} className="block group">
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-250 h-full flex flex-col">
        {/* Thumbnail */}
        <div
          className="h-44 flex items-center justify-center text-6xl relative"
          style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}CC)` }}
        >
          {course.thumbnail}
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {discount}% OFF
            </span>
          )}
          {course.enrolled && (
            <span className="absolute top-3 right-3 bg-teal text-white text-xs font-bold px-2 py-1 rounded-full">
              Enrolled
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col flex-1">
          <span className="badge badge-teal mb-2">{course.category}</span>
          <h3 className="text-sm font-bold text-navy leading-snug mb-1 line-clamp-2 group-hover:text-teal transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-gray-500 mb-2">{course.instructor} · {course.level} · {course.duration}</p>

          <div className="flex items-center gap-2 mb-3">
            <Stars rating={course.rating} />
            <span className="text-xs font-bold text-amber-600">{course.rating}</span>
            <span className="text-xs text-gray-400">({course.reviews.toLocaleString()})</span>
          </div>

          {/* Progress bar if enrolled */}
          {course.enrolled && course.progress > 0 && (
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span><span className="font-semibold">{course.progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
          )}

          <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              <span className="text-lg font-extrabold text-navy">₹{course.price.toLocaleString()}</span>
              <span className="text-xs text-gray-400 line-through ml-2">₹{course.originalPrice.toLocaleString()}</span>
            </div>
            {course.enrolled ? (
              <span className="btn-primary btn-sm text-xs">Continue →</span>
            ) : (
              <button
                onClick={handleEnroll}
                className="btn-primary btn-sm text-xs"
              >
                Enroll
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
