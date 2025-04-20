
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Scissors, Heart, Star } from "lucide-react";

// Suggested services could be fetched from an API in a real implementation
const suggestedServices = [
  {
    id: '1',
    title: 'Gel Manicure',
    description: 'Long-lasting gel polish perfect for everyday wear',
    icon: <Scissors className="h-5 w-5 text-primary" />,
    color: 'from-pink-500 to-rose-400',
  },
  {
    id: '2',
    title: 'Full Set Acrylics',
    description: 'Durable and stylish acrylic nails with custom designs',
    icon: <Star className="h-5 w-5 text-amber-500" />,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: '3',
    title: 'Nail Art Design',
    description: 'Express yourself with custom nail art by top artists',
    icon: <Heart className="h-5 w-5 text-rose-500" />,
    color: 'from-blue-500 to-cyan-400',
  },
];

const SuggestedServicesSection = () => {
  const navigate = useNavigate();
  
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {suggestedServices.map((service, index) => (
        <motion.div
          key={service.id}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: index * 0.1 }}
        >
          <Card className="h-full overflow-hidden border hover:shadow-md transition-all">
            <div className={`bg-gradient-to-r ${service.color} h-2`} />
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                {service.icon}
                <h3 className="font-medium text-lg">{service.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {service.description}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => navigate('/explore/services')}
              >
                Find Artists
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default SuggestedServicesSection;
