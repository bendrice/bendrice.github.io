/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}", "./projects/*.{html,js}" ],
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

