
// DO NOT DUPLICATE. AppFooter is the universal footer — import ONLY in Layout.tsx!

import React from 'react';
import { Link } from 'react-router-dom';
import EmviLogo from '@/components/branding/EmviLogo';

/* 
🚨 CRITICAL DEVELOPER WARNING - READ BEFORE EDITING 🚨

⚠️ DUPLICATE FOOTER PREVENTION - UNIVERSAL LOCKDOWN ⚠️

This AppFooter component is the SINGLE, UNIVERSAL footer for the entire app.

🔒 STRICT RULES - VIOLATION WILL BREAK THE APP:
✅ Only Layout.tsx imports and renders this component
❌ NEVER import AppFooter in any other file
❌ NEVER create custom footers on individual pages  
❌ NEVER duplicate footer JSX anywhere in the codebase
❌ NEVER render multiple <Layout> wrappers

🐛 IF YOU SEE DUPLICATE FOOTERS:
• In DEVELOPMENT: This is React.StrictMode double-rendering (NORMAL)
• In PRODUCTION: Search for unauthorized AppFooter imports

💡 TO MODIFY FOOTER:
• Only edit this ONE file
• Changes apply across the ENTIRE app
• Test on multiple pages to verify consistency

🚨 EMERGENCY DEBUGGING:
• Run: window.emviCheckFooters() in browser console
• Should return: { footerCount: 1, isValid: true }

DO NOT IGNORE THESE WARNINGS - THEY PREVENT CRITICAL UI BUGS
*/

const AppFooter = () => {
  return (
    <footer 
      className="relative bg-gradient-to-br from-white via-purple-50/20 to-indigo-50/10 border-t border-gray-100"
      data-footer-id="emvi-global-footer"
      data-testid="global-footer"
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Left Column - Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <EmviLogo size="medium" />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              The first platform purpose-built for the beauty industry with embedded AI intelligence.
            </p>
          </div>

          {/* Center Column - Marketplace */}
          <div className="space-y-4">
            <h3 className="font-playfair font-semibold text-lg text-gray-800">
              Marketplace
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/jobs" 
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
              >
                Browse Jobs
              </Link>
              <Link 
                to="/artists" 
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
              >
                Find Artists
              </Link>
              <Link 
                to="/salons" 
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
              >
                Browse Salons
              </Link>
              <Link 
                to="/booking-services" 
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
              >
                Book Services
              </Link>
              <Link 
                to="/community" 
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
              >
                Community
              </Link>
            </nav>
          </div>

          {/* Right Column - Company */}
          <div className="space-y-4">
            <h3 className="font-playfair font-semibold text-lg text-gray-800">
              Company
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Legal Links Row */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link 
              to="/terms" 
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 text-xs"
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy" 
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 text-xs"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/cookies" 
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 text-xs"
            >
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Bottom Accent Row */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center space-y-3">
          <p className="text-amber-600 text-sm font-medium">
            Inspired by Sunshine ☀️
          </p>
          <p className="text-gray-500 text-xs">
            Copyright © 2025 EmviApp. All rights reserved.
          </p>
        </div>
      </div>

      {/* Subtle gradient overlay for premium effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
    </footer>
  );
};

// 🐛 EMERGENCY FOOTER CHECK: Expose footer verification in browser console
if (typeof window !== 'undefined') {
  (window as any).emviCheckFooters = () => {
    const footers = document.querySelectorAll('[data-footer-id="emvi-global-footer"]');
    const layoutFooters = document.querySelectorAll('footer');
    const result = {
      footerCount: footers.length,
      totalFooterElements: layoutFooters.length,
      isValid: footers.length === 1 && layoutFooters.length === 1,
      message: footers.length === 1 && layoutFooters.length === 1
        ? '✅ PERFECT! Exactly one universal footer found.' 
        : `❌ CRITICAL ERROR: Found ${footers.length} AppFooters and ${layoutFooters.length} total footer elements. Should be exactly 1 each.`,
      route: window.location.pathname,
      timestamp: new Date().toISOString()
    };
    console.log('🚨 EmviApp Footer Security Check:', result);
    if (!result.isValid) {
      console.error('🚨 DUPLICATE FOOTER DETECTED! Run emergency cleanup immediately.');
      layoutFooters.forEach((footer, index) => {
        console.error(`Footer ${index + 1}:`, footer);
      });
    }
    return result;
  };
  
  // Auto-run check after page loads in development
  if (process.env.NODE_ENV === 'development') {
    setTimeout(() => (window as any).emviCheckFooters(), 2000);
  }
}

export default AppFooter;
