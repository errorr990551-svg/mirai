/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mirai: {
          dark: '#020813', // Deep navy background
          darker: '#010409', // Darker sections
          card: '#0B162C', // Deep blue cards
          cyan: '#00d4ff', // Accent color
          gray: '#9ca3af', // Subtext
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
