// DO NOT DUPLICATE: This is the only Footer component used on EmviApp.

import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EmviApp",
    "url": "https://emvi.app",
    "logo": "https://emvi.app/logo.png",
    "description": "Connect with top beauty professionals and salons. Find talented artists, book services, and grow your beauty business with EmviApp.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "United States"
      },
      {
        "@type": "Country", 
        "name": "Vietnam"
      }
    ],
    "serviceType": [
      "Beauty Professional Marketplace",
      "Salon Services",
      "Beauty Artist Directory",
      "Salon Management Tools"
    ],
    "sameAs": [
      "https://www.facebook.com/emviapp",
      "https://www.instagram.com/emviapp",
      "https://www.linkedin.com/company/emviapp"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://emvi.app/contact"
    }
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "EmviApp",
    "image": "https://emvi.app/logo.png",
    "description": "Premier beauty professional marketplace serving Vietnamese and US beauty professionals nationwide.",
    "url": "https://emvi.app",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.8283",
      "longitude": "-98.5795"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "United States"
      },
      {
        "@type": "Country",
        "name": "Vietnam"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "39.8283",
        "longitude": "-98.5795"
      },
      "geoRadius": "10000000"
    },
    "priceRange": "$$",
    "openingHours": "Mo-Su 00:00-23:59"
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
      
      <footer className="bg-gradient-to-br from-gray-50 via-white to-purple-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  EmviApp
                </span>
              </div>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Serving Vietnamese and US beauty professionals nationwide
              </p>
              <p className="text-sm text-gray-500 italic">
                Inspired by Sunshine ☀️
              </p>
            </div>

            {/* Navigation Links */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Explore
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/" 
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blog" 
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/booking-services" 
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
                  >
                    Book Services
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/nails" 
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
                  >
                    Find Beauty Jobs
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/salons" 
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
                  >
                    Salon Marketplace
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/about" 
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <a 
                    href="/sitemap.xml" 
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>

            {/* Social & Legal */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Connect
              </h3>
              
              {/* Social Icons */}
              <div className="flex space-x-4 mb-6">
                <a
                  href="https://www.facebook.com/emviapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  aria-label="Follow EmviApp on Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/emviapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-600 transition-colors duration-200"
                  aria-label="Follow EmviApp on Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/emviapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-700 transition-colors duration-200"
                  aria-label="Follow EmviApp on LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>

              {/* Legal Links */}
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/privacy" 
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/terms" 
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © {currentYear} EmviApp. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-2 md:mt-0">
                Connecting beauty professionals worldwide
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;