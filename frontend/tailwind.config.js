/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'custom-color': '#001a2c', // Default color for light mode
      }
    }
  },
  plugins: [],
}

