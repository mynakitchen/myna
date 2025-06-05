/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New palette-based colors
        primary: "#825F45", // Warm brown for primary elements
        secondary: "#797D62", // Olive sage for secondary elements  
        accent: "#D08C60", // Warm orange for buttons and accents
        highlight: "#FFCB69", // Golden yellow for highlights
        tertiary: "#997B66", // Muted brown for subtle elements
        background: "#FFFFFF", // Pure white background
        text: "#000000", // Black text for maximum readability
        
        // Palette color variations
        brown: {
          50: "#F7F5F2",
          100: "#EBE6DF",
          200: "#D7CFC2",
          300: "#C3B5A2",
          400: "#A8967D",
          500: "#825F45", // Primary brown
          600: "#6B4F3A",
          700: "#544031",
          800: "#3D2F25",
          900: "#2A211A",
        },
        sage: {
          50: "#F5F6F4", 
          100: "#E8EAE6",
          200: "#D1D5CD",
          300: "#B8BEB2",
          400: "#9BA393",
          500: "#797D62", // Primary sage
          600: "#656952",
          700: "#515544",
          800: "#3E4235",
          900: "#2C3028",
        },
        warmOrange: {
          50: "#FDF6F0",
          100: "#FAEAD8",
          200: "#F4D4B0",
          300: "#ECBC85",
          400: "#E2A265",
          500: "#D08C60", // Primary warm orange
          600: "#B87651",
          700: "#996143",
          800: "#7A4D36",
          900: "#5C3A2A",
        },
        gold: {
          50: "#FFFCF5",
          100: "#FFF8E1",
          200: "#FFF0B8",
          300: "#FFE688",
          400: "#FFD95C",
          500: "#FFCB69", // Primary gold
          600: "#E6B65F",
          700: "#CC9F52",
          800: "#B38845",
          900: "#996F35",
        },
        mutedBrown: {
          50: "#F6F4F2",
          100: "#EAE5E1",
          200: "#D5CCC4",
          300: "#BFB2A5",
          400: "#A89685",
          500: "#997B66", // Primary muted brown
          600: "#836856",
          700: "#6D5547",
          800: "#574339",
          900: "#42322C",
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        heading: ['"Montserrat"', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'hover': '0 10px 30px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}; 