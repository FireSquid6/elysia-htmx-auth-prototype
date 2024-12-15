/** @type {import("tailwindcss"}.Config */
export default {
  content: ["./src/**/*.{html,tsx,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
  ],
  daisyui: {
    themes: ["dark"],
  },
}
