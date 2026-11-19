/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#02050e',
          900: '#030712',
          800: '#071022',
          700: '#0B172E',
          600: '#0F2042',
        },
        bit: {
          base: '#030712',
          dark: '#081326',
          panel: '#0B1B35',
          panelHighlight: '#102547',
          border: '#1B3158',
          borderActive: '#38BDF8',
          dim: '#475569',
          muted: '#8BA2C4',
          bright: '#BAE6FD',
          cyan: '#38BDF8',
          ice: '#7DD3FC',
          neon: '#00F0FF',
          text: '#F1F5F9',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'bit-glow': '0 0 20px -2px rgba(56, 189, 248, 0.25)',
        'bit-glow-lg': '0 0 35px -5px rgba(56, 189, 248, 0.4)',
        'bit-card': '0 4px 20px -4px rgba(3, 7, 18, 0.7), inset 0 0 0 1px rgba(27, 49, 88, 0.6)',
      },
      animation: {
        'bit-pulse': 'bitPulse 4s ease-in-out infinite',
        'bit-flicker': 'bitFlicker 3s infinite',
        'marquee-slow': 'marquee 30s linear infinite',
      },
      keyframes: {
        bitPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        bitFlicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
          '70%': { opacity: '0.9' },
          '85%': { opacity: '0.4' },
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
