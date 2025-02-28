/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'blue': {
            '50': '#eff6ff',
            '100': '#dbeafe',
            '200': '#bfdbfe',
            '300': '#93c5fd',
            '400': '#60a5fa',
            '500': '#3b82f6',
            '600': '#2563eb',
            '700': '#1d4ed8',
            '800': '#1e40af',
            '900': '#1e3a8a',
          },
          // Ergänze auch andere Farben, die in den Komponenten verwendet werden
          'gray': {
            '50': '#f9fafb',
            '100': '#f3f4f6',
            '200': '#e5e7eb',
            '300': '#d1d5db',
            '400': '#9ca3af',
            '500': '#6b7280',
            '600': '#4b5563',
            '700': '#374151',
            '800': '#1f2937',
            '900': '#111827',
          },
          'red': {
            '100': '#fee2e2',
            '600': '#dc2626',
            '700': '#b91c1c',
            '800': '#991b1b',
          },
          'green': {
            '100': '#dcfce7',
            '500': '#22c55e',
            '600': '#16a34a',
            '700': '#15803d',
            '800': '#166534',
          },
          'yellow': {
            '100': '#fef9c3',
            '800': '#854d0e',
          },
          'orange': {
            '100': '#ffedd5',
            '800': '#9a3412',
          },
          'purple': {
            '100': '#f3e8ff',
            '800': '#6b21a8',
          },
        },
      },
    },
    plugins: [],
  }
