
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}

interface ClientTestimonialsProps {
  testimonials?: Testimonial[];
  title?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/100?img=1",
    rating: 5,
    date: "3 weeks ago",
    text: "Amazing work! My nails have never looked better. The attention to detail is incredible and the design lasted for weeks. Definitely coming back!",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/100?img=3",
    rating: 5,
    date: "2 months ago",
    text: "I was nervous about trying a new nail tech, but I'm so glad I did! The service was exceptional and the results were exactly what I wanted.",
  },
  {
    id: 3,
    name: "Jessica Miller",
    avatar: "https://i.pravatar.cc/100?img=5",
    rating: 4,
    date: "1 month ago",
    text: "Great experience! Professional, friendly, and very talented. My nails look fantastic and I've received so many compliments.",
  },
];

const ClientTestimonials = ({ 
  testimonials = defaultTestimonials,
  title = "Client Testimonials"
}: ClientTestimonialsProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 } 
    }
  };
  
  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 flex items-center">
          <Star className="h-5 w-5 text-amber-500 mr-2" />
          {title}
        </h3>
      </CardHeader>
      
      <CardContent className="p-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              onHoverStart={() => setHoveredCard(testimonial.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <div className="p-5">
                <div className="flex items-start mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-2 text-xs text-gray-500">{testimonial.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-1 -left-1 h-5 w-5 text-purple-200 rotate-180" />
                  <p className="text-gray-600 text-sm pl-5">{testimonial.text}</p>
                </div>
                
                <motion.div 
                  className="mt-4 text-center"
                  animate={{ 
                    opacity: hoveredCard === testimonial.id ? 1 : 0,
                    y: hoveredCard === testimonial.id ? 0 : 5 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {hoveredCard === testimonial.id && (
                    <button className="text-xs text-purple-600 font-medium">View Full Review</button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ClientTestimonials;
