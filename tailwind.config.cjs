module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{html,js,svelte,ts, css}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
