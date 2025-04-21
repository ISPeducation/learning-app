/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables manual class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#4F8EF7',
          DEFAULT: '#2563EB',
          dark: '#1E3A8A',
        },
        accent: {
          light: '#FBBF24',
          DEFAULT: '#F59E0B',
          dark: '#B45309',
        },
        background: {
          light: '#F3F4F6',
          dark: '#1F2937',
        },
        text: {
          light: '#1F2937',
          dark: '#F3F4F6',
        },
      },
      transitionProperty: {
        colors: 'color, background-color, border-color, text-decoration-color, fill, stroke',
      },
    },
  },
  plugins: [],
}
