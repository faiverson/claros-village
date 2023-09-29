import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['var(--font-lato)'],
        satisfy: ['var(--font-satisfy)'],
      },
      colors: {
        foreground: 'rgb(var(--foreground-start) / <alpha-value>)',
        primary: '#7AB672',
        'primary-dark': '#3B7B30',
        'primary-alter': '#5AADAF',
        'primary-alter-dark': '#1E656A',
        secondary: '#F0D464',
        ternary: '#801813',
        alternative: '#B0C965',
        'alternative-dark': '#56A930',
        light: 'rgb(var(--light) / <alpha-value>)',
        dark: 'rgb(var(--dark) / <alpha-value>)',
      }
    },
  },
  plugins: [],
}
export default config
