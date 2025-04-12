
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserRound, AlertTriangle } from "lucide-react";

const ArtistProfileError: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container max-w-5xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-lg mx-auto shadow-md overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 flex justify-center">
              <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center shadow-sm">
                <UserRound className="h-10 w-10 text-gray-400" />
              </div>
            </div>
            
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-amber-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Artist Not Found</h2>
              <p className="text-muted-foreground mb-6">
                Sorry, the artist profile you're looking for doesn't exist or has been removed.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </Button>
                <Button 
                  onClick={() => navigate('/artists')}
                >
                  Browse Artists
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ArtistProfileError;
