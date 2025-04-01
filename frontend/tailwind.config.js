/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'selector',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: '#2b2d42',
                light: '#edf2f4',
                grey: '#8d99ae',
            },
            fontFamily: {
                display: ['Open Sans', 'sans-serif'],
            },
        },
    },
    plugins: [],
}