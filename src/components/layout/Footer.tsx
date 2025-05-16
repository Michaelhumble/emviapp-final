import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "@/components/ui/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Logo size="large" showText={true} />
            <p className="text-gray-600 mt-4">
              The first platform purpose-built for the beauty industry with embedded AI intelligence.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/artists" className="text-gray-600 hover:text-primary">Find Artists</Link></li>
              <li><Link to="/salons" className="text-gray-600 hover:text-primary">Browse Salons</Link></li>
              <li><Link to="/jobs" className="text-gray-600 hover:text-primary">Job Openings</Link></li>
              <li><Link to="/freelancers" className="text-gray-600 hover:text-primary">Freelancers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-primary">Pricing</Link></li>
              <li><Link to="/early-access" className="text-gray-600 hover:text-primary">Early Access</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-600 hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-gray-600 hover:text-primary">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Added additional legal links at the bottom */}
        <div className="border-t border-gray-200 pt-6 mt-6 text-center">
          {/* Enhanced "Inspired by Sunshine" credit with gradient text */}
          <p className="mb-4">
            <span className="text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">
              Inspired by Sunshine ☀️
            </span>
          </p>
          
          {/* New legal links row - UPDATED with Privacy and Cookie links */}
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <Link to="/terms" className="text-gray-600 hover:text-primary hover:underline text-sm flex items-center">
              <span className="mr-1">📄</span> Terms of Service
            </Link>
            <Link to="/refund" className="text-gray-600 hover:text-primary hover:underline text-sm flex items-center">
              <span className="mr-1">💸</span> Refund Policy
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-primary hover:underline text-sm flex items-center">
              <span className="mr-1">🔐</span> Privacy Policy
            </Link>
            <Link to="/cookies" className="text-gray-600 hover:text-primary hover:underline text-sm flex items-center">
              <span className="mr-1">🍪</span> Cookie Policy
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary hover:underline text-sm flex items-center">
              <span className="mr-1">📬</span> Contact Us
            </Link>
          </div>
          
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} EmviApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
