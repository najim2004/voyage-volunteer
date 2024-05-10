/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cRed: "#f87171",
      },
    },
  },
  plugins: [require("daisyui")],
};
