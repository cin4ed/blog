/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0B",
        foreground: "#C0C0C0",
        primary: "#DCBA71",
        secondary: "#54472B",
      },
    },
  },
  plugins: [],
};
