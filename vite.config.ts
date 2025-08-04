
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-popover', '@radix-ui/react-toast'],
          'auth': ['@supabase/supabase-js'],
          'critical': [
            '@/components/home/Hero',
            '@/components/home/JobsCallToAction',
            '@/components/layout/Navbar'
          ],
          'home-lazy': [
            '@/components/home/PremiumIndustryShowcase',
            '@/components/home/ClientSuccessStories',
            '@/components/home/ai-matchmaker',
            '@/components/home/SalonClientGrowthSystem'
          ],
          'chat': [
            '@/components/chat/ChatSystem',
            '@/components/chat/MessageBubble',
            '@/components/chat/ChatInput'
          ]
        }
      }
    },
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 300
  }
}));
