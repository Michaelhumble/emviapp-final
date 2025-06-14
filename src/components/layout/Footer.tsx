
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Emotional Bar */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="bg-white/70 rounded-full px-6 py-2 shadow-sm">
              <p className="font-playfair text-lg text-gray-700 text-center">
                Inspired by Sunshine ☀️
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link to="/" className="text-2xl font-playfair font-bold text-gray-900">
                EmviApp
              </Link>
              <p className="text-gray-600 mt-2 font-inter text-sm leading-relaxed">
                Connecting beauty professionals with opportunities across the industry.
              </p>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-1">
            <h3 className="font-playfair font-semibold text-gray-900 mb-4">Explore</h3>
            <ul className="space-y-3 font-inter text-sm">
              <li><Link to="/artists" className="text-gray-600 hover:text-gray-900 transition-colors">Find Artists</Link></li>
              <li><Link to="/salons" className="text-gray-600 hover:text-gray-900 transition-colors">Browse Salons</Link></li>
              <li><Link to="/jobs" className="text-gray-600 hover:text-gray-900 transition-colors">Job Opportunities</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-1">
            <h3 className="font-playfair font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3 font-inter text-sm">
              <li><Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="lg:col-span-1">
            <h3 className="font-playfair font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3 font-inter text-sm mb-6">
              <li><Link to="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-gray-600 hover:text-gray-900 transition-colors">Cookie Policy</Link></li>
            </ul>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Policy Row */}
        <div className="border-t border-gray-100 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-inter text-sm text-gray-500">
              © 2024 EmviApp. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center space-x-6 font-inter text-sm">
              <Link to="/terms" className="text-gray-500 hover:text-gray-700 transition-colors">
                📋 Terms
              </Link>
              <Link to="/privacy" className="text-gray-500 hover:text-gray-700 transition-colors">
                🔒 Privacy
              </Link>
              <Link to="/cookies" className="text-gray-500 hover:text-gray-700 transition-colors">
                🍪 Cookies
              </Link>
              <Link to="/refund" className="text-gray-500 hover:text-gray-700 transition-colors">
                💰 Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
