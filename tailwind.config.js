const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                black: colors.black,
                white: colors.white,
                gray: colors.trueGray,
                indigo: colors.indigo,
                background: {
                    DEFAULT: "var(--background)",
                    contrast: "var(--background-contrast)"
                }
            }
        },
    },
    variants: {
        extend: {},
    },
  plugins: [],
}
