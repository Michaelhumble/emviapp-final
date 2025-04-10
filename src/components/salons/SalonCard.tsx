
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, Phone, DollarSign, Users, Building, 
  Ruler, Sparkles, Info, Check, Home 
} from "lucide-react";
import { Job } from "@/types/job";

interface SalonCardProps {
  salon: Job;
  index: number;
  isExpired: boolean;
  onViewDetails: (salon: Job) => void;
}

const SalonCard = ({ salon, index, isExpired, onViewDetails }: SalonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: (parseInt(salon.id) - 100) * 0.1 }}
    >
      <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full ${isExpired ? 'border-orange-200' : ''}`}>
        {isExpired && (
          <div className="bg-orange-50 border-b border-orange-200 p-3 text-center">
            <p className="text-orange-800 text-sm">
              Tin đã hết hạn – Vui lòng đăng lại để tiếp tục tiếp cận khách hàng mới.
            </p>
          </div>
        )}
        
        <div 
          className="h-56 bg-center bg-cover relative" 
          style={{ backgroundImage: `url(${salon.image || ''})` }}
        >
          <div className="absolute inset-0 bg-black/30 flex items-end">
            <div className="p-4 w-full flex justify-between items-end">
              <Badge className="bg-primary/90 hover:bg-primary text-white text-lg py-1 px-3">
                {salon.asking_price}
              </Badge>
              
              {salon.emvi_ai_boosted && (
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  Được EmviAI quảng bá toàn quốc
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <CardContent className="p-5">
          <div className="mb-3">
            <h3 className="font-bold text-lg font-serif">{salon.company}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{salon.location}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-sm">
              <Building className="w-4 h-4 mr-2 text-gray-500" />
              <span>Rent: {salon.monthly_rent}</span>
            </div>
            <div className="flex items-center text-sm">
              <Users className="w-4 h-4 mr-2 text-gray-500" />
              <span>{salon.number_of_stations} Stations</span>
            </div>
            <div className="flex items-center text-sm">
              <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
              <span>Rev: {salon.revenue}</span>
            </div>
            <div className="flex items-center text-sm">
              <Ruler className="w-4 h-4 mr-2 text-gray-500" />
              <span>{salon.square_feet} sqft</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {salon.salon_features?.map((feature, index) => (
              <Badge key={index} variant="outline" className="bg-purple-50">
                {feature}
              </Badge>
            ))}
            
            {salon.has_housing && (
              <Badge variant="outline" className="bg-green-50 text-green-800">
                <Home className="w-3 h-3 mr-1" />
                Chỗ ở
              </Badge>
            )}
            
            {salon.owner_will_train && (
              <Badge variant="outline" className="bg-blue-50 text-blue-800">
                <Check className="w-3 h-3 mr-1" />
                Training
              </Badge>
            )}
          </div>
          
          <div className="mt-3 mb-4 text-sm border-l-2 border-primary pl-3 italic">
            <p className="mb-1">{salon.vietnamese_description}</p>
            <p className="text-gray-600">{salon.description}</p>
          </div>
          
          <div className="mt-3 mb-2 text-sm">
            <div className="flex items-center text-gray-700">
              <Info className="w-4 h-4 mr-2 text-gray-500" />
              <span>Lý do bán: {salon.reason_for_selling}</span>
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            {!isExpired ? (
              <>
                <Button variant="outline" className="gap-1">
                  <Phone className="h-4 w-4" />
                  {salon.contact_info?.phone}
                </Button>
                <Button onClick={() => onViewDetails(salon)}>
                  View Details
                </Button>
              </>
            ) : (
              <div className="w-full">
                <Button className="w-full" variant="outline">
                  Contact for more information
                </Button>
              </div>
            )}
          </div>
          
          <div className="text-xs text-center text-gray-500 mt-4 pt-2 border-t">
            Want your ad seen nationwide? 
            <Button variant="link" className="text-xs p-0 h-auto ml-1">Boost Ad</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalonCard;
