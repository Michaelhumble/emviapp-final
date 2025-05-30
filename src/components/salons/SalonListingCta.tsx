
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Store, Eye } from 'lucide-react';

/**
 * Call-to-action component displayed at the bottom of salon detail pages
 * to encourage users to list their own salons
 */
const SalonListingCta = () => {
  return (
    <div className="container mx-auto py-12">
      <Card className="bg-gradient-to-br from-[#F6F6F7] via-white to-rose-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4 text-[#1A1A1A]">
                Do you have a salon to sell?
              </h2>
              <p className="text-lg text-[#555555] mb-6 font-inter">
                List your salon on EmviApp and connect with qualified buyers. Our platform helps salon owners find the right buyers quickly.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-[#9A7B69] to-[#B8956A] hover:from-[#8A6B59] hover:to-[#A8855A] text-white shadow-md hover:shadow-lg transition-all duration-300 font-playfair font-semibold px-8 py-3 rounded-lg border border-[#8A6B59]/20">
                  <Link to="/signup">
                    <Store className="mr-2 h-4 w-4" />
                    List Your Salon
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-[#9A7B69]/30 text-[#9A7B69] hover:bg-[#9A7B69]/5 font-playfair font-semibold px-8 py-3 rounded-lg">
                  <Link to="/salons">
                    <Eye className="mr-2 h-4 w-4" />
                    View Other Listings
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="aspect-square bg-gradient-to-br from-[#9A7B69]/20 to-[#B8956A]/10 rounded-full w-48 h-48 flex items-center justify-center">
                <Store className="text-[#9A7B69] text-5xl" size={80} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonListingCta;
