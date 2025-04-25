import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";

// https://astro.build/config
export default defineConfig({
  site: "https://betweenframes.net",
  integrations: [
    tailwind(),
    expressiveCode({
      themes: ["dark-plus"],
      plugins: [pluginCollapsibleSections()],
    }),
  ],
});
