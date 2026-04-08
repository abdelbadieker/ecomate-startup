import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: '#1E3A8A', light: '#2563EB' },
        accent:    { DEFAULT: '#10B981', light: '#34d399' },
        admin:     { DEFAULT: '#7C3AED', light: '#a78bfa' },
        dark:      { DEFAULT: '#07101f', section: '#0a1628' },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter:   ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'blink':      'blink 2s infinite',
        'scan':       'scan 2.5s ease-in-out infinite',
        'float-1':    'float1 5s ease-in-out infinite',
        'float-2':    'float2 6.5s ease-in-out infinite',
        'scroll-l':   'scrollLeft 36s linear infinite',
        'scroll-r':   'scrollRight 42s linear infinite',
      },
      keyframes: {
        fadeUp:     { from: { opacity: '0', transform: 'translateY(32px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        blink:      { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.3' } },
        scan:       { '0%,100%': { width: '0%', opacity: '1' }, '50%': { width: '90%' }, '100%': { opacity: '0' } },
        float1:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        float2:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(12px)' } },
        scrollLeft: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        scrollRight:{ '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
      },
      backdropBlur: { xl: '24px' },
    },
  },
  plugins: [],
};

export default config;
