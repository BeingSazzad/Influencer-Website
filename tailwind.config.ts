import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        warm: {
          50: '#FCFCFB',
          100: '#FAFAF8',
          200: '#F4F4F0',
          300: '#E7E7E2',
          400: '#D2D2CA',
          500: '#9E9E94',
          600: '#73736A',
          700: '#52524B',
          800: '#33332D',
          900: '#151515',
        },
        nearblack: '#151515',
        pastel: {
          lavender: '#F1EEF9',
          lavenderText: '#6444A6',
          mint: '#EEF7F2',
          mintText: '#23744D',
          butter: '#FAF6E8',
          butterText: '#8C6819',
          blush: '#FDF0ED',
          blushText: '#A9432F',
        },
      },
      maxWidth: {
        'content': '1280px',
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '18px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
};
export default config;
