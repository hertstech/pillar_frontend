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
          200: "#B2DDFF",
          500: "#2E90FA",
          600: "#1570EF",
          650: "#155EEF",
        },
        sec: {
          1: "",
          600: "#099250",
        },
        neu: {
          50: "#E7E9FB",
          75: "#F7F7FA",
          100: "#F5F5F5",
          200: "#F0F2F5",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475367",
          700: "#2A2D32",
          900: "#101928",
        },
        err: "#D42620",
        err2: {
          50: "#FEF3F2",
          100: "#F04438",
        },
        succ: "#099250",
        warn: {
          50: "#FEF6E7",
          100: "#FDEAD7",
          300: "#F79009",
          900: "#523300",
        },
        bg: "#F7F7F7;",
        bg2: "#F9FAFB",
      },
    },
  },
  plugins: [],
};
export default config;
