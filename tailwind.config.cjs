/** @type {import('tailwindcss').Config} */

const defaultColors = require('tailwindcss/colors');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
        colors: {
            ...defaultColors,
            primary: '#243F86',
            accent: '#775BE9',
            bronze: '#8D6161',
            silver: '#AAAAAA',
            gold: '#FFB800 ',
            background: '#EFF2F7',
        },
    },
    plugins: [],
};
