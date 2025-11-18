import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New brand color palette
        primary: {
          DEFAULT: '#0B2E47',       // Dark navy
          dark: '#071F30',          // Darker navy
          light: '#1A4B6B',         // Lighter navy
        },
        accent: {
          DEFAULT: '#F4841A',       // Bright orange
          dark: '#D6701A',          // Darker orange
          light: '#F7A45A',         // Lighter orange
        },
        secondary: {
          DEFAULT: '#5B7C99',       // Blue-gray
          dark: '#475E75',          // Darker blue-gray
          light: '#7A9BB8',         // Lighter blue-gray
        },
        light: {
          DEFAULT: '#CFE8EF',       // Soft aqua
          50: '#F0F7FA',            // Very light aqua
        },
        base: {
          DEFAULT: '#FFFFFF',       // White
        },
        // Keep neutral colors for text and backgrounds
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
