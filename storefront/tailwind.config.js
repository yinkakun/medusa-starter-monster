const defaultTheme = require(`tailwindcss/defaultTheme`);

module.exports = {
  content: [
    `./pages/**/*.{js,ts,jsx,tsx}`,
    `./components/**/*.{js,ts,jsx,tsx}`,
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [`Kamerik`, ...defaultTheme.fontFamily.sans],
        'alt-sans': [`Hamlin`, ...defaultTheme.fontFamily.sans],
      },
      colors: {
        noir: '#1a1a1a',
        lotion: '#fafafa',
        'monster-green': {
          DEFAULT: '#95D600',
          50: '#DDFF8F',
          100: '#D7FF7A',
          200: '#CAFF51',
          300: '#BEFF29',
          400: '#B1FF00',
          500: '#95D600',
          600: '#6E9E00',
          700: '#476600',
          800: '#202E00',
          900: '#000000',
        },
      },
    },
  },
};
