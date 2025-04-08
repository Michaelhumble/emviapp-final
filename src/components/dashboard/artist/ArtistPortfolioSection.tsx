
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Star, Camera, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const ArtistPortfolioSection = () => {
  // Mock portfolio images
  const portfolioItems = [
    {
      id: 1,
      imageUrl: "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png",
      title: "Summer Collection",
      testimonial: "Absolutely loved my nails! The design was exactly what I wanted.",
      client: "Sarah M."
    },
    {
      id: 2,
      imageUrl: "/lovable-uploads/fd96a86c-48b2-4f28-ba97-69d71c651a97.png",
      title: "Elegant Design",
      testimonial: "Got so many compliments on these! Will definitely be back.",
      client: "Jessica T."
    },
    {
      id: 3,
      imageUrl: "/lovable-uploads/f6bb9656-c400-4f28-ba97-69d71c651a97.png",
      title: "Custom Art",
      testimonial: null,
      client: null
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-serif">My Portfolio</CardTitle>
          <CardDescription>Showcase your best work to attract clients</CardDescription>
        </div>
        <Button>
          <Plus className="mr-1 h-4 w-4" />
          Add New
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {portfolioItems.map((item, index) => (
            <motion.div 
              key={item.id}
              className="group relative rounded-lg overflow-hidden shadow-sm border bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="aspect-square relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="font-medium text-sm">{item.title}</h4>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white">
                    <Camera className="h-4 w-4 text-gray-700" />
                  </Button>
                </div>
              </div>
              
              {/* Testimonial if exists */}
              {item.testimonial && (
                <div className="p-3 text-sm bg-white">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-600 italic">{item.testimonial}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-xs font-medium ml-2 text-gray-700">
                          {item.client}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
          
          {/* Add new item card */}
          <motion.div 
            className="aspect-square rounded-lg border-2 border-dashed flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: portfolioItems.length * 0.1 }}
          >
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 mx-auto flex items-center justify-center mb-2">
                <Plus className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Add Photo</p>
              <p className="text-xs text-gray-500 mt-1">Upload work examples</p>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistPortfolioSection;
