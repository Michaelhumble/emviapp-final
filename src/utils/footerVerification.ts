
/**
 * Footer Verification Utility
 * 
 * This utility helps verify that only ONE footer exists on the page.
 * Use this for debugging if you suspect duplicate footers in production.
 */

export const verifyFooterUniqueness = (): {
  footerCount: number;
  isValid: boolean;
  message: string;
} => {
  const footers = document.querySelectorAll('[data-footer-id="emvi-global-footer"]');
  const footerCount = footers.length;
  
  const result = {
    footerCount,
    isValid: footerCount === 1,
    message: ''
  };
  
  if (footerCount === 0) {
    result.message = '❌ No footer found on page';
    console.error('Footer verification failed: No footer found');
  } else if (footerCount === 1) {
    result.message = '✅ Exactly one footer found (correct)';
    console.log('Footer verification passed: Single footer detected');
  } else {
    result.message = `❌ ${footerCount} footers found (should be 1)`;
    console.error(`Footer verification failed: ${footerCount} footers detected`);
    
    // Log details about duplicate footers
    footers.forEach((footer, index) => {
      console.error(`Footer ${index + 1}:`, footer);
    });
    
    // Check for potential causes
    const layouts = document.querySelectorAll('[data-testid*="layout"]');
    if (layouts.length > 1) {
      console.error(`Potential cause: ${layouts.length} Layout components detected`);
    }
  }
  
  return result;
};

// Auto-run verification in development
if (process.env.NODE_ENV === 'development') {
  // Run verification after DOM loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(verifyFooterUniqueness, 1000);
    });
  } else {
    setTimeout(verifyFooterUniqueness, 1000);
  }
}
