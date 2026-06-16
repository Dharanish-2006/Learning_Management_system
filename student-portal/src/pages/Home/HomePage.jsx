// src/pages/Home/HomePage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../../components/CourseCard/CourseCard';
import Loader from '../../components/Loader/Loader';
import { courseService } from '../../services/api';
import { CATEGORIES, TESTIMONIALS, WHY_CHOOSE_US } from '../../utils/mockData';

const STATS = [
  { num: '135K+', label: 'Active Students' },
  { num: '500+', label: 'Expert Courses' },
  { num: '4.8★', label: 'Average Rating' },
  { num: '98%', label: 'Satisfaction Rate' },
];

export default function HomePage(){
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    courseService.getFeatured().then(data => { setFeatured(data); setLoading(false); });
  }, []);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="bg-navy relative overflow-hidden py-24 px-4">
        <div className="absolute top-0 right-0 w-96 h-96 border-8 border-teal/5 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 border-8 border-teal/5 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-teal/15 border border-teal/30 text-teal text-sm font-semibold px-4 py-2 rounded-full mb-6">
            🚀 India's #1 Tech Learning Platform
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-5">
            Learn Skills That<br /><span className="text-teal">Shape Your Future</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Access 500+ expert-led courses in Technology, Data Science, Design & Business.
            Learn at your own pace, earn certificates, and land your dream job.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/courses" className="btn-primary px-8 py-3.5 text-base">Explore Courses →</Link>
            <Link to="/register" className="border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-lg hover:border-teal hover:text-teal transition-all text-base">
              Start Free Today
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-teal">{s.num}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title mb-2">Browse by Category</h2>
            <p className="text-gray-500">Find the perfect course in your area of interest</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full border-2 font-semibold text-sm transition-all ${
                  activeCategory === cat
                    ? 'border-teal bg-teal-light text-teal-dark'
                    : 'border-gray-200 text-gray-600 hover:border-teal hover:text-teal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED COURSES ===== */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title mb-2">Featured Courses</h2>
              <p className="text-gray-500">Handpicked by our expert team</p>
            </div>
            <Link to="/courses" className="text-teal font-semibold text-sm hover:underline">View All →</Link>
          </div>
          {loading ? (
            <Loader center text="Loading courses..." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(course => <CourseCard key={course.id} course={course} />)}
            </div>
          )}
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="bg-navy py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-4xl font-black text-white mb-4">
                Why Choose <span className="text-teal">LearnHub?</span>
              </h2>
              <p className="text-gray-400 text-base leading-relaxed mb-8">
                We partner with the world's top instructors and companies to deliver the most effective,
                up-to-date tech education available — all in one place.
              </p>
              <Link to="/register" className="btn-primary px-7 py-3.5">Get Started Free →</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {WHY_CHOOSE_US.map(item => (
                <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className="text-white font-bold text-sm mb-2">{item.title}</div>
                  <div className="text-gray-400 text-xs leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-2">What Our Students Say</h2>
            <p className="text-gray-500">Join 135K+ learners already transforming their careers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="bg-slate-50 border border-gray-100 rounded-2xl p-6">
                <div className="text-amber-400 text-lg mb-4">★★★★★</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-light text-teal-dark font-bold text-sm flex items-center justify-center">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-navy">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="bg-gradient-to-r from-teal to-teal-dark py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-navy mb-4">Ready to Start Learning?</h2>
          <p className="text-navy/70 mb-8 text-base">Join 135,000+ students. New courses added every week.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="bg-navy text-white font-bold px-8 py-3.5 rounded-lg hover:opacity-90 transition-all">
              Create Free Account
            </Link>
            <Link to="/courses" className="border-2 border-navy text-navy font-bold px-8 py-3.5 rounded-lg hover:bg-navy hover:text-white transition-all">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
