import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://betweenframes.net",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    expressiveCode({
      themes: ["dark-plus"],
      plugins: [pluginCollapsibleSections()],
      styleOverrides: {
        borderRadius: "4px",
        frames: {
          shadowColor: "#ea833e",
          frameBoxShadowCssValue: "4px 4px 0 #ea833e",
        },
      },
    }),
    mdx(),
  ],
});
