import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://anonymous-monks.github.io",
  base: "/gpu-guy",
  output: "static",
  trailingSlash: "always",
  devToolbar: { enabled: false },
});
