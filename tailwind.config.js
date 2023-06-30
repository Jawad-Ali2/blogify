/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#D0783E",
        helper: '#de691b',
        neutral: "#654F3C",
        secondary: "#263C41",
        background: "#143642",
      },
      fontSize: {
        h1: '80px',
        h2: '60px',
        h3: '50px',
        h4: '40px',
        h5: '30px',
        h6: '20px',
      },
      backgroundImage: {
        'hero-bg': "url('/hero-bg.png')"
      }

    },
  },
  plugins: [],
}
