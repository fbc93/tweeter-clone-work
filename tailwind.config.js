/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        'Pacifico':['Pacifico']
      },
      width:{
        'container':'360px',
      },
      height:{
        'appbar':'4rem',
        'navbar':'5rem'
      },
      colors:{
        accentFirst:"rgb(247,223,30)",
        accentSecond:"rgb(255,69,0)",
        first:"rgb(20,20,20)",
        secondary:"rgb(34,34,34)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
