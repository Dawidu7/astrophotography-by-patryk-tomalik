/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#242629',
        'light-dark': '#2c2e31',
        light: '#c0c',
      },
    },
  },
  plugins: [],
}
