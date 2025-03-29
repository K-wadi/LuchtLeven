import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#2B6CB0",
        secondary: "#48BB78",
        accent: "#F6AD55",
        background: {
          light: "#F7FAFC",
          dark: "#1A202C",
        },
        text: {
          light: "#2D3748",
          dark: "#F7FAFC",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Source Sans Pro", "sans-serif"],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config; 