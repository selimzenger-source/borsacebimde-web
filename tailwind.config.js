/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#071A14',
          secondary: '#0A2E1F',
          surface: '#0D3627',
          card: '#112E23',
        },
        accent: {
          green: '#4CAF50',
          gold: '#FFD700',
          blue: '#2979FF',
          cyan: '#26C6DA',
          purple: '#B388FF',
          orange: '#FF9800',
          red: '#FF5252',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B0BEC5',
          muted: '#78909C',
        },
        glass: {
          border: 'rgba(255,255,255,0.08)',
          bg: 'rgba(255,255,255,0.03)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
