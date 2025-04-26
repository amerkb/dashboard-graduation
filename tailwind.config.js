/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        'lg-custom': { max: '1100px', min: '974px' },
        'header-custom': '900px',
        lg: '976px',
        xl: '1440px',
      },
      fontFamily: {
        cairo: ['Cairo'],
      },
      colors: {
        main: '#7d224b',
        gray: '#787A7D',
        brown: '#5D4108',
        blue: '#379AE6',
        green: '#1DD75B',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'fade-in-up': 'fadeInUp 1s ease-in-out',
        'bounce-once': 'bounce 1s linear 1',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-50%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(50%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.title-text': {
          fontSize: '25px',
          lineHeight: '1.5rem',
          fontWeight: '700',
          color: '#1a202c',
        },
        '@media (min-width: 768px)': {
          // Apply at `md` breakpoint
          '.title-text': {
            fontSize: '30px',
            lineHeight: '1.75rem',
            fontWeight: '500',
          },
        },
        '@media (min-width: 976px)': {
          // Apply at `lg` breakpoint
          '.title-text': {
            fontSize: '38px',
            lineHeight: '2rem',
            fontWeight: '600',
          },
        },
      });
    },
  ],
};
