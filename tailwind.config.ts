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
        primary: {
          DEFAULT: '#D97706',
          copper: '#D97706',
          cream: '#F8F9FA',
          gray: '#DEE2E6',
          blue: '#86B0BD',
        },
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8F9FA',
          dark: '#DEE2E6',
        },
        text: {
          primary: '#212529',
          secondary: '#6c757d',
        },
        accent: {
          copper: '#D97706',
          blue: '#86B0BD',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
