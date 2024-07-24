/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          customTeal: "#3A7C80",
          textColor1: "#555555" 
        },
    },
  },
  plugins: [],
}

