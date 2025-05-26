
import React from "react";
import { motion } from "framer-motion";
import { SalonSale } from "@/types/salonSale";
import { EnhancedSalonSaleCard } from "./EnhancedSalonSaleCard";
import { Loader2, Crown, TrendingUp, Eye, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface EnhancedSalonSalesGridProps {
  salonSales: SalonSale[];
  isLoading: boolean;
  onViewDetails: (salon: SalonSale) => void;
}

export const EnhancedSalonSalesGrid = ({ 
  salonSales, 
  isLoading, 
  onViewDetails 
}: EnhancedSalonSalesGridProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading exclusive salon opportunities...</p>
        </div>
      </div>
    );
  }

  if (salonSales.length === 0) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 rounded-2xl">
        <div className="max-w-md mx-auto">
          <div className="h-24 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
            <Crown className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            No Salon Listings Found
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Be the first to list your salon in this exclusive marketplace. 
            Join successful salon owners who've sold with EmviApp.
          </p>
          <Button 
            onClick={() => navigate("/sell-salon/new")} 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl"
            size="lg"
          >
            <Crown className="h-5 w-5 mr-2" />
            List Your Salon
          </Button>
        </div>
      </div>
    );
  }

  // Separate featured and regular listings
  const featuredListings = salonSales.filter(salon => salon.is_featured);
  const regularListings = salonSales.filter(salon => !salon.is_featured);

  return (
    <div className="space-y-12">
      {/* FOMO Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 text-white rounded-2xl p-6 shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <TrendingUp className="h-8 w-8" />
            <div>
              <div className="text-2xl font-bold">127</div>
              <div className="text-sm opacity-90">Salons Sold This Year</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Eye className="h-8 w-8" />
            <div>
              <div className="text-2xl font-bold">8.3k</div>
              <div className="text-sm opacity-90">Active Buyers</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Crown className="h-8 w-8" />
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm opacity-90">Featured Spots Left</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Users className="h-8 w-8" />
            <div>
              <div className="text-2xl font-bold">$2.1M</div>
              <div className="text-sm opacity-90">Avg. Sale Price</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Listings */}
      {featuredListings.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-serif font-bold">Featured Salon Opportunities</h2>
            </div>
            <div className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
              Premium Listings • Verified Owners
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredListings.map((salon, index) => (
              <motion.div
                key={salon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <EnhancedSalonSaleCard 
                  salon={salon} 
                  onViewDetails={onViewDetails}
                  isFeatured={true}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Regular Listings */}
      {regularListings.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: featuredListings.length > 0 ? 0.4 : 0.2 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold">All Salon Listings</h2>
            <div className="text-sm text-gray-600">
              {regularListings.length} salon{regularListings.length !== 1 ? 's' : ''} available
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {regularListings.map((salon, index) => (
              <motion.div
                key={salon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <EnhancedSalonSaleCard 
                  salon={salon} 
                  onViewDetails={onViewDetails}
                  isFeatured={false}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Success Stories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8"
      >
        <h3 className="text-xl font-serif font-bold text-center mb-6">Success Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">$485K</div>
            <div className="text-sm text-green-700">"Sold 30% above asking price in 2 weeks"</div>
            <div className="text-xs text-green-600 mt-1">- Maria's Nail Spa, Los Angeles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">$320K</div>
            <div className="text-sm text-green-700">"Found the perfect buyer who kept my team"</div>
            <div className="text-xs text-green-600 mt-1">- Golden Hair Studio, Miami</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">$750K</div>
            <div className="text-sm text-green-700">"Diamond listing brought serious investors"</div>
            <div className="text-xs text-green-600 mt-1">- Luxury Day Spa, Manhattan</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
