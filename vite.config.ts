
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
          'utils': ['framer-motion', 'react-router-dom'],
          'home': [
            '@/components/home/Hero',
            '@/components/home/PremiumIndustryShowcase',
            '@/components/home/ClientSuccessStories'
          ],
          'chat': [
            '@/components/chat/ChatSystem',
            '@/components/chat/MessageBubble',
            '@/components/chat/ChatInput'
          ],
          'pages': [
            '@/pages/Jobs',
            '@/pages/About',
            '@/pages/Contact'
          ]
        }
      }
    },
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 500
  }
}));
