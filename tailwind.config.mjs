/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"HarmonyOS Sans"',
          '"PingFang SC"',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans SC"',
          'sans-serif',
        ],
        hand: ['Caveat', '"Patrick Hand"', 'cursive'],
        mono: ['"Share Tech Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
      },
      colors: {
        mint: {
          50: '#eef9f4',
          100: '#d8f2e6',
          200: '#b6e6d1',
          300: '#8ed7b7',
          400: '#6fc8a8',
          500: '#5fb89a',
          600: '#4ea284',
          700: '#3f846b',
        },
        morandi: {
          rose: '#C4A4A4',
          sage: '#A3B18A',
          sky: '#8EACCD',
          sand: '#D4C5A9',
          mauve: '#B5A5C7',
          clay: '#C9A98B',
          mist: '#B8C4C8',
          blush: '#D4A9A9',
        },
      },
      borderRadius: {
        bento: '32px',
      },
      gridTemplateColumns: {
        bento: 'repeat(4, minmax(0, 1fr))',
      },
      boxShadow: {
        glass: '0 4px 24px rgba(0, 0, 0, 0.04)',
        'glass-lg': '0 16px 40px rgba(0, 0, 0, 0.07)',
      },
    },
  },
  plugins: [],
};
