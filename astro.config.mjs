// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypeNoTranslate } from "./src/utils/rehype-notranslate";

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || "http://localhost:4321",
  base: process.env.BASE_PATH || "/",
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
      wrap: true,
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["heading-link"],
          },
        },
      ],
      rehypeNoTranslate, // Automatically add translate="no" to code blocks
    ],
  },
  vite: {
    resolve: {
      alias: {
        "@monochrome-edge/ui/stepper":
          "@monochrome-edge/ui/dist/ui/components/stepper/stepper-unified.js",
      },
    },
    optimizeDeps: {
      exclude: ["@monochrome-edge/ui"],
    },
  },
});
