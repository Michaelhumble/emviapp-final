
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Card, CardContent, CardFooter, CardHeader,
  CardTitle, CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, Home, DollarSign, Calendar, MapPin, Phone, 
  MessageSquare, CheckCircle2, Clock, Building
} from "lucide-react";

import {
  boothRentalListings,
  hairSalonListings,
  barbershopListings,
  restaurantListings,
  tattooShopListings,
  nailSalonListings
} from "@/data/mockIndustryListings";

const SampleIndustryListings = () => {
  const [activeTab, setActiveTab] = useState("booth-rentals");
  
  const tabData = [
    { id: "booth-rentals", label: "Booth Rentals", data: boothRentalListings },
    { id: "hair-salons", label: "Hair Salon Jobs", data: hairSalonListings },
    { id: "barbershops", label: "Barbershop Jobs", data: barbershopListings },
    { id: "restaurants", label: "Restaurant Listings", data: restaurantListings },
    { id: "tattoo-shops", label: "Tattoo Shop Listings", data: tattooShopListings },
    { id: "nail-salons", label: "Nail Salon Listings", data: nailSalonListings },
  ];

  // Get perks/features based on listing type
  const getPerks = (listing) => {
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
    
    return perks;
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };
  
  const renderListingCard = (listing, index) => {
    const perks = getPerks(listing);
    const isForSale = listing.employment_type === "For Sale";
    
    return (
      <motion.div
        key={listing.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="h-full"
      >
        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
          {listing.image && (
            <div 
              className="h-48 bg-center bg-cover" 
              style={{ backgroundImage: `url(${listing.image})` }}
            />
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
            
            {listing.asking_price && (
              <div className="flex items-center text-sm text-gray-700 mb-2">
                <DollarSign className="h-4 w-4 mr-1.5" /> 
                <span className="font-medium">{listing.asking_price}</span>
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
            
            <Button size="sm">
              View Details
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-2">
            Sample Industry Listings
          </h2>
          <p className="text-gray-600">
            Browse example listings across various industries. These are sample listings for demonstration purposes only.
          </p>
        </div>
        
        <Tabs 
          defaultValue="booth-rentals" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="flex flex-wrap gap-2 mb-6 h-auto">
            {tabData.map(tab => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {tabData.map(tab => (
            <TabsContent key={tab.id} value={tab.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tab.data.map((listing, index) => renderListingCard(listing, index))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default SampleIndustryListings;
