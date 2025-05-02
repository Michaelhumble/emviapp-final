
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BeautyExchangeLayout = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-center mb-8">
          Beauty Exchange Marketplace
        </h2>
        
        <Tabs defaultValue="nails" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="bg-gray-100/80">
              <TabsTrigger value="nails">Nails</TabsTrigger>
              <TabsTrigger value="hair">Hair</TabsTrigger>
              <TabsTrigger value="other">Other Services</TabsTrigger>
              <TabsTrigger value="booths">Booth Rentals</TabsTrigger>
              <TabsTrigger value="salons">Salons for Sale</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="nails" className="mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, index) => (
                <PlaceholderCard key={index} category="nails" />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hair" className="mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, index) => (
                <PlaceholderCard key={index} category="hair" />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="other" className="mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, index) => (
                <PlaceholderCard key={index} category="other" />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="booths" className="mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, index) => (
                <PlaceholderCard key={index} category="booths" />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="salons" className="mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, index) => (
                <PlaceholderCard key={index} category="salons" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

const PlaceholderCard = ({ category }: { category: string }) => {
  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'nails': return 'Nail Salon';
      case 'hair': return 'Hair Salon';
      case 'booths': return 'Booth Rental';
      case 'salons': return 'Salon for Sale';
      default: return 'Beauty Service';
    }
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="h-40 bg-gray-200 animate-pulse"></div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="h-6 bg-gray-200 w-3/4 animate-pulse"></div>
          <Badge variant="outline" className="text-xs">
            {getCategoryLabel(category)}
          </Badge>
        </div>
        <div className="h-4 bg-gray-200 w-1/2 mt-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 w-3/4 mt-2 animate-pulse"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-5 bg-gray-200 w-1/3 animate-pulse"></div>
          <div className="h-8 bg-gray-200 w-1/4 rounded animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BeautyExchangeLayout;
