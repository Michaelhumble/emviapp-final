
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "@/hooks/useTranslation";

// Testimonial data with real stories reflecting transformation
const testimonials = [
  {
    id: 1,
    name: "Linh Nguyen",
    role: "Salon Owner, Atlanta",
    image: "https://i.pravatar.cc/150?img=47",
    struggle: "I was losing 30% of clients after their first visit. They'd just... disappear.",
    outcome: "With EmviApp's client growth system, our retention improved to 85% and we grew our monthly revenue by $4,200.",
    highlight: "client growth system",
    color: "bg-gradient-to-br from-pink-50 to-purple-50 border-purple-100"
  },
  {
    id: 2,
    name: "Michael Torres",
    role: "Nail Artist, Chicago",
    image: "https://i.pravatar.cc/150?img=12",
    struggle: "Every month was unpredictable. Some weeks fully booked, others completely empty.",
    outcome: "Now I manage my own client list. When I moved salons, 90% of my clients came with me.",
    highlight: "manage my own client list",
    color: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100"
  },
  {
    id: 3,
    name: "Isabella Rodriguez",
    role: "Freelancer, Miami",
    image: "https://i.pravatar.cc/150?img=23",
    struggle: "Working freelance meant endless hustle. I couldn't build stability or predict my income.",
    outcome: "EmviApp's booking system gives me control. I set my hours, my rates, and my boundaries.",
    highlight: "booking system",
    color: "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Salon Owner, Los Angeles",
    image: "https://i.pravatar.cc/150?img=15",
    struggle: "Artists would leave and take all their clients with them. It was a constant cycle of rebuilding.",
    outcome: "Our client retention system keeps the salon's reputation first. Artists come and go, clients stay loyal to us.",
    highlight: "client retention system",
    color: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-100"
  },
  {
    id: 5,
    name: "Nhi Tran",
    role: "Brow Artist, Houston",
    image: "https://i.pravatar.cc/150?img=32",
    struggle: "I spent more on marketing than I made in profit. Social media algorithms kept changing.",
    outcome: "With EmviApp's profile system, clients find me through searches that matter. My calendar stays full.",
    highlight: "profile system",
    color: "bg-gradient-to-br from-rose-50 to-pink-50 border-rose-100"
  },
  {
    id: 6,
    name: "James Washington",
    role: "Barber Shop Owner, New York",
    image: "https://i.pravatar.cc/150?img=53",
    struggle: "Managing staff schedules and keeping track of walk-ins was chaos. We were leaving money on the table.",
    outcome: "Our entire team uses the same system now. Revenue is up 32%, and our stress levels are way down.",
    highlight: "same system",
    color: "bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100"
  }
];

const ClientSuccessStories: React.FC = () => {
  const { t } = useTranslation();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 tracking-tight">
            How We Stopped Losing Clients — And Started Growing Again
          </h2>
          <p className="text-lg text-gray-600">
            Real stories from owners and artists who broke free from constant stress.
          </p>
        </motion.div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem 
                key={testimonial.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredItem(testimonial.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="h-full"
                >
                  <Card className={`h-full border ${testimonial.color} shadow-sm hover:shadow-md transition-shadow duration-300`}>
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center mb-5">
                        <Avatar className="h-12 w-12 mr-4 border-2 border-white shadow-sm">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-lg">{testimonial.name}</h4>
                          <p className="text-gray-600 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col">
                        <div className="mb-4">
                          <h5 className="text-gray-500 uppercase text-xs font-semibold mb-2">The Struggle:</h5>
                          <p className="text-gray-800 font-serif italic">{testimonial.struggle}</p>
                        </div>
                        
                        <div className="mt-auto">
                          <h5 className="text-gray-500 uppercase text-xs font-semibold mb-2">The Transformation:</h5>
                          <p className="text-gray-800">
                            {testimonial.outcome.split(testimonial.highlight).map((part, i) => 
                              i === 0 ? (
                                <React.Fragment key={i}>
                                  {part}<span className="text-purple-600 font-medium">{testimonial.highlight}</span>
                                </React.Fragment>
                              ) : part
                            )}
                          </p>
                        </div>
                      </div>
                      
                      <motion.div
                        animate={{
                          opacity: hoveredItem === testimonial.id ? 1 : 0,
                          y: hoveredItem === testimonial.id ? 0 : 5,
                        }}
                        transition={{ duration: 0.2 }}
                        className="mt-5 pt-3 border-t border-gray-100"
                      >
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-purple-600 p-0 hover:bg-transparent hover:text-purple-700"
                          asChild
                        >
                          <Link to="/pricing">
                            See full story <ArrowRight className="h-3.5 w-3.5 ml-1" />
                          </Link>
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex justify-end mt-4 gap-2">
            <CarouselPrevious className="relative static translate-y-0 left-0" />
            <CarouselNext className="relative static translate-y-0 right-0" />
          </div>
        </Carousel>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-md shadow-sm hover:shadow font-medium text-lg transform transition hover:scale-[1.02]"
            asChild
          >
            <Link to="/signup">
              Take Back Control — Join EmviApp
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientSuccessStories;
