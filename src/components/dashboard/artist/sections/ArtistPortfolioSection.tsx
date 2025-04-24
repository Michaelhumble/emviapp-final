
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Image, Plus } from "lucide-react";
import { motion } from "framer-motion";

const mockPortfolioItems = [
  {
    id: "1",
    imageUrl: "/lovable-uploads/67947adb-5754-4569-aa1c-228d8f9db461.png",
    title: "French Gradient"
  },
  {
    id: "2",
    imageUrl: "/lovable-uploads/70c8662a-4525-4854-a529-62616b5b6c81.png",
    title: "Minimalist Line Art"
  },
  {
    id: "3",
    imageUrl: "/lovable-uploads/81e6d95d-e09b-45f0-a4bc-96358592e462.png",
    title: "Pink Floral Design"
  }
];

const ArtistPortfolioSection = () => {
  const hasItems = mockPortfolioItems.length > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-purple-100 shadow-sm overflow-hidden">
        <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="text-xl font-serif flex items-center">
            <Image className="h-5 w-5 mr-2 text-purple-500" />
            My Portfolio
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4">
          {hasItems ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {mockPortfolioItems.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="relative aspect-square rounded-md overflow-hidden border border-gray-200 group"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="object-cover h-full w-full transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-xs font-medium truncate">{item.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-center">
                <Link to="/dashboard/artist/portfolio">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg">
                    <Image className="h-4 w-4 mr-2" />
                    🎨 Curate Portfolio
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="bg-purple-50 p-4 rounded-full mb-4 inline-flex">
                <Image className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Build your portfolio</h3>
              <p className="text-gray-500 mb-4 max-w-md mx-auto">
                Upload photos of your best work to attract clients and showcase your talent.
              </p>
              <Link to="/dashboard/artist/portfolio">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  ➕ Add New Masterpiece
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistPortfolioSection;
