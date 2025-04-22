
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GalleryHorizontal, Plus, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ArtistPortfolioPreview = () => {
  // Mock portfolio images
  const portfolioImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      title: "Gradient Nails"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1610992015762-125d030d537a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      title: "French Tips"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      title: "Artistic Design"
    }
  ];

  return (
    <Card className="border-gray-100 shadow-sm overflow-hidden">
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
        <div className="grid grid-cols-3 gap-4">
          {portfolioImages.map((image) => (
            <motion.div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-md"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={image.url}
                alt={image.title}
                className="object-cover h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                <span className="text-white text-xs font-medium truncate">
                  {image.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-center">
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
