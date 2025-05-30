
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { Store, Sparkles } from 'lucide-react';

const SalonPromotion: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#F6F6F7] via-white to-[#F6F6F7] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#9A7B69]/20 text-center mb-8">
      <div className="flex items-center justify-center mb-3">
        <Store className="h-6 w-6 text-[#9A7B69] mr-2" />
        <h3 className="font-playfair font-semibold text-xl text-[#1A1A1A]">List Your Salon on EmviApp</h3>
      </div>
      <p className="text-[#555555] mb-4 font-inter">
        Reach thousands of potential clients and talented nail technicians looking for their next opportunity.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <Badge variant="outline" className="bg-white text-[#555555] font-inter font-normal text-sm py-1.5 px-4 border-[#9A7B69]/30">
          Standard Listing: $49
        </Badge>
        <Badge variant="outline" className="bg-white text-[#555555] font-inter font-normal text-sm py-1.5 px-4 border-[#9A7B69]/30">
          Featured Listing: $99
        </Badge>
        <Link to="/sign-up">
          <Button className="bg-gradient-to-r from-[#9A7B69] to-[#B8956A] hover:from-[#8A6B59] hover:to-[#A8855A] text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-playfair font-semibold border border-[#8A6B59]/20">
            <Sparkles className="mr-2 h-4 w-4" />
            List Your Salon
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SalonPromotion;
