/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          gray: {
            900: '#0f1115',
            800: '#1a1d23',
            700: '#2a2f3a',
            600: '#404653',
            500: '#5c6474',
            400: '#8891a5',
            300: '#c3c9d5',
            200: '#e2e6ee',
            100: '#f3f4f7',
          },
        },
      },
    },
    plugins: [],
  };
  