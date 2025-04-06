
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Star, TrendingUp, Check } from "lucide-react";
import { motion } from "framer-motion";

const ArtistUpgradeSection = () => {
  // Example badge features
  const verifiedBadgeFeatures = [
    "Trust badge on your profile",
    "Background check verification",
    "Higher placement in search results",
    "Increased client trust"
  ];
  
  const featuredArtistFeatures = [
    "Featured on EmviApp homepage",
    "Highlighted in local searches",
    "Premium profile appearance",
    "Priority client matching"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-serif">Upgrade Options</CardTitle>
        <CardDescription>Enhance your visibility and credibility</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Verified Artist Badge */}
        <motion.div 
          className="rounded-lg border bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Verified Artist</h3>
                <p className="text-xs text-blue-700">Build trust with potential clients</p>
              </div>
            </div>
            
            <ul className="space-y-2 mb-4">
              {verifiedBadgeFeatures.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-4 w-4 text-blue-500 mt-0.5 mr-1.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Get Verified - $29.99
            </Button>
          </div>
        </motion.div>
        
        {/* Featured Artist */}
        <motion.div 
          className="rounded-lg border bg-gradient-to-r from-amber-50 to-orange-50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <Star className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium">Featured Artist</h3>
                <p className="text-xs text-amber-700">Stand out from the competition</p>
              </div>
            </div>
            
            <ul className="space-y-2 mb-4">
              {featuredArtistFeatures.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-4 w-4 text-amber-500 mt-0.5 mr-1.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button className="w-full bg-amber-600 hover:bg-amber-700">
              Get Featured - $49.99/month
            </Button>
          </div>
        </motion.div>
        
        {/* Growth stats teaser */}
        <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-purple-600" />
            <span className="text-xs font-medium text-purple-800">
              Artists with badges receive 3.2x more client inquiries!
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistUpgradeSection;
