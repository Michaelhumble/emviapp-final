
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GalleryHorizontal, Scissors, Plus, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Example service categories with images
const serviceCategories = [
  {
    id: 1,
    name: "Hairstyle/Hair blow",
    image: "/lovable-uploads/89bafcff-30b0-441e-b557-6b5a6126cbdb.png",
    price: "$45-120"
  },
  {
    id: 2,
    name: "Classic Barber",
    image: "/lovable-uploads/50f25b6c-64cb-45d5-be26-c487274d36d1.png",
    price: "$35-75"
  },
  {
    id: 3,
    name: "Nail Art",
    image: "/lovable-uploads/c9e52825-c7f4-4923-aecf-a92a8799530b.png",
    price: "$55-120"
  }
];

const ArtistServicesHighlight = () => {
  return (
    <Card className="shadow-sm border-purple-100 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-purple-50 to-white pb-3">
        <CardTitle className="text-xl font-serif flex items-center">
          <Scissors className="h-5 w-5 mr-2 text-purple-500" />
          Professional Services
        </CardTitle>
        <Button variant="outline" size="sm" className="flex items-center gap-1.5 border-purple-200 text-purple-700">
          <Edit className="h-3.5 w-3.5" />
          <span>Edit Services</span>
        </Button>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {serviceCategories.map((service) => (
            <motion.div
              key={service.id}
              className="group relative rounded-lg overflow-hidden shadow-sm border border-gray-100"
              whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="object-cover h-full w-full transition-transform group-hover:scale-105 duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
                  <p className="text-white font-medium text-sm">{service.name}</p>
                  <p className="text-white/80 text-xs">{service.price}</p>
                </div>
                <Button 
                  size="icon" 
                  variant="secondary"
                  className="absolute top-2 right-2 h-7 w-7 bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm"
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-md"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Service
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistServicesHighlight;
