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
          light: '#f8fafc', // Premium off-white/slate-50
          lighter: '#ffffff', // Pure white for cards
          card: '#ffffff', 
          primary: '#4f46e5', // Vibrant Indigo 600
          accent: '#7c3aed', // Violet 600 for gradients
          gray: '#64748b', 
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
