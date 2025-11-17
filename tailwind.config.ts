import { table } from 'console';
import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        partial: ['PartialSans', 'sans-serif'],
      },
      colors: {
        border: {
          DEFAULT: '#8949fe',
          wrapper: '#d0d0d0',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#8949fe',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        line: {
          DEFAULT: '#656565',
          foreground: '#DDDDDD',
        },
        error: {
          DEFAULT: '#da1717ff',
          foreground: '#fee2e2',
        },
        toast: {
          bg: '#ffffff',
          border: '#e5e7eb',
          text: '#111827',
          destructive: {
            bg: '#fee2e2',
            border: '#ef4444',
            text: '#b91c1c',
          },
        },
        table: {
          bg: '#F5F5F5',
          hover: '#e2f2fe',
          secondary: '#abf2bf',
          expired: 'rgb(254 226 226)',
        },
        status: {
          pending: 'var(--status-pending)',
          'pending-foreground': 'var(--status-pending-foreground)',
          completed: 'var(--status-completed)',
          'completed-foreground': 'var(--status-completed-foreground)',
          noshow: 'var(--status-noshow)',
          disable: 'var(--status-disable)',
          dark: 'var(--status-dark)',
        },
        tableFilter: {
          bg: '#383838',
          foreground: '#FFFFFF',
          line: '#BABABA',
          text: '#161616',
        },
        label: {
          default: '(var(--label-default))',
          semilight: 'var(--label-semilight)',
          bold: 'var(--label-bold)',
          light: 'var(--label-light)',
        },
      },
      borderRadius: {
        xl: 'var(--radius-30)',
        lg: 'var(--radius-20)',
        md: 'var(--radius-10)',
        sm: 'var(--radius-6)',
        16: '16px',
        12: '12px',
      },
      spacing: {
        2: 'var(--spacing-2)',
        6: 'var(--spacing-6)',
        10: 'var(--spacing-10)',
        12: 'var(--spacing-12)',
        14: 'var(--spacing-14)',
        16: 'var(--spacing-16)',
        20: 'var(--spacing-20)',
        24: 'var(--spacing-24)',
        30: 'var(--spacing-30)',
        40: 'var(--spacing-40)',
        50: 'var(--spacing-50)',
      },
      padding: {
        20: 'var(--padding-20)',
        24: 'var(--padding-24)',
        40: 'var(--padding-40)',
      },
      gap: {
        16: '16px',
        20: '20px',
        24: '24px',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
