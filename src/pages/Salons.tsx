
import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalonListings from "@/components/salons/SalonListings";
import SampleIndustryListings from "@/components/marketplace/SampleIndustryListings";
import HiringSalonsGrid from "@/components/salons/HiringSalonsGrid";
import { hiringSalons, salonsForSale } from "@/data/salonData";

const Salons = () => {
  const [activeTab, setActiveTab] = useState("hiring");
  const [showSampleListings, setShowSampleListings] = useState(false);

  // Make sure that hiringSalons and salonsForSale are properly typed as Job[]
  const typedHiringSalons = hiringSalons as any[];
  const typedSalonsForSale = salonsForSale as any[];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 bg-[#FDFDFD]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tabs defaultValue="hiring" className="mb-12" onValueChange={setActiveTab}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-serif mb-2">
                    {activeTab === "hiring" 
                      ? "Tiệm Đang Tuyển Thợ / Hiring Now"
                      : "Salon Nails Cần Bán / Salons For Sale"}
                  </h1>
                  <p className="text-gray-600">
                    {activeTab === "hiring"
                      ? "Tìm Việc Nail Lương Cao, Bao Lương Nếu Cần — Hơn 800+ tiệm đang cần thợ, đăng ký miễn phí."
                      : "Cơ Hội Đầu Tư Tốt Nhất — Giá từ $80,000 đến $300,000, chọn vị trí đẹp, tiệm có thợ, và thu nhập cao."}
                  </p>
                </div>
                
                <TabsList className="mt-4 sm:mt-0 bg-muted/30">
                  <TabsTrigger value="hiring" className="text-sm">Hiring Now</TabsTrigger>
                  <TabsTrigger value="forsale" className="text-sm">For Sale</TabsTrigger>
                  {showSampleListings && (
                    <TabsTrigger value="samples" className="text-sm">Sample Listings</TabsTrigger>
                  )}
                </TabsList>
              </div>

              <TabsContent value="hiring" className="space-y-6">
                <HiringSalonsGrid hiringSalons={typedHiringSalons} />
                
                <div className="flex justify-center mt-8">
                  <Button variant="outline" className="mr-2">Previous</Button>
                  <Button variant="outline">Next</Button>
                </div>
              </TabsContent>

              <TabsContent value="forsale" className="space-y-6">
                <SalonListings salonsForSale={typedSalonsForSale} />
              </TabsContent>
              
              <TabsContent value="samples">
                <SampleIndustryListings />
              </TabsContent>
            </Tabs>
            
            {!showSampleListings && (
              <div className="text-center mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowSampleListings(true);
                    setActiveTab("samples");
                  }}
                >
                  Show Sample Industry Listings
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Salons;
