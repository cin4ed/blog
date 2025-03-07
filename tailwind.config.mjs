/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        foreground: "#64748b",
        primary: "#0f172a",
        secondary: "#475569",
      },
    },
  },
};
