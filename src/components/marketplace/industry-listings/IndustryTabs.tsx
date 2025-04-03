
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabSection from "./TabSection";
import { 
  boothRentalListings,
  hairSalonListings,
  barbershopListings,
  restaurantListings,
  tattooShopListings,
  nailSalonListings
} from "@/data/mockIndustryListings";

interface TabData {
  id: string;
  label: string;
  data: any[];
}

const IndustryTabs = () => {
  const [activeTab, setActiveTab] = useState("booth-rentals");
  
  const tabData: TabData[] = [
    { id: "booth-rentals", label: "Booth Rentals", data: boothRentalListings },
    { id: "hair-salons", label: "Hair Salon Jobs", data: hairSalonListings },
    { id: "barbershops", label: "Barbershop Jobs", data: barbershopListings },
    { id: "restaurants", label: "Restaurant Listings", data: restaurantListings },
    { id: "tattoo-shops", label: "Tattoo Shop Listings", data: tattooShopListings },
    { id: "nail-salons", label: "Nail Salon Listings", data: nailSalonListings },
  ];
  
  return (
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
        <TabSection key={tab.id} tabValue={tab.id} listings={tab.data} />
      ))}
    </Tabs>
  );
};

export default IndustryTabs;
