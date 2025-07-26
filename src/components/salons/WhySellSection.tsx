
import React from 'react';
import { Shield, Zap, Check } from 'lucide-react';

// Import testimonial images
import jessicaImg from '@/assets/testimonials/jessica-n.jpg';
import michaelImg from '@/assets/testimonials/michael-t.jpg';

const WhySellSection = () => {
  return (
    <div className="mb-12">
      <h2 className="font-playfair text-2xl font-bold mb-6 text-center">
        Why Sell on EmviApp?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Trust Badge 1 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-purple-50 p-3 rounded-full">
              <Check className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-2">Verified Beauty Industry Buyers</h3>
          <p className="text-gray-600 text-center text-sm">
            Our platform connects you with qualified buyers who are serious about their beauty business investment.
          </p>
        </div>
        
        {/* Trust Badge 2 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-50 p-3 rounded-full">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-2">Fast, Targeted Exposure</h3>
          <p className="text-gray-600 text-center text-sm">
            Get your listing in front of the right audience quickly with our industry-focused marketplace.
          </p>
        </div>
        
        {/* Trust Badge 3 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-50 p-3 rounded-full">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-2">Safe, Professional Platform</h3>
          <p className="text-gray-600 text-center text-sm">
            Our secure platform protects your information while facilitating professional connections.
          </p>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-600 italic text-sm mb-3">
              "I sold my nail salon in just 3 weeks using EmviApp. The process was seamless and the buyers were pre-qualified."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-200">
                <img 
                  src={jessicaImg} 
                  alt="Jessica N." 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">Jessica N.</p>
                  <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    <Shield className="w-3 h-3" />
                    <span>Verified Owner</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Former Owner, Polished Nails</p>
                <p className="text-xs text-gray-400">San Francisco, CA</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-600 italic text-sm mb-3">
              "Featured listing brought me serious buyers only. Worth every penny for the premium placement."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-200">
                <img 
                  src={michaelImg} 
                  alt="Michael T." 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">Michael T.</p>
                  <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    <Shield className="w-3 h-3" />
                    <span>Verified Owner</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Salon & Spa Entrepreneur</p>
                <p className="text-xs text-gray-400">Dallas, TX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhySellSection;
