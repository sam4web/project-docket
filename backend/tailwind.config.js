/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{pug,html,css}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#2b2d42",
        light: "#edf2f4",
        grey: "#8d99ae",
      },
      fontFamily: {
        display: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};