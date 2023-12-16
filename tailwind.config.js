/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-theme": "#464748",
        "blue-dark-theme": "#131825",
      },
    },
  },
  daisyui: {
    themes: ["lofi"],
  },
  plugins: [require("daisyui")],
};
