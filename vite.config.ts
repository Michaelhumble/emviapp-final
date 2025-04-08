import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: ["dd2787bb-39ac-4d3f-ad8a-82ffdf26198a.lovableproject.com"],
    hmr: {
      host: "dd2787bb-39ac-4d3f-ad8a-82ffdf26198a.lovableproject.com",
      protocol: "https",
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
