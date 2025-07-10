import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, MapPin, DollarSign, Phone, Eye, LockIcon } from 'lucide-react';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const MagicNailsDiamondCard: React.FC = () => {
  const { isSignedIn } = useAuth();

  const handleViewDetails = () => {
    // Handle view details logic
    console.log('View Magic Nails details');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="relative"
    >
      <Card className="h-full border-2 border-blue-300 shadow-2xl shadow-blue-200/50 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        {/* Premium glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-30"></div>
        
        <div className="relative aspect-video">
          <ImageWithFallback
            src="/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png"
            alt="Magic Nails, Great Falls, MT"
            className="w-full h-full object-cover"
            businessName="Magic Nails"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-blue-600 text-white border-0 font-bold px-3 py-1 text-sm" style={{ backgroundColor: '#2176FF' }}>
              <Crown className="w-3 h-3 mr-1" />
              Diamond
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge className="bg-yellow-500 text-white border-0 font-bold px-2 py-1 text-xs">
              ⭐ Featured by EmviApp
            </Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>

        <CardContent className="p-6 relative">
          <h3 className="text-xl font-playfair font-bold text-foreground mb-2">
            Tìm Thợ Nails – Magic Nails, Great Falls, MT
          </h3>

          <div className="flex items-center text-muted-foreground mb-2 font-inter">
            <MapPin className="w-4 h-4 mr-2" />
            Great Falls, MT
          </div>

          <div className="bg-green-100 rounded-lg p-3 mb-3">
            <div className="flex items-center text-green-800 font-bold">
              <DollarSign className="w-4 h-4 mr-1" />
              $1,200–$1,500/tuần
            </div>
          </div>

          <p className="text-muted-foreground font-inter mb-4 line-clamp-2">
            Magic Nails cần thợ biết làm bột và tay chân nước.
          </p>

          {/* Contact Info - Gated */}
          <div className="mb-4">
            {isSignedIn ? (
              <div className="flex items-center text-foreground font-inter">
                <Phone className="w-4 h-4 mr-2" />
                (406) 770-3070
              </div>
            ) : (
              <AuthAction
                customTitle="Sign in to see contact details"
                onAction={() => true}
                fallbackContent={
                  <div className="text-base text-muted-foreground italic flex items-center gap-2 font-inter">
                    <LockIcon className="w-4 h-4" />
                    <span>Sign in to see contact details</span>
                  </div>
                }
              />
            )}
          </div>

          <Button
            onClick={handleViewDetails}
            className="w-full text-white font-inter font-bold transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: '#2176FF' }}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Full Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MagicNailsDiamondCard;