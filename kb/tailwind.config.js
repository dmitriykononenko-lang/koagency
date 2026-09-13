/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        'accent': '#E60000',
        'brand-dark': '#0A0E27',
        'brand-light': '#F5F7FA',
      },
      spacing: {
        'doc': '65ch',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--text-primary)',
            a: {
              color: '#E60000',
              textDecoration: 'underline',
              '&:hover': {
                opacity: 0.8,
              },
            },
            code: {
              backgroundColor: 'var(--bg-code)',
              color: 'var(--text-code)',
              padding: '2px 6px',
              borderRadius: '4px',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: 0,
            },
            pre: {
              backgroundColor: 'var(--bg-code)',
              borderRadius: '8px',
            },
            h1: {
              fontSize: '2.5rem',
              fontWeight: 700,
              marginBottom: '1rem',
            },
            h2: {
              fontSize: '1.875rem',
              fontWeight: 700,
              marginTop: '2.5rem',
              marginBottom: '1rem',
            },
            h3: {
              fontSize: '1.5rem',
              fontWeight: 600,
              marginTop: '2rem',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
};
