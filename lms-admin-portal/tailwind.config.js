/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        teal:   { DEFAULT: '#00D4AA', dark: '#00B894', light: '#E6FBF7' },
        navy:   { DEFAULT: '#0F2D4A', dark: '#0a1f33' },
        coral:  { DEFAULT: '#FF6B6B', light: '#FFF0F0' },
        violet: { DEFAULT: '#6C5CE7', light: '#F0EDFF' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
