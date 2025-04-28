
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

const SalonListingCta = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 p-6 md:p-8 mb-12">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-100 rounded-full opacity-50 blur-3xl"/>
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-blue-100 rounded-full opacity-40 blur-3xl"/>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-block">
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 font-medium py-1 px-3 mb-2">
                Free for a Limited Time
              </Badge>
            </div>
            
            <h2 className="font-playfair text-2xl md:text-3xl font-bold">
              Sell Your Salon or Booth Rental — Reach Thousands of Buyers
            </h2>
            
            <p className="text-gray-600">
              Join EmviApp's exclusive marketplace for beauty professionals and connect with qualified buyers looking for their next opportunity.
            </p>
            
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-white p-1.5 rounded-full shadow-sm border border-purple-100">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"></div>
                </div>
                <span className="text-sm font-medium">Standard Listing: $49</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-white p-1.5 rounded-full shadow-sm border border-purple-100">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
                </div>
                <span className="text-sm font-medium">Featured Listing: $99 (Highlighted, Top Placement)</span>
              </div>
            </div>
          </div>
          
          <div className="shrink-0">
            <Link to="/salons/list">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-6 h-auto group">
                List Your Salon Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonListingCta;
