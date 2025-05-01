
/**
 * Utility to detect and handle chunk loading errors
 */

// Add event listener to detect and handle chunk loading errors
export const setupChunkErrorHandler = () => {
  window.addEventListener('error', (event) => {
    // Check if the error is related to a chunk loading failure
    if (
      event.message && 
      (event.message.includes('Loading chunk') || 
       event.message.includes('Unexpected token'))
    ) {
      console.error('Chunk loading error detected:', event.message);
      
      // Attempt to recover by reloading the page
      if (confirm('Application error detected. Would you like to reload the page?')) {
        window.location.reload();
      }
    }
  });
};

// Function to log resource loading errors
export const logResourceErrors = () => {
  const originalFetch = window.fetch;
  
  window.fetch = function(...args) {
    return originalFetch.apply(this, args)
      .catch(err => {
        if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          console.error(`Resource fetch error for ${args[0]}:`, err);
        }
        throw err;
      });
  };
};

