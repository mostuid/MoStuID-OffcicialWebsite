/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agency-orange': '#FF5500',
        'darkBg': '#0a0a0a',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        chivo: ['Chivo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}