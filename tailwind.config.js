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
          textColor1: "#555555",
          textColor2: "#39494A"
        },
        fontFamily: {
          poppins: "Poppins",
          raleway: "Raleway",
          outfit: "Outfit",
        }
    },
  },
  plugins: [],
}

