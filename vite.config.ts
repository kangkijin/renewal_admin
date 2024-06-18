import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    vuetify({
      autoImport: true,
      styles: { configFile: "src/scss/variables.scss" },
    }),
    eslintPlugin(),
  ],
  define: { "process.env": {}, __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue", ".scss"],
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  optimizeDeps: {
    exclude: ["vuetify"],
    entries: ["./src/**/*.{vue,js,jsx,ts,tsx}"],
  },
  build: {
    // https://terser.org/docs/options/#format-options
    terserOptions: {
      format: {
        comments: false,
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
