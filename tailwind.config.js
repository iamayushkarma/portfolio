/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFFDF5",
        charcoal: "#333333",
        dark: "#121212",
        ink: "#111111",
        muted: "#888888",
        accent: {
          blue: "rgb(59 130 246)",
          yellow: "#E8F429",
          green: "#33FF57",
        },
      },
      boxShadow: {
        brutal: "3px 3px 0 #111111",
        "brutal-w": "3px 3px 0 #FFFFFF",
        "brutal-b": "4px 4px 0 #111111",
      },
      fontFamily: {
        mono: ['"Courier New"', "Courier", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
