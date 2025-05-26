
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Building2, 
  Crown, 
  Eye, 
  Heart, 
  Share2, 
  Calendar,
  TrendingUp,
  Shield,
  Star,
  Users,
  Zap
} from "lucide-react";
import { SalonSale } from "@/types/salonSale";

interface EnhancedSalonSaleCardProps {
  salon: SalonSale;
  onViewDetails: (salon: SalonSale) => void;
  isFeatured?: boolean;
}

export const EnhancedSalonSaleCard = ({ 
  salon, 
  onViewDetails, 
  isFeatured = false 
}: EnhancedSalonSaleCardProps) => {
  
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'urgent': return 'destructive';
      case 'featured': return 'default';
      case 'hot': return 'secondary';
      default: return 'outline';
    }
  };

  const cardVariants = {
    hover: {
      y: -8,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="group"
    >
      <Card className={`overflow-hidden transition-all duration-500 ${
        isFeatured 
          ? 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-200 shadow-2xl' 
          : 'bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl'
      }`}>
        
        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={salon.image_url || '/placeholder.svg'}
            alt={salon.salon_name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isFeatured && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
                <Crown className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {salon.is_urgent && (
              <Badge variant="destructive" className="animate-pulse shadow-lg">
                <Zap className="h-3 w-3 mr-1" />
                Urgent Sale
              </Badge>
            )}
            <Badge variant="secondary" className="bg-green-500 text-white border-0">
              Just Listed
            </Badge>
          </div>
          
          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Hot Listing Indicator */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-red-500 text-white border-0 shadow-lg">
              <TrendingUp className="h-3 w-3 mr-1" />
              Hot Listing
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                {salon.salon_name}
              </h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{salon.city}, {salon.state}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Building2 className="h-4 w-4 mr-1" />
                <span className="text-sm capitalize">{salon.business_type}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {formatPrice(salon.asking_price)}
              </div>
              <div className="text-xs text-gray-500">Asking Price</div>
            </div>
          </div>

          {/* Description Preview */}
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {salon.description}
          </p>

          {/* Key Info */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-gray-600">Est. 2018</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-600">8 stations</span>
            </div>
          </div>

          {/* FOMO Elements */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-purple-600">
                <Eye className="h-3 w-3" />
                <span>47 views this week</span>
              </div>
              <div className="flex items-center gap-1 text-purple-600">
                <Shield className="h-3 w-3" />
                <span>3 inquiries</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={() => onViewDetails(salon)}
              className={`flex-1 ${
                isFeatured 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
              } shadow-lg`}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
            <Button variant="outline" size="sm" className="px-3">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Shield className="h-3 w-3" />
              <span>Verified Owner</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Star className="h-3 w-3" />
              <span>Premium Support</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
