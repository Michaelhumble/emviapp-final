
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabSection from "./TabSection";
import { 
  boothRentalListings,
  hairSalonListings,
  barbershopListings,
  restaurantListings,
  tattooShopListings,
  nailSalonListings,
  bobaShopListings
} from "@/data/mockIndustryListings";
import LanguageToggle from "@/components/ui/LanguageToggle";

interface TabData {
  id: string;
  label: string;
  label_vi?: string;
  data: any[];
}

const IndustryTabs = () => {
  const [activeTab, setActiveTab] = useState("booth-rentals");
  const [language, setLanguage] = useState<"en" | "vi">("en");
  
  // Listen for language change event
  useState(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      if (event.detail && event.detail.language) {
        setLanguage(event.detail.language);
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    // Get initial language preference
    const storedLanguage = localStorage.getItem('emvi_language_preference');
    if (storedLanguage === 'vi' || storedLanguage === 'en') {
      setLanguage(storedLanguage as "en" | "vi");
    }
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  });
  
  const tabData: TabData[] = [
    { id: "booth-rentals", label: "Booth Rentals", label_vi: "Cho Thuê Booth", data: boothRentalListings },
    { id: "hair-salons", label: "Hair Salon Jobs", label_vi: "Việc Tiệm Tóc", data: hairSalonListings },
    { id: "barbershops", label: "Barbershop Jobs", label_vi: "Việc Tiệm Cắt Tóc Nam", data: barbershopListings },
    { id: "restaurants", label: "Restaurant Listings", label_vi: "Cửa Hàng Nhà Hàng", data: restaurantListings },
    { id: "tattoo-shops", label: "Tattoo Shop Listings", label_vi: "Tiệm Xăm", data: tattooShopListings },
    { id: "nail-salons", label: "Nail Salon Listings", label_vi: "Tiệm Nail", data: nailSalonListings },
    { id: "boba-shops", label: "Boba Shop Jobs", label_vi: "Việc Tiệm Trà Sữa", data: bobaShopListings },
  ];
  
  return (
    <Tabs 
      defaultValue="booth-rentals" 
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <div className="flex justify-between items-center mb-4">
        <TabsList className="flex flex-wrap gap-2 h-auto">
          {tabData.map(tab => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              {language === "en" ? tab.label : tab.label_vi || tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <LanguageToggle />
      </div>
      
      {tabData.map(tab => (
        <TabSection key={tab.id} tabValue={tab.id} listings={tab.data} />
      ))}
    </Tabs>
  );
};

export default IndustryTabs;
