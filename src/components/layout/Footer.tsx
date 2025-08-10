// DO NOT DUPLICATE: This is the only Footer component used on EmviApp.

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Heart, Star, Sparkles, Users, Award, Globe } from 'lucide-react';

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
      
      <footer className="relative overflow-hidden">
        {/* Premium Background with Animations */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-blue-600/20 animate-pulse" />
          
          {/* Floating elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-2xl animate-bounce" />
          <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-gradient-to-r from-pink-400/30 to-purple-400/30 rounded-full blur-xl animate-bounce delay-2000" />
          
          {/* Sparkle particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Top Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-purple-400 mr-2" />
                <span className="text-2xl md:text-3xl font-bold text-white">10K+</span>
              </div>
              <p className="text-purple-200 text-sm">Beauty Professionals</p>
            </motion.div>
            
            <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-yellow-400 mr-2" />
                <span className="text-2xl md:text-3xl font-bold text-white">4.9</span>
              </div>
              <p className="text-purple-200 text-sm">Average Rating</p>
            </motion.div>
            
            <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
              <div className="flex items-center justify-center mb-2">
                <Globe className="h-6 w-6 text-blue-400 mr-2" />
                <span className="text-2xl md:text-3xl font-bold text-white">50+</span>
              </div>
              <p className="text-purple-200 text-sm">Cities Served</p>
            </motion.div>
            
            <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
              <div className="flex items-center justify-center mb-2">
                <Award className="h-6 w-6 text-pink-400 mr-2" />
                <span className="text-2xl md:text-3xl font-bold text-white">100K+</span>
              </div>
              <p className="text-purple-200 text-sm">Happy Customers</p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {/* Brand Section */}
            <motion.div className="col-span-1 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Sparkles className="h-8 w-8 text-purple-400" />
                </motion.div>
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  EmviApp
                </span>
              </div>
              <p className="text-purple-100 mb-6 text-sm leading-relaxed">
                Empowering Vietnamese and US beauty professionals with cutting-edge AI technology and global connections.
              </p>
              <motion.div 
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 w-fit"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <Heart className="h-4 w-4 text-pink-400" />
                <span className="text-sm text-purple-100">Inspired by Sunshine ☀️</span>
              </motion.div>
            </motion.div>

            {/* Navigation Links */}
            <motion.div className="col-span-1 md:col-span-1 lg:col-span-1">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center">
                <span className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mr-3"></span>
                Explore
              </h3>
              <ul className="space-y-4">
                {[
                  { to: "/", label: "Home" },
                  { to: "/artists", label: "Artists" },
                  { to: "/blog", label: "Blog" },
                  { to: "/jobs", label: "Jobs" },
                  { to: "/salons", label: "Salons for Sale" }
                ].map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <Link 
                      to={link.to}
                      className="text-purple-200 hover:text-white transition-all duration-300 text-sm group flex items-center"
                    >
                      <span className="w-0 group-hover:w-4 h-0.5 bg-purple-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div className="col-span-1 md:col-span-1 lg:col-span-1">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center">
                <span className="w-8 h-0.5 bg-gradient-to-r from-pink-400 to-blue-400 mr-3"></span>
                Company
              </h3>
              <ul className="space-y-4">
                {[
                  { to: "/about", label: "About" },
                  { to: "/contact", label: "Contact" },
                  { href: "/sitemap.xml", label: "Sitemap", external: true }
                ].map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    {link.to ? (
                      <Link 
                        to={link.to}
                        className="text-purple-200 hover:text-white transition-all duration-300 text-sm group flex items-center"
                      >
                        <span className="w-0 group-hover:w-4 h-0.5 bg-pink-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                        {link.label}
                      </Link>
                    ) : (
                      <a 
                        href={link.href}
                        className="text-purple-200 hover:text-white transition-all duration-300 text-sm group flex items-center"
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        <span className="w-0 group-hover:w-4 h-0.5 bg-pink-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                        {link.label}
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social & Legal */}
            <motion.div className="col-span-1 md:col-span-1 lg:col-span-1">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center">
                <span className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mr-3"></span>
                Connect
              </h3>
              
              {/* Social Icons */}
              <div className="flex space-x-4 mb-8">
                {[
                  { href: "https://www.facebook.com/emviapp", icon: Facebook, color: "hover:text-blue-400", label: "Facebook" },
                  { href: "https://www.instagram.com/emviapp", icon: Instagram, color: "hover:text-pink-400", label: "Instagram" },
                  { href: "https://www.linkedin.com/company/emviapp", icon: Linkedin, color: "hover:text-blue-300", label: "LinkedIn" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-purple-300 ${social.color} transition-all duration-300 transform`}
                    aria-label={`Follow EmviApp on ${social.label}`}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                      <social.icon size={20} />
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Legal Links */}
              <ul className="space-y-4">
                {[
                  { to: "/privacy", label: "Privacy Policy" },
                  { to: "/terms", label: "Terms of Service" }
                ].map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <Link 
                      to={link.to}
                      className="text-purple-200 hover:text-white transition-all duration-300 text-sm group flex items-center"
                    >
                      <span className="w-0 group-hover:w-4 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div 
            className="pt-8 border-t border-white/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.p 
                className="text-purple-200 text-sm flex items-center"
                whileHover={{ scale: 1.02 }}
              >
                <span>© {currentYear} EmviApp. All rights reserved.</span>
                <Heart className="h-4 w-4 text-pink-400 ml-2 animate-pulse" />
              </motion.p>
              <motion.p 
                className="text-purple-300 text-xs mt-2 md:mt-0 flex items-center"
                whileHover={{ scale: 1.02 }}
              >
                <Globe className="h-3 w-3 mr-1" />
                Connecting beauty professionals worldwide
              </motion.p>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;