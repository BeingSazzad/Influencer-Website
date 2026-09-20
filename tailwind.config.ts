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
        sans: ['"Red Hat Display"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        outfit: ['"Red Hat Display"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Red Hat Display"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
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
          900: '#0A0A0A',
          950: '#0A0A0A',
        },
        nearblack: '#0A0A0A',
        pastel: {
          lavender: '#F1EEF9',
          lavenderText: '#6444A6',
          mint: '#EEF7F2',
          mintText: '#23744D',
          butter: '#FAF6E8',
          butterText: '#8C6819',
          blush: '#FDF0ED',
          blushText: '#FF2D78',
          pink: '#FFF0F5',
          pinkText: '#FF2D78',
          rose: '#FFF0F5',
          roseText: '#FF2D78',
        },
      },
      maxWidth: {
        'content': '1280px',
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '20px',
        '3xl': '28px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
