import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    expressiveCode({
      themes: ["dark-plus"],
    }),
  ],
});
