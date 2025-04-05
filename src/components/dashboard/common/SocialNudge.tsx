
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SocialNudgeProps {
  className?: string;
}

const SocialNudge = ({ className = "" }: SocialNudgeProps) => {
  const [visible, setVisible] = useState(false);
  const [nudge, setNudge] = useState<{
    salonName: string;
    timeAgo: string;
  } | null>(null);

  useEffect(() => {
    // Mock data - in a real implementation, this would come from a backend
    const mockSalons = [
      { name: "Glamour Nails", timeAgo: "2 minutes" },
      { name: "Elite Beauty Salon", timeAgo: "5 minutes" },
      { name: "Majestic Nails & Spa", timeAgo: "8 minutes" },
      { name: "Deluxe Nail Bar", timeAgo: "12 minutes" },
      { name: "Beauty Lounge", timeAgo: "15 minutes" }
    ];
    
    // Randomly show a social nudge with 30% probability
    if (Math.random() < 0.3) {
      const randomSalon = mockSalons[Math.floor(Math.random() * mockSalons.length)];
      
      // Show after a short delay
      const timer = setTimeout(() => {
        setNudge(randomSalon);
        setVisible(true);
        
        // Auto-hide after 15 seconds
        const hideTimer = setTimeout(() => {
          setVisible(false);
        }, 15000);
        
        return () => clearTimeout(hideTimer);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  if (!visible || !nudge) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-4 right-4 z-50 max-w-sm ${className}`}
    >
      <Card className="border-indigo-200 shadow-md">
        <CardContent className="p-4">
          <button 
            onClick={() => setVisible(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="flex items-start gap-3">
            <div className="bg-indigo-100 p-2 rounded-full mt-1">
              <Bell className="h-5 w-5 text-indigo-600" />
            </div>
            
            <div>
              <p className="font-medium text-gray-900">
                {nudge.salonName} just activated premium visibility
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {nudge.timeAgo} ago
              </p>
              
              <Button variant="link" size="sm" className="p-0 h-auto mt-1" asChild>
                <Link to="/visibility/upgrade">See how it works</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SocialNudge;
