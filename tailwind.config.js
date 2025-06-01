/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  animation:{
    'fade-in-down' :'fadeInDown 0.5s ease-out',
  },
  keyframes:{
    fadeInDown:{
      '0%' : { opacity:0, transform: 'translateY(-20px)'},
      '100%' : { opacity:1, transform: 'translateY(0)'},
    },
  },
}
