
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
    // Force CSS compilation refresh
    devSourcemap: true,
  },
  build: {
    // Force rebuild of CSS assets
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'tailwind-styles': ['./src/index.css'],
        },
      },
    },
  },
  // Define environment variables explicitly for better error handling
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL || "https://wwhqbjrhbajpabfdwnip.supabase.co"),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aHFianJoYmFqcGFiZmR3bmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTk2OTMsImV4cCI6MjA1NzU3NTY5M30.1YGaLgfnwqmzn3f28IzmTxDKKX5NoJ1V8IbI3V4-WmM"),
    'import.meta.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyAQfGVhQ1OLV0ZgWJ1EqIBcubinphfJ8Mk")
  }
}));
