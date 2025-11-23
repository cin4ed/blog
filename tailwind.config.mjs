/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["PPSupplyMono", "system-ui", "sans-serif"]
      },
      colors: {
        background: "#13160E",
        foreground: "#DBE6B6",
        muted: "hsla(74, 100%, 10%, 1)",
        primary: "#DBE6B6",
        secondary: "#475569",
        blumine: {
          50: "#f1f9fa",
          100: "#dbecf2",
          200: "#bcdae5",
          300: "#8dc0d3",
          400: "#579cb9",
          500: "#3c809e",
          600: "#346986",
          700: "#335c75",
          800: "#2e495c",
          900: "#2a3f4f",
          950: "#182734",
        },
      },
    },
  },
};
