import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx,png}",
    "./src/**/*.{js,ts,jsx,tsx,mdx,png}",
  ],
  theme: {
    extend: {
      colors: {
        pri: {
          1: "",
          50: "#EFF8FF",
          500: "#2E90FA",
          600: "#1570EF",
        },
        sec: {
          1: "",
          600: "#099250",
        },
        neu: {
          75: "#F7F7FA",
          100: "#F5F5F5",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475367",
          700: "#2A2D32",
          900: "#101928",
        },
        err: "",
        warn: {
          100: "#FDEAD7",
        },
        bg: "#F7F7F7;",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
