/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".pause-ticker": {
          "animation-play-state": "paused",
        },
      });
    }),
  ],
};
