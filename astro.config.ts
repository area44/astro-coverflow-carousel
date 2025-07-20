// @ts-check

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: process.env.CI ? "https://area44.github.io" : "http://localhost:4321",
  base: "astro-coverflow-carousel",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
