/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F2F0E9',
        moss: '#2E4036',
        clay: '#CC5833',
        charcoal: '#1A1A1A',
        bone: '#FBFAF6',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        halo: '0 35px 80px rgba(26, 26, 26, 0.12)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, rgba(7, 12, 10, 0.12) 0%, rgba(7, 12, 10, 0.7) 50%, rgba(7, 12, 10, 0.96) 100%)',
        'moss-radial': 'radial-gradient(circle at top left, rgba(204, 88, 51, 0.25), transparent 35%), radial-gradient(circle at right, rgba(46, 64, 54, 0.35), transparent 38%)',
      },
    },
  },
  plugins: [],
};
