import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        gold: {
          50: "#fbf8ee",
          100: "#f5eed4",
          200: "#ebdaa8",
          300: "#dec074",
          400: "#d0a647",
          500: "#b88a2c",
          600: "#9d6e23",
          700: "#7c511f",
          800: "#67421f",
          900: "#57381e",
        },
        dark: {
          850: "#151b28",
          900: "#0b0f19",
          950: "#060911",
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'luxury': '0 20px 50px -12px rgba(16, 185, 129, 0.12)',
        'glow': '0 0 35px -5px rgba(16, 185, 129, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'luxury-gradient': 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #0b0f19 100%)',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  }
};
export default config;
