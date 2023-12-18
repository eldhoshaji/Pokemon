import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      bug: '#A7B723',
      dark: '#75574C',
      dragon: '#7037FF',
      electric: '#F9CF30',
      fairy: '#E69EAC',
      fighting: '#C12239',
      fire: '#F57D31',
      flying: '#A891EC',
      ghost: '#70559B',
      normal: '#AAA67F',
      grass: '#74CB48',
      ground: '#DEC16B',
      ice: '#9AD6DF',
      poison: '#A43E9E',
      psychic: '#FB5584',
      rock: '#B69E31',
      steel: '#B7B9D0',
      water: '#6493EB'
    }
  },
  plugins: [],
}
export default config
