// @ts-check
import { defineConfig } from "astro/config";
import { generateBuildInfoIntegration } from "./src/integrations/generate-build-info";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: "standalone",
  }),
  server: {
    port: 9902,
  },
  build: {
    serverEntry: 'index.mjs',
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:9901',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  },
  redirects: {
    "/list": {
      status: 301,
      destination: "/site"
    },
    "/new": {
      status: 301,
      destination: "/site/submit"
    },
    "/random": {
      status: 301,
      destination: "/site/go-site",
    },
    "/charts": {
      status: 301,
      destination: "/site/stats",
    }
  },
  integrations: [generateBuildInfoIntegration(), react(), vue(), mdx(), sitemap(), partytown()],
});
