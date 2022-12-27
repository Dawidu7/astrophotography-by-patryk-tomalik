/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // dark: '#242933',
        dark: '#373842',
        // 'light-dark': '#2a303c',
        'light-dark': '#454650',
        light: '#cecece',
      },
    },
  },
  plugins: [],
}
