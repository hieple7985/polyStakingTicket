/* eslint-disable */
module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primaryColor: '#7B3FE4',
        lighterTextColor: '#895ED3',
        whiteSmoke: "#F5F5F5",
        inputBgColor: "#F4F6F9",
        subBgColor: '#E4DAFE',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
