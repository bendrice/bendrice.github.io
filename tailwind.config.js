/** @type {import('tailwindcss').Config} */
module.exports = {
  // CHANGE MADE TO BELOW
  content: ["./*.{html,js}", "./public/*.{html,js}", "./projects/*.{html,js}", "./about/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],

  theme: {
    extend: {
      fontFamily: {
        'KronaOne': ['Krona One', 'sans-serif'],
      },
    },
  },

}

