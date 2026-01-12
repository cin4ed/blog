/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["PPSupplyMono", "system-ui", "sans-serif"],
      },
      colors: {
        // first option
        // background: "#13160E",
        // foreground: "#DBE6B6",
        // primary: "#DBE6B6",
        // muted: "hsla(74, 100%, 10%, 1)",
        // secondary: "#475569",

        // Second option
        background: "#151515",
        foreground: "#C0BEAF",
        primary: "#C0BEAF",
        muted: "#2c2c2c",

        // Third option
        // background: "#FFFFFF",
        // foreground: "#333333",
        // primary: "#333333",
      },
    },
  },
};
