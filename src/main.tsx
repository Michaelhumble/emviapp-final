
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

// Global error handler for debugging white screen issues
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  const errorElement = document.createElement('div');
  errorElement.style.position = 'fixed';
  errorElement.style.top = '0';
  errorElement.style.left = '0';
  errorElement.style.right = '0';
  errorElement.style.padding = '20px';
  errorElement.style.background = 'rgba(255,0,0,0.1)';
  errorElement.style.zIndex = '9999';
  errorElement.textContent = `Error loading app: ${event.error?.message || 'Unknown error'}`;
  document.body.prepend(errorElement);
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

// Ensure favicon is accessible
try {
  const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
  if (link) {
    link.href = "./lovable-uploads/aa25a147-5384-4b72-86f0-e3cc8caba2cc.png";
    console.log("Favicon set successfully");
  } else {
    const newLink = document.createElement('link');
    newLink.rel = 'icon';
    newLink.href = "./lovable-uploads/aa25a147-5384-4b72-86f0-e3cc8caba2cc.png";
    document.head.appendChild(newLink);
    console.log("Created new favicon link");
  }
} catch (error) {
  console.error("Error setting favicon:", error);
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

// Ensure we load fonts
const ensureFontsLoaded = () => {
  try {
    const fontLink = document.createElement('link');
    fontLink.rel = 'preconnect';
    fontLink.href = 'https://fonts.googleapis.com';
    document.head.appendChild(fontLink);
    
    const fontLink2 = document.createElement('link');
    fontLink2.rel = 'preconnect';
    fontLink2.href = 'https://fonts.gstatic.com';
    fontLink2.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink2);
    
    const fontLink3 = document.createElement('link');
    fontLink3.rel = 'stylesheet';
    fontLink3.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700&display=swap';
    document.head.appendChild(fontLink3);
    
    console.log("Font stylesheets added");
  } catch (error) {
    console.error("Error loading fonts:", error);
  }
};

ensureFontsLoaded();

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
          <Router basename={import.meta.env.BASE_URL || '/'}>
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
