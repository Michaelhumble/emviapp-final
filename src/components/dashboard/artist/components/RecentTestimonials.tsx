
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mock testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://i.pravatar.cc/150?img=1",
    date: "2 weeks ago",
    rating: 5,
    comment: "Absolutely amazing work! My nails have never looked better. The attention to detail is incredible and the design lasted for weeks without chipping. I've already booked my next appointment!"
  },
  {
    id: 2,
    name: "Michael Chen",
    image: "https://i.pravatar.cc/150?img=2",
    date: "1 month ago",
    rating: 5,
    comment: "I was nervous about trying a new nail tech, but I'm so glad I did! The service was exceptional from start to finish and the results were exactly what I wanted."
  },
  {
    id: 3,
    name: "Emily Wright",
    image: "https://i.pravatar.cc/150?img=5",
    date: "3 weeks ago",
    rating: 4,
    comment: "Great experience overall. Very professional, friendly and talented. My nails look fantastic and I've received so many compliments."
  }
];

const RecentTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Recent Testimonials</CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="relative overflow-hidden" style={{ height: "220px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{testimonials[currentIndex].name}</h3>
                    <span className="text-xs text-gray-500">{testimonials[currentIndex].date}</span>
                  </div>
                  <div className="flex mt-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < testimonials[currentIndex].rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    "{testimonials[currentIndex].comment}"
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full mx-1 transition-all ${
                index === currentIndex ? "w-6 bg-purple-500" : "w-2 bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTestimonials;
