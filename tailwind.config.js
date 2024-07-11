import { config } from './lib/server/config';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ['./pages/**/*.jsx', './components/**/*.jsx', './layouts/**/*.jsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        day: {
          DEFAULT: config.lightBackground || '#ffffff',
        },
        night: {
          DEFAULT: config.darkBackground || '#111827',
        },
      },
      fontFamily: {
        arial: ['Arial'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
