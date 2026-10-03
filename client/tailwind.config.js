/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#FAFAF8',
          subtle: '#F4F5F0',
          card: '#FFFFFF',
        },
        sage: {
          50: '#F5F8F4',
          100: '#EBF3EA',
          200: '#D7E7D5',
          300: '#BDD7BA',
          700: '#4D6C4B',
          800: '#3D553C',
          900: '#253524',
        },
        blush: {
          50: '#FFF8F8',
          100: '#FDF1F2',
          200: '#FBE2E4',
          500: '#E56B6F',
        },
        ink: {
          900: '#181A1B',
          800: '#2B2E33',
          700: '#4A5056',
          500: '#717882',
          300: '#A0A6AF',
          100: '#E6E8EB',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 22s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
