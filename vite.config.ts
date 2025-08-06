
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
          // Core React libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // UI component libraries
          'vendor-ui': [
            '@radix-ui/react-dialog', 
            '@radix-ui/react-popover', 
            '@radix-ui/react-toast',
            '@radix-ui/react-avatar',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-accordion',
            '@radix-ui/react-select'
          ],
          // Authentication and backend
          'vendor-auth': ['@supabase/supabase-js', '@tanstack/react-query'],
          // Animation libraries
          'vendor-animation': ['framer-motion', 'canvas-confetti'],
          // Critical path components (loaded immediately)
          'critical': [
            '@/components/home/Hero',
            '@/components/home/JobsCallToAction',
            '@/components/layout/Navbar',
            '@/components/layout/Footer'
          ],
          // Home page lazy-loaded sections
          'home-lazy': [
            '@/components/home/PremiumIndustryShowcase',
            '@/components/home/ClientSuccessStories',
            '@/components/home/ai-matchmaker',
            '@/components/home/SalonClientGrowthSystem'
          ],
          // Chat system (heavy component)
          'chat': [
            '@/components/chat/SunshineChat',
            '@/components/chat/SunshineButton',
            '@/components/chat/LazyChatSystem'
          ],
          // Blog system
          'blog': [
            '@/pages/blog/BlogLanding',
            '@/pages/blog/[slug]',
            '@/data/blogArticles'
          ],
          // Job system
          'jobs': [
            '@/components/jobs/JobListingCard',
            '@/components/jobs/JobFilters',
            '@/components/jobs/JobLoadingState',
            '@/data/protected/vietnameseJobs'
          ],
          // Dashboard components (heavy)
          'dashboard': [
            '@/pages/dashboard/artist/BookingCalendar',
            '@/pages/dashboard/artist/BookingCalendarNew',
            '@/pages/dashboard/artist/Inbox'
          ],
          // Form components
          'forms': [
            '@/components/jobs/FreeJobPostingForm',
            '@/components/jobs/PaidJobTestForm', 
            'react-hook-form',
            'zod'
          ]
        }
      }
    },
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 400, // Reduced for stricter bundle size control
    assetsInlineLimit: 2048, // Reduced to 2KB for better caching
    cssCodeSplit: true,
    reportCompressedSize: false, // Disable for faster builds
    modulePreload: {
      polyfill: true
    }
  }
}));
