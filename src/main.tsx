
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

// Update favicon link with the corrected Emvi logo URL (removed double slash)
const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
if (link) {
  link.href = "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/emvilogo/emvi-logo-transparent.png";
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
