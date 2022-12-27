/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const defaultColors = require('tailwindcss/colors');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
        screens: {
            xs: '475px',
            ...defaultTheme.screens,
            xl: '1470px',
        },
        colors: {
            ...defaultColors,
            primary: '#243F86',
            accent: '#775BE9',
            bronze: '#8D6161',
            silver: '#AAAAAA',
            gold: '#FFB800',
            background: '#EFF2F7',
        },
    },
    plugins: [],
};
