
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        inter: ['Inter', ...fontFamily.sans],
        playfair: ['Playfair Display', 'serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'emvi-dark': '#1A1F2C',
        'emvi-offwhite': '#eee',
        'emvi-accent': '#9b87f5',
        'emvi-brown': '#9A7B69',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' }
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(-30px, 30px) rotate(-120deg)' },
          '66%': { transform: 'translate(20px, -20px) rotate(-240deg)' }
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(1.05)' }
        },
        'sparkle-1': {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1) rotate(0deg)' },
          '50%': { opacity: 0.8, transform: 'scale(1.2) rotate(180deg)' }
        },
        'sparkle-2': {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1) rotate(0deg)' },
          '50%': { opacity: 0.9, transform: 'scale(1.3) rotate(-180deg)' }
        },
        'sparkle-3': {
          '0%, 100%': { opacity: 0.2, transform: 'scale(1) rotate(0deg)' },
          '50%': { opacity: 0.7, transform: 'scale(1.1) rotate(180deg)' }
        },
        'sparkle-4': {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1) rotate(0deg)' },
          '50%': { opacity: 1, transform: 'scale(1.4) rotate(-180deg)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-in-out',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-reverse': 'float-reverse 10s ease-in-out infinite',
        'pulse-gentle': 'pulse-gentle 4s ease-in-out infinite',
        'sparkle-1': 'sparkle-1 3s ease-in-out infinite',
        'sparkle-2': 'sparkle-2 4s ease-in-out infinite 0.5s',
        'sparkle-3': 'sparkle-3 3.5s ease-in-out infinite 1s',
        'sparkle-4': 'sparkle-4 4.5s ease-in-out infinite 1.5s'
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
