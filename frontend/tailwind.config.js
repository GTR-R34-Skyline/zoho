/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          600: 'rgb(var(--color-primary) / 0.9)', // Approximate for now
          500: 'rgb(var(--color-primary) / <alpha-value>)',
          400: 'rgb(var(--color-primary) / 0.6)',
          glow: 'rgb(var(--color-primary) / 0.5)'
        },
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        surfaceHighlight: 'rgb(var(--color-surface-highlight) / <alpha-value>)',
        headers: 'rgb(var(--color-headers) / <alpha-value>)',
        secondary: {
          text: 'rgb(var(--color-secondary-text) / <alpha-value>)',
        },
        borders: 'rgb(var(--color-borders) / <alpha-value>)',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        accent: '#8B5CF6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgb(var(--color-primary) / 0.15)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Softer shadow for light mode compatibility
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, rgb(var(--color-background)) 0deg, rgb(var(--color-surface)) 180deg, rgb(var(--color-background)) 360deg)',
      }
    },
  },
  plugins: [],
}
