// WARNING: AppFooter is the only footer in the app. Never duplicate or create new footers.
// Only Layout.tsx is allowed to import and render AppFooter.

import React from 'react';
import { Link } from 'react-router-dom';
import EmviLogo from '@/components/branding/EmviLogo';

const AppFooter = () => {
  return (
    <footer 
      className="relative bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/20 border-t border-gray-100"
      data-footer-id="emvi-global-footer"
      data-testid="global-footer"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <EmviLogo size="medium" />
            </Link>
            <div className="font-playfair font-bold text-xl text-gray-900">
              Emvi.App
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              The first platform purpose-built for the beauty industry with embedded AI intelligence.
            </p>
          </div>

          {/* Marketplace Column */}
          <div className="space-y-4">
            <h3 className="font-playfair font-semibold text-lg text-gray-900">
              Marketplace
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/jobs" 
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-medium"
              >
                Browse Jobs
              </Link>
              <Link 
                to="/artists" 
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-medium"
              >
                Find Artists
              </Link>
              <Link 
                to="/salons" 
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-medium"
              >
                Browse Salons
              </Link>
              <Link 
                to="/booking-services" 
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-medium"
              >
                Book Services
              </Link>
              <Link 
                to="/community" 
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-medium"
              >
                Community
              </Link>
            </nav>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="font-playfair font-semibold text-lg text-gray-900">
              Company
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-medium"
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-xs text-gray-500">
              <Link 
                to="/terms" 
                className="hover:text-gray-700 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link 
                to="/privacy" 
                className="hover:text-gray-700 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/cookies" 
                className="hover:text-gray-700 transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>

            {/* Emotional Branding */}
            <div className="text-sm text-amber-600 font-medium order-first md:order-none">
              Inspired by Sunshine ☀️
            </div>

            {/* Copyright */}
            <div className="text-xs text-gray-500">
              © {new Date().getFullYear()} EmviApp. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Subtle premium overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
    </footer>
  );
};

// 🚨 EMERGENCY FOOTER CHECK: Ensure only ONE footer exists
if (typeof window !== 'undefined') {
  (window as any).emviCheckFooters = () => {
    const footers = document.querySelectorAll('[data-footer-id="emvi-global-footer"]');
    const allFooters = document.querySelectorAll('footer');
    const result = {
      footerCount: footers.length,
      totalFooterElements: allFooters.length,
      isValid: footers.length === 1 && allFooters.length === 1,
      message: footers.length === 1 && allFooters.length === 1
        ? '✅ PERFECT! Exactly one universal footer found.' 
        : `❌ CRITICAL ERROR: Found ${footers.length} AppFooters and ${allFooters.length} total footer elements. Should be exactly 1 each.`,
      route: window.location.pathname,
      timestamp: new Date().toISOString()
    };
    console.log('🚨 EmviApp Universal Footer Check:', result);
    if (!result.isValid) {
      console.error('🚨 FOOTER VIOLATION DETECTED!');
      allFooters.forEach((footer, index) => {
        console.error(`Footer ${index + 1}:`, footer);
      });
    }
    return result;
  };
  
  // Auto-verification in development
  if (process.env.NODE_ENV === 'development') {
    setTimeout(() => (window as any).emviCheckFooters(), 2000);
  }
}

export default AppFooter;