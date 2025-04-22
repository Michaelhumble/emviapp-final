
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GalleryHorizontal, Plus, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useArtistData } from '../context/ArtistDataContext';

const ArtistPortfolioPreview = () => {
  const { portfolioImages, loadingPortfolio } = useArtistData();
  
  // Show up to 6 portfolio images
  const displayImages = portfolioImages.slice(0, 6);
  
  if (loadingPortfolio) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium text-gray-900">
            Portfolio Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="aspect-square bg-gray-100 animate-pulse rounded-md"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
          <GalleryHorizontal className="h-5 w-5 mr-2 text-purple-500" />
          Portfolio Highlights
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/portfolio" className="flex items-center">
            View All <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayImages.map((image) => (
            <motion.div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-md"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={image.url}
                alt={image.title || "Portfolio work"}
                className="object-cover h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                <span className="text-white text-xs font-medium truncate">
                  {image.title || "Nail Art"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add New Work
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistPortfolioPreview;
