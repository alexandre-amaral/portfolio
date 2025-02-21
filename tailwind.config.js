/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '0.3' }
        }
      },
      animation: {
        pulse: 'pulse 3s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}

