// src/components/SearchBar/SearchBar.jsx
import { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = 'Search...', className = '' }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(value);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    onSearch?.(e.target.value); // live search
  };

  return (
    <form onSubmit={handleSubmit} className={`flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:border-teal transition-colors ${className}`}>
      <span className="flex items-center px-4 text-gray-400 text-lg">🔍</span>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="flex-1 py-3 pr-2 text-sm text-gray-700 outline-none bg-transparent"
      />
      <button
        type="submit"
        className="bg-teal text-white px-6 py-3 font-semibold text-sm hover:bg-teal-dark transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
