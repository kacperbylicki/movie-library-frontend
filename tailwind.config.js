/** @type {Partial<ThemeConfig & {extend: Partial<ThemeConfig>}>} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        screens: {
            'xxs': '350px',
            'xs': '465px',
            ...defaultTheme.screens,
        },
        extend: {},
    },
    daisyui: {
        themes: ["dracula", "cmyk"],
    },
    plugins: [require("daisyui")],
};