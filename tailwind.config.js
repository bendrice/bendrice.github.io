/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}",
    "./public/*.{html,js}",
    "./projects/*.{html,js}",
    "./about/*.{html,js}",
    "./blog/*.{html,js}",
    "./knowledge/*.{html,js}",
    "./cool/*.{html,js}",
    "./resume/*.{html,js}",
    "./js/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        'KronaOne': ['Krona One', 'sans-serif'],
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
      },
    },
  },
  plugins: [],
}

