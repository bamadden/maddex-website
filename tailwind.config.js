/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#060D1A',
        'bg-surface': '#0B1628',
        'bg-elevated': '#0F1E35',
        'gold': '#C9A84C',
        'gold-bright': '#E8C96A',
        'text-primary': '#FFFFFF',
        'text-secondary': '#8BA3C4',
        'text-muted': '#4A6080',
        'text-faint': '#4A6080',
        'gain': '#2D8A50',
        'loss': '#A83232',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
