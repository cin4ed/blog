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
        'blumine': {
          '50': '#f1f9fa',
          '100': '#dbecf2',
          '200': '#bcdae5',
          '300': '#8dc0d3',
          '400': '#579cb9',
          '500': '#3c809e',
          '600': '#346986',
          '700': '#335c75',
          '800': '#2e495c',
          '900': '#2a3f4f',
          '950': '#182734',
        },
      },
    },
  },
};
