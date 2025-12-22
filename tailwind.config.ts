import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Colors
        brand: {
          primary: '#1B4F72',
          secondary: '#2980B9',
          accent: '#F39C12',
        },
        // Neutral & UI Colors
        text: {
          primary: '#2C3E50',
          secondary: '#5D6D7E',
        },
        surface: {
          ground: '#FFFFFF',
          bg: '#F9F9F9',
          border: '#EAECEE',
        },
        // Semantic (Feedback) Colors
        feedback: {
          success: '#27AE60',
          error: '#C0392B',
          warning: '#F1C40F',
          info: '#3498DB',
        },
        // Dark Mode Palette
        dark: {
          text: {
            primary: '#E2E8F0',
            secondary: '#A0AEC0',
          },
          surface: {
            ground: '#1A202C',
            bg: '#0D1117',
            border: '#2D3748',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      fontSize: {
        display: ['3rem', { lineHeight: '1.2' }],
        h1: ['2.25rem', { lineHeight: '1.2' }],
        h2: ['1.875rem', { lineHeight: '1.3' }],
        h3: ['1.5rem', { lineHeight: '1.4' }],
        h4: ['1.25rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        button: ['1rem', { lineHeight: '1.5' }],
      },
      spacing: {
        '0.5': '0.125rem',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
      },
      borderRadius: {
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
}

export default config

