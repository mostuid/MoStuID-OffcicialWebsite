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
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        slideUp: "slideUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
}