
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PortfolioGallery from "./PortfolioGallery";

const ArtistPortfolioSection = () => {  
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-serif">My Portfolio</CardTitle>
          <CardDescription>
            Showcase your best work to attract and impress clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PortfolioGallery />
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistPortfolioSection;
