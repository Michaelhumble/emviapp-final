
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ArtistTestimonials = () => {
  // Mock testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      date: "3 weeks ago",
      text: "Amazing work! My nails have never looked better. The attention to detail is incredible and the design lasted weeks!"
    },
    {
      id: 2,
      name: "Jessica Miller",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
      date: "1 month ago",
      text: "Professional, friendly, and very talented. I've received so many compliments."
    }
  ];

  return (
    <Card className="border-gray-100 shadow-sm h-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
          <Star className="h-5 w-5 mr-2 text-amber-500" />
          Client Testimonials
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/reviews" className="flex items-center">
            All Reviews <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="p-4 bg-amber-50 rounded-lg border border-amber-100"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start mb-2">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-8 h-8 rounded-full mr-3 object-cover"
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
                <Quote className="absolute -top-1 -left-1 h-5 w-5 text-amber-200 rotate-180" />
                <p className="text-gray-700 text-sm pl-4">{testimonial.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistTestimonials;
