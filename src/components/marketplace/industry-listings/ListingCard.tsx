
import { motion } from "framer-motion";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, Phone, DollarSign, Calendar, MessageSquare, 
  CheckCircle2, Building, Clock, Heart 
} from "lucide-react";
import { Job } from "@/types/job";
import { useState } from "react";

interface ListingCardProps {
  listing: Job;
  index: number;
}

const ListingCard = ({ listing, index }: ListingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  
  const isForSale = listing.employment_type === "For Sale";
  
  // Get perks/features based on listing type
  const getPerks = (listing: Job) => {
    const perks = [];
    
    if (listing.weekly_pay) perks.push("Weekly Pay");
    if (listing.owner_will_train) perks.push("Training Provided");
    if (listing.has_housing) perks.push("Housing Available");
    if (listing.no_supply_deduction) perks.push("No Supply Deduction");
    
    // Add salon features if available
    if (listing.salon_features && listing.salon_features.length > 0) {
      perks.push(...listing.salon_features.slice(0, 2));
    }
    
    // Add benefits if available
    if (listing.benefits && listing.benefits.length > 0) {
      perks.push(...listing.benefits.slice(0, 2));
    }
    
    // Add features if available
    if (listing.features && listing.features.length > 0) {
      perks.push(...listing.features.slice(0, 2));
    }
    
    return perks;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const perks = getPerks(listing);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className={`h-full flex flex-col transition-all duration-300 ${isHovered ? 'shadow-lg transform translate-y-[-4px]' : 'shadow'}`}
      >
        {listing.image && (
          <div className="relative overflow-hidden">
            <div 
              className={`h-48 bg-center bg-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
              style={{ backgroundImage: `url(${listing.image})` }}
            />
            <div className="absolute top-2 right-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`rounded-full ${isFavorited ? 'bg-red-100' : 'bg-white/80'} hover:bg-red-100 backdrop-blur-sm`}
                onClick={toggleFavorite}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-1/3" />
          </div>
        )}
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-serif">
                {listing.title}
              </CardTitle>
              <CardDescription className="font-medium text-base">
                {listing.company}
              </CardDescription>
            </div>
            <Badge className={`${isForSale ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'} font-medium`}>
              {listing.employment_type}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1.5" /> {listing.location}
          </div>
          
          {listing.salary_range && (
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <DollarSign className="h-4 w-4 mr-1.5" /> {listing.salary_range}
            </div>
          )}
          
          {listing.compensation_details && !listing.salary_range && (
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <DollarSign className="h-4 w-4 mr-1.5" /> {listing.compensation_details}
            </div>
          )}
          
          {listing.price && (
            <div className="flex items-center text-sm text-gray-700 mb-2">
              <DollarSign className="h-4 w-4 mr-1.5" /> 
              <span className="font-medium">{listing.price}</span>
              {listing.monthly_rent && <span className="text-gray-500 ml-2">| Rent: {listing.monthly_rent}</span>}
            </div>
          )}
          
          {isForSale && listing.reason_for_selling && (
            <div className="flex items-start text-sm text-gray-600 mb-2">
              <Building className="h-4 w-4 mr-1.5 mt-0.5" /> 
              <span>Reason: {listing.reason_for_selling}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <Calendar className="h-4 w-4 mr-1.5" /> 
            <span>Posted: {formatDate(listing.created_at)}</span>
          </div>
          
          {listing.description && (
            <p className="text-sm text-gray-700 mb-4 line-clamp-3">
              {listing.description}
            </p>
          )}
          
          {listing.vietnamese_description && (
            <p className="text-sm text-gray-700 italic mb-4 line-clamp-2">
              {listing.vietnamese_description}
            </p>
          )}
          
          {listing.specialties && listing.specialties.length > 0 && (
            <div className="mb-3">
              <div className="text-xs font-medium text-gray-500 mb-1">SPECIALTIES:</div>
              <div className="flex flex-wrap gap-1.5">
                {listing.specialties.map((specialty, i) => (
                  <Badge key={i} variant="outline" className="text-xs bg-gray-50">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {perks.length > 0 && (
            <div className="mb-4">
              <div className="text-xs font-medium text-gray-500 mb-1">PERKS & FEATURES:</div>
              <div className="flex flex-wrap gap-1.5">
                {perks.map((perk, i) => (
                  <Badge key={i} variant="outline" className="text-xs bg-green-50 text-green-800 border-green-100">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> {perk}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-1 pb-4 flex justify-between">
          {listing.contact_info?.phone ? (
            <Button variant="outline" size="sm" className="gap-1">
              <Phone className="h-4 w-4" />
              {listing.contact_info.phone}
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="gap-1">
              <MessageSquare className="h-4 w-4" />
              Message
            </Button>
          )}
          
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ListingCard;
