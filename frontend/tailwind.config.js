/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#0460D9',
          light: '#5EADF2',
          dark: '#034EB0'
        },
        secondary: {
          main: '#0476D9',
          light: '#99D9F2',
          dark: '#035AA3'
        },
        accent: {
          main: '#F29C50',
          light: '#F5B47A',
          dark: '#D98231'
        },
        success: {
          main: '#4CAF50',
          light: '#81C784',
          dark: '#388E3C'
        },
        warning: {
          main: '#FF9800',
          light: '#FFB74D',
          dark: '#F57C00'
        },
        error: {
          main: '#F44336',
          light: '#E57373',
          dark: '#D32F2F'
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
  important: '#root',
};