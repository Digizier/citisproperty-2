import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            50: '#eefdf5',
            100: '#d6f8e7',
            500: '#10b981',
            600: '#059669',
            700: '#006637',
            800: '#00522c',
            900: '#003e22',
          },
          gold: {
            50: '#fbf8ee',
            100: '#f6efd5',
            400: '#d4ad3f',
            500: '#b8891a',
            600: '#a37613',
            700: '#835c10',
          },
          navy: {
            800: '#1e293b',
            900: '#0f172a',
            950: '#090d16',
          }
        }
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
