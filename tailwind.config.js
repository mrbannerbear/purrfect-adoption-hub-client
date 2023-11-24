/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    ],
  theme: {
    extend: {
      fontFamily: {'fredoka': ['Fredoka', 'sans-serif']}
    },
  },
  plugins: [require("daisyui")],
}

