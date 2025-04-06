
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "sonner";

interface PortfolioItem {
  id: string;
  imageUrl: string;
  title: string;
}

const ArtistPortfolioGrid = () => {
  // Sample portfolio items - would come from API/database in production
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: "1",
      imageUrl: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      title: "Summer Collection"
    },
    {
      id: "2",
      imageUrl: "https://images.unsplash.com/photo-1632344551739-ac0d8213c593?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      title: "Winter Elegance"
    },
    {
      id: "3",
      imageUrl: "https://images.unsplash.com/photo-1612228250798-5b6b40c41b75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      title: "Bridal Special"
    },
    {
      id: "4",
      imageUrl: "https://images.unsplash.com/photo-1579591216956-bca09967818d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      title: "Luxury Designs"
    }
  ]);
  
  const handleAddPortfolioItem = () => {
    // In production, this would open an upload dialog/form
    toast.info("Portfolio upload feature coming soon!");
  };
  
  return (
    <section className="mb-8" id="portfolio">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-serif font-semibold">Portfolio</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={handleAddPortfolioItem}
        >
          <PlusCircle className="h-4 w-4" />
          Add More
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {portfolioItems.map((item) => (
          <Card key={item.id} className="overflow-hidden group hover:shadow-md transition duration-200">
            <div className="relative">
              <AspectRatio ratio={1}>
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300"
                />
              </AspectRatio>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-3 w-full">
                  <p className="text-white font-medium text-sm">{item.title}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        <Button 
          variant="outline"
          className="h-auto flex flex-col items-center justify-center p-6 border border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 aspect-square"
          onClick={handleAddPortfolioItem}
        >
          <PlusCircle className="h-6 w-6 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Add New</span>
        </Button>
      </div>
    </section>
  );
};

export default ArtistPortfolioGrid;
