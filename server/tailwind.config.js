/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#1fb6ff",
        secondaryRed: "#EC2127",
        thirtYellow: "#E9E612",
        DarkNevy: "#2B3252",
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
        "amber-admin": "#fde047",
        "Learn-more":
          "linear-gradient( 0deg,rgba(255, 27, 0, 1) 0%,rgba(251, 75, 2, 1) 100%)",
      },
      keyframes: {
        slideIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slideIn: "slideIn 0.3s ease-out",
      },
    },
  },
  plugins: [],
});
