/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07100d',
          900: '#0b1613',
          800: '#101f1b',
          700: '#182f29',
        },
        paper: {
          50: '#faf9f6',
          100: '#f4f2ec',
        },
        signal: {
          DEFAULT: '#1f7a5c',
          light: '#2fa578',
          dark: '#14503c',
          amber: '#d9a441',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Fraunces"', '"Georgia"', 'serif'],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(31,122,92,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,122,92,0.08) 1px, transparent 1px)',
      },
      keyframes: {
        'grid-drift': {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '48px 48px' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'grid-drift': 'grid-drift 6s linear infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
