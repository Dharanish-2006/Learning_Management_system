// src/pages/Courses/CourseList.jsx
import { useState, useEffect } from 'react';
import CourseCard from '../../components/CourseCard/CourseCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loader from '../../components/Loader/Loader';
import { courseService } from '../../services/api';
import { CATEGORIES } from '../../utils/mockData';

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
];

const PER_PAGE = 6;

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('popular');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    courseService.getAll({ category, search, sort, page, limit: PER_PAGE }).then(data => {
      setCourses(data.courses);
      setTotalPages(data.totalPages);
      setTotal(data.total);
      setLoading(false);
    });
  }, [category, search, sort, page]);

  const handleSearch = (q) => { setSearch(q); setPage(1); };
  const handleCategory = (cat) => { setCategory(cat); setPage(1); };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="page-title mb-1">All Courses</h1>
        <p className="page-subtitle">{total} courses available</p>
      </div>

      {/* Search + Sort bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 shadow-sm">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search courses, instructors..."
          className="mb-4"
        />
        <div className="flex flex-wrap items-center gap-3">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2 flex-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-3 py-1.5 rounded-full border font-semibold text-xs transition-all ${
                  category === cat
                    ? 'border-teal bg-teal-light text-teal-dark'
                    : 'border-gray-200 text-gray-500 hover:border-teal hover:text-teal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Sort dropdown */}
          <select
            value={sort}
            onChange={e => { setSort(e.target.value); setPage(1); }}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 outline-none focus:border-teal cursor-pointer"
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Active filters bar */}
      {(search || category !== 'All') && (
        <div className="flex items-center gap-3 mb-5 text-sm">
          <span className="text-gray-500">Active filters:</span>
          {category !== 'All' && (
            <span className="badge badge-teal flex items-center gap-1.5">
              {category}
              <button onClick={() => handleCategory('All')} className="text-teal-dark hover:text-red-600 ml-1">✕</button>
            </span>
          )}
          {search && (
            <span className="badge badge-navy flex items-center gap-1.5">
              "{search}"
              <button onClick={() => { setSearch(''); }} className="ml-1">✕</button>
            </span>
          )}
          <button onClick={() => { setSearch(''); setCategory('All'); setSort('popular'); setPage(1); }}
            className="text-red-500 hover:underline text-xs">Clear all</button>
        </div>
      )}

      {/* Course grid */}
      {loading ? (
        <Loader center text="Loading courses..." />
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => <CourseCard key={course.id} course={course} />)}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-navy mb-2">No courses found</h3>
          <p className="text-sm">Try different search terms or remove filters</p>
          <button onClick={() => { setSearch(''); setCategory('All'); }} className="btn-primary mt-5">Browse All Courses</button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold disabled:opacity-40 hover:border-teal hover:text-teal transition-all"
          >← Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                page === n ? 'bg-teal text-white' : 'border border-gray-200 hover:border-teal hover:text-teal'
              }`}
            >{n}</button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold disabled:opacity-40 hover:border-teal hover:text-teal transition-all"
          >Next →</button>
        </div>
      )}
    </div>
  );
};

export default CourseList;
