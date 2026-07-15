/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#060D1A',
        'bg-surface': '#0B1628',
        'bg-elevated': '#0F1E36',
        'gold': '#C9A84C',
        'blue-accent': '#1A7FE8',
        'text-primary': '#E8EDF5',
        'text-muted': '#637899',
        'text-faint': '#3D5070',
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
