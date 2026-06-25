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
          primary: '#2563eb', // Vibrant Royal Blue (Tailwind blue-600)
          accent: '#1d4ed8', // Deep Blue (Tailwind blue-700) for gradients
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
