import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
export default defineConfig({
  integrations: [tailwind()],
  output: "static",
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  adapter: netlify(),
});
