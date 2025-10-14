
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        // Premium luxury font system
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'manrope': ['Manrope', 'Inter', 'sans-serif'],
        'crimson': ['Crimson Text', 'serif'],
        
        // Semantic aliases for luxury branding
        'primary': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'luxury': ['Crimson Text', 'Playfair Display', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'luxury': {
          '50': '#faf7ff',
          '100': '#f3ecff',
          '200': '#e9ddff',
          '300': '#d8c2ff',
          '400': '#c198ff',
          '500': '#a766ff',
          '600': '#9945ff',
          '700': '#8b32f7',
          '800': '#7527d3',
          '900': '#6323ad',
          '950': '#3d1374',
        },
        'platinum': {
          '50': '#f8fafc',
          '100': '#f1f5f9',
          '200': '#e2e8f0',
          '300': '#cbd5e1',
          '400': '#94a3b8',
          '500': '#64748b',
          '600': '#475569',
          '700': '#334155',
          '800': '#1e293b',
          '900': '#0f172a',
          '950': '#020617',
        },
        'gold': {
          '50': '#fffdf2',
          '100': '#fefce8',
          '200': '#fef08a',
          '300': '#fde047',
          '400': '#facc15',
          '500': '#eab308',
          '600': '#ca8a04',
          '700': '#a16207',
          '800': '#854d0e',
          '900': '#713f12',
          '950': '#422006',
        },
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "sparkle": {
          "0%, 100%": { opacity: "0", transform: "scale(0)" },
          "50%": { opacity: "1", transform: "scale(1)" }
        },
        "luxury-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(153, 69, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(153, 69, 255, 0.6)" }
        },
        "glass-shine": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        "premium-bounce": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-5px) scale(1.02)" }
        }
      },
      animation: {
        "gradient-shift": "gradient-shift 6s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "sparkle": "sparkle 3s ease-in-out infinite",
        "luxury-glow": "luxury-glow 3s ease-in-out infinite",
        "glass-shine": "glass-shine 2s ease-in-out infinite",
        "premium-bounce": "premium-bounce 2s ease-in-out infinite"
      },
      backdropFilter: {
        'luxury': 'blur(20px) saturate(180%)',
      },
      backgroundSize: {
        '200': '200% 100%',
      },
      backgroundPosition: {
        'pos-0': '0% 50%',
        'pos-100': '100% 50%',
      },
    },
  },
  plugins: [
    function({ addUtilities }: any) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.scroll-smooth': {
          'scroll-behavior': 'smooth'
        },
        '.line-clamp-2': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
        },
        '.line-clamp-3': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
        }
      })
    }
  ],
}
export default config
