/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        purple: "#dc2626",
        green: {
          800: "#166534",
          200: "#bbf7d0",
        },
        midnight: {
          100: "#121063",
          200: "#364B8C",
          300: "#0D1826",
          400: "#7A98AE",
        },
        violet: {
          900: "#4c1d95",
          200: "#ddd6fe",
        },
        silver: "#ecebff",
        grey: {
          200: "#e5e7eb",
          400: "#9ca3af",
        },

        bermuda: "#78dcca",
      },
    },
  },
  plugins: [],
};
