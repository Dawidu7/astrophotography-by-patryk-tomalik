/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#242933',
        'light-dark': '#2a303c',
        light: '#cecece',
      },
    },
  },
  plugins: [],
}
