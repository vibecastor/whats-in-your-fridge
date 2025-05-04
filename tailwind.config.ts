import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          bg: "var(--card-bg)",
          border: "var(--card-border)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
        },
        spinner: {
          bg: "var(--spinner-bg)",
          ringLight: "var(--ring-light)",
          ringMedium: "var(--ring-medium)",
          ringDark: "var(--ring-dark)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
