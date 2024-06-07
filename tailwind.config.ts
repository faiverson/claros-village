import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const nextuiConfig = {
  prefix: 'nextui',
  themes: {
    calendar: {
      colors: {
        background: '#3B7B30',
        foreground: '#ffffff',
        primary: {
          50: '#e3f2e9',
          100: '#c7e5d3',
          200: '#a8d7bc',
          300: '#89caa5',
          400: '#6abc8e',
          500: '#3B7B30',
          600: '#2f6929',
          700: '#245722',
          800: '#19361b',
          900: '#0e2514',
          DEFAULT: '#3B7B30',
          foreground: '#ffffff',
        },
      },
    },
  },
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      minWidth: {
        '1280': '1280px',
      },
      zIndex: {
        '80': '80',
        '90': '90',
        '100': '100',
        '200': '200',
        '300': '300',
      },
      fontFamily: {
        lato: ['var(--font-lato)'],
        satisfy: ['var(--font-satisfy)'],
      },
      colors: {
        'main-foreground': 'rgb(var(--foreground-start) / <alpha-value>)',
        light: '#F0F6F5',
        'main-green-light': '#BFD9B2',
        'main-green': '#4A9050',
        'main-green-dark': '#3B7B30',
        'main-orange': '#FFCF66',
        'main-orange-dark': '#FF8F00',
        'main-orange-light': '#FFE999',
        'main-violet': '#A42B83',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui(nextuiConfig)],
}

export default config
