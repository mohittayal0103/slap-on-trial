/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          violet: '#FFD700', // Making violet -> Yellow for compatibility
          teal: '#ffffff',   // Teal -> White
          blue: '#121212',   // Blue -> Dark
          green: '#FFD700',  // Green -> Yellow
          cyan: '#FFD700',   // Cyan -> Yellow
        },
        brand: {
          yellow: '#FFD700',
          gray: '#686A6C', // Nardo Gray-ish
          black: '#000000',
        },
        dark: {
          bg: '#121212', // Slightly lighter black for bg
          card: '#000000',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
