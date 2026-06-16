// src/components/Footer/Footer.jsx
import { Link } from 'react-router-dom';

const LINKS = {
  Company: ['About Us', 'Careers', 'Blog', 'Press Kit'],
  Courses: ['Programming', 'Data Science', 'Web Development', 'Cloud & DevOps'],
  Support: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
};

const Footer = () => (
  <footer className="bg-navy text-white pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <div className="text-2xl font-extrabold mb-4">Learn<span className="text-teal">Hub</span></div>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            Empowering learners worldwide with expert-led courses in technology, design, and business.
          </p>
          <div className="flex gap-3">
            {['🐦', '💼', '📘', '▶️'].map(icon => (
              <button key={icon} className="w-9 h-9 bg-white/10 hover:bg-teal/30 rounded-lg flex items-center justify-center text-lg transition-colors">
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([title, items]) => (
          <div key={title}>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">{title}</h4>
            <ul className="space-y-3">
              {items.map(item => (
                <li key={item}>
                  <span className="text-gray-400 hover:text-teal text-sm cursor-pointer transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="bg-white/5 rounded-2xl p-6 mb-10">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1">
            <h4 className="font-bold mb-1">Get learning tips & new course alerts</h4>
            <p className="text-gray-400 text-sm">Join 50K+ learners getting our weekly digest.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input type="email" placeholder="your@email.com"
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 outline-none focus:border-teal transition-colors" />
            <button className="btn-primary whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">© 2024 LearnHub Technologies Pvt. Ltd. All rights reserved.</p>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Cookies'].map(l => (
            <span key={l} className="text-gray-500 hover:text-teal text-sm cursor-pointer transition-colors">{l}</span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
