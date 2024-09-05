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
        ter: "",
        err: "",
        warn: "",
      },
    },
  },
  plugins: [],
};
export default config;