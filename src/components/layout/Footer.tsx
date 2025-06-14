
import React from 'react';
import { Heart, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#FDFDFD] border-t border-[#F6F6F7] mt-auto">
      {/* Emotional Bar */}
      <div className="bg-gradient-to-r from-[#FAF3F0] to-[#F6F6F7] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-full px-6 py-2 shadow-sm">
              <p className="text-[#9A7B69] font-playfair text-sm italic">
                Inspired by Sunshine ☀️
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#E38D6B] to-[#9A7B69] rounded-lg flex items-center justify-center">
                <Heart className="h-4 w-4 text-white fill-white" />
              </div>
              <span className="text-xl font-playfair font-semibold text-[#1A1A1A]">EmviApp</span>
            </div>
            <p className="text-sm text-[#9A7B69] mb-4 font-inter">
              Connecting beauty professionals with their perfect opportunities.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[#1A1A1A] font-playfair font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-3">
              <li><a href="/artists" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors font-inter text-sm">Find Artists</a></li>
              <li><a href="/salons" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors font-inter text-sm">Browse Salons</a></li>
              <li><a href="/jobs" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors font-inter text-sm">Job Listings</a></li>
              <li><a href="/community" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors font-inter text-sm">Community</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[#1A1A1A] font-playfair font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="/about" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors font-inter text-sm">About Us</a></li>
              <li><a href="/careers" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors font-inter text-sm">Careers</a></li>
              <li><a href="/contact" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors font-inter text-sm">Contact</a></li>
              <li><a href="/blog" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors font-inter text-sm">Blog</a></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-[#1A1A1A] font-playfair font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3 mb-6">
              <li><a href="/terms" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors font-inter text-sm">Terms of Service</a></li>
              <li><a href="/privacy" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors font-inter text-sm">Privacy Policy</a></li>
              <li><a href="/cookies" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors font-inter text-sm">Cookie Policy</a></li>
            </ul>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Policy Row with Emojis */}
        <div className="border-t border-[#F6F6F7] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-sm font-inter">
              <a href="/refund" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors">💰 Refund Policy</a>
              <a href="/shipping" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors">🚚 Shipping Info</a>
              <a href="/support" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors">💬 Support</a>
              <a href="/accessibility" className="text-[#9A7B69] hover:text-[#E38D6B] transition-colors">♿ Accessibility</a>
            </div>
            <p className="text-[#9A7B69] text-sm font-inter">
              © 2024 EmviApp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
