/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#39588a",
        secondary: "#272b33",
        accent: "#a7a1b3",
        light: "#fcfcfc",
      },
    },
  },
  plugins: [],
};
