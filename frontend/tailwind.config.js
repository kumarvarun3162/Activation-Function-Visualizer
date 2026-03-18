/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff1a1a",
        darkbg: "#0b0b0b",
        cardbg: "#111111"
      }
    },
  },
  plugins: [],
}
