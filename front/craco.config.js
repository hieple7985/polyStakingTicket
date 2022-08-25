/* eslint-disable */
module.exports = {
  style: {
    postcss: {
      plugins: [
        require("tailwindcss")("./tailwind.config.js"),
        require("tailwindcss/nesting"),
        require("postcss-import"),
      ],
    },
  },
};