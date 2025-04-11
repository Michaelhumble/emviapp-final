
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtistPortfolioGallery from "./ArtistPortfolioGallery";
import ServicesManager from "@/components/ServicesManager";
import { useAuth } from "@/context/auth";

const ArtistPortfolioSection = () => {
  const { userRole } = useAuth();
  const [activeTab, setActiveTab] = useState("portfolio");
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="portfolio" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>
        
        <TabsContent value="portfolio">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-serif">My Portfolio</CardTitle>
              <CardDescription>
                Showcase your best work to attract and impress clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ArtistPortfolioGallery />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services">
          <ServicesManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArtistPortfolioSection;
