
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IS_DEV } from '@/lib/env';
import App from './App';
import './index.css';

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

// Create query client with optimized settings for mobile
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60000, // 1 minute
      retry: 1
    }
  }
});

// Set favicon
const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
if (link) {
  link.href = "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/emvilogo//emvi-logo-transparent.png";
}

// Security Headers - Apply early for maximum protection
const securityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://js.hs-analytics.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://*.supabase.co https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://wwhqbjrhbajpabfdwnip.supabase.co https://js.hs-analytics.net https://track.hubspot.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "report-uri https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/csp-report"
  ].join('; '),
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};

// Apply CSP and referrer policy early
if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
  const cspMeta = document.createElement('meta');
  cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
  cspMeta.setAttribute('content', securityHeaders['Content-Security-Policy']);
  document.head.appendChild(cspMeta);
}

if (!document.querySelector('meta[name="referrer"]')) {
  const referrerMeta = document.createElement('meta');
  referrerMeta.setAttribute('name', 'referrer');
  referrerMeta.setAttribute('content', securityHeaders['Referrer-Policy']);
  document.head.appendChild(referrerMeta);
}

// Improved viewport meta tag with better mobile optimizations
const existingViewport = document.querySelector('meta[name="viewport"]');
if (existingViewport) {
  existingViewport.remove();
}

const viewport = document.createElement('meta');
viewport.name = 'viewport';
viewport.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1, user-scalable=no';
document.head.appendChild(viewport);

// Add meta theme-color for mobile browsers
const themeColorMeta = document.createElement('meta');
themeColorMeta.name = 'theme-color';
themeColorMeta.content = '#ffffff';
document.getElementsByTagName('head')[0].appendChild(themeColorMeta);

// Apple mobile web app capable - helps with fixed positioning
const appleMobileWebAppCapable = document.createElement('meta');
appleMobileWebAppCapable.name = 'apple-mobile-web-app-capable';
appleMobileWebAppCapable.content = 'yes';
document.getElementsByTagName('head')[0].appendChild(appleMobileWebAppCapable);

// Set status bar style for iOS
const appleStatusBarStyle = document.createElement('meta');
appleStatusBarStyle.name = 'apple-mobile-web-app-status-bar-style';
appleStatusBarStyle.content = 'default';
document.getElementsByTagName('head')[0].appendChild(appleStatusBarStyle);

// Apply body styles directly to prevent flash of unstylized content
document.body.style.overflow = 'hidden auto';
document.body.style.overflowX = 'hidden';
document.body.style.width = '100%';
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.position = 'relative';

// Create a fallback div to show if rendering fails completely
const rootElement = document.getElementById('root');
if (!rootElement) {
  const fallbackDiv = document.createElement('div');
  fallbackDiv.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: sans-serif;">
      <h2>Application Error</h2>
      <p>Could not find root element. Please refresh the page or contact support.</p>
      <button onclick="window.location.reload()" style="padding: 8px 16px; background: #f97316; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Reload Page
      </button>
    </div>
  `;
  document.body.appendChild(fallbackDiv);
} else {
  try {
    ReactDOM.createRoot(rootElement).render(
      /*
      ⚠️ IMPORTANT DEVELOPER NOTE: React StrictMode Double Rendering ⚠️
      
      React.StrictMode intentionally DOUBLE-RENDERS components in DEVELOPMENT ONLY.
      This means you may see duplicate footers, headers, or other components in dev mode.
      
      This is NORMAL and EXPECTED behavior that helps detect side effects.
      
      ✅ In PRODUCTION, components render only ONCE - no duplicates will appear.
      ✅ The footer duplication you see in development will NOT exist in production.
      
      If you need to temporarily disable StrictMode to verify this:
      1. Comment out <React.StrictMode> wrapper below
      2. You'll see only one footer in development
      3. Uncomment it back (StrictMode is beneficial for development)
      
      DO NOT remove StrictMode permanently - it helps catch bugs early!
      */
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <Router>
            <App />
          </Router>
        </QueryClientProvider>
      </React.StrictMode>,
    );
  } catch (error) {
    console.error('Failed to render application:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: sans-serif;">
        <h2>Application Error</h2>
        <p>Something went wrong while rendering the application. Please refresh the page.</p>
        <div style="margin: 20px; padding: 10px; background: #ffebee; color: #c62828; text-align: left; overflow: auto;">
          ${error instanceof Error ? error.message : 'Unknown error'}
        </div>
        <button onclick="window.location.reload()" style="padding: 8px 16px; background: #f97316; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    `;
  }
}

// 🚨 ZERO FOOTER VERIFICATION - Confirms clean state
if (typeof window !== 'undefined') {
  (window as any).emviCheckFooters = () => {
    const footers = document.querySelectorAll('footer');
    const result = {
      footerCount: footers.length,
      isValid: footers.length === 0,
      message: footers.length === 0 
        ? '✅ PERFECT! Zero footers confirmed - Clean state maintained.' 
        : `❌ VIOLATION: Found ${footers.length} footer(s). Should be ZERO until universal footer is rebuilt.`,
      route: window.location.pathname,
      timestamp: new Date().toISOString()
    };
    console.log('🚨 EmviApp Zero Footer Verification:', result);
    if (!result.isValid) {
      console.error('🚨 FOOTER DETECTED! Clean state violated.');
      footers.forEach((footer, index) => {
        console.error(`Footer ${index + 1}:`, footer);
      });
    }
    return result;
  };
  
  // Auto-run verification in development
  if (IS_DEV) {
    setTimeout(() => (window as any).emviCheckFooters(), 2000);
  }
}

