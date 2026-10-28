/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cobalt: '#0047AB',
        cherry: '#D90429',
        burgundy: '#581845',
        tangerine: '#FF5733',
        butter: '#FFF099',
        plum: '#4A0E4E',
        charcoal: '#121212',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
