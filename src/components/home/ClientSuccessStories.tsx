
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Industry icons and colors for different professions
const professionStyles = {
  "Nail Technician": { 
    icon: "💅", 
    borderColor: "border-pink-400",
    iconBgColor: "bg-pink-100" 
  },
  "Barber": { 
    icon: "✂️", 
    borderColor: "border-blue-400",
    iconBgColor: "bg-blue-100" 
  },
  "Makeup Artist": { 
    icon: "💄", 
    borderColor: "border-purple-400",
    iconBgColor: "bg-purple-100" 
  },
  "Tattoo Artist": { 
    icon: "🖋️", 
    borderColor: "border-amber-400",
    iconBgColor: "bg-amber-100" 
  },
  "Massage Therapist": { 
    icon: "👐", 
    borderColor: "border-green-400",
    iconBgColor: "bg-green-100" 
  },
  "Lash Specialist": { 
    icon: "👁️", 
    borderColor: "border-teal-400",
    iconBgColor: "bg-teal-100" 
  },
  "Brow Artist": { 
    icon: "✨", 
    borderColor: "border-rose-400",
    iconBgColor: "bg-rose-100" 
  },
  "Hairstylist": { 
    icon: "💇", 
    borderColor: "border-violet-400",
    iconBgColor: "bg-violet-100" 
  },
  "Freelancer": { 
    icon: "🌟", 
    borderColor: "border-indigo-400",
    iconBgColor: "bg-indigo-100" 
  },
};

// Testimonial data
const testimonials = [
  {
    name: "Jessica Kim",
    profession: "Nail Technician",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    quote: "I was losing clients to bigger salons with marketing budgets. EmviApp helped me grow my own customer base and stabilize my income without sacrificing my independence.",
  },
  {
    name: "Devon Williams",
    profession: "Barber",
    location: "Atlanta, GA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    quote: "The barbershop was packed but my chair was empty. After setting up my profile on EmviApp, I went from struggling to booked solid within weeks. This platform gets our industry.",
  },
  {
    name: "Alexa Johnson",
    profession: "Makeup Artist",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    quote: "Wedding season used to mean feast or famine. EmviApp's booking system helped me build a consistent clientele year-round, finally giving me financial stability.",
  },
  {
    name: "Marcus Rodriguez",
    profession: "Tattoo Artist",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    quote: "I was tired of giving 60% to my shop while bringing in most clients myself. EmviApp helped me build a following, showcase my portfolio, and eventually open my own studio.",
  },
  {
    name: "Sophia Chen",
    profession: "Lash Specialist",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    quote: "The struggle of being a lash artist is real—clients don't understand our value. EmviApp's platform helped showcase my work and attract clients who appreciate quality.",
  },
  {
    name: "Tyler Jackson",
    profession: "Massage Therapist",
    location: "Denver, CO",
    image: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    quote: "After years working at chains with burnout schedules, EmviApp helped me build a private practice where I control my hours and actually make more per session.",
  },
  {
    name: "Olivia Patel",
    profession: "Brow Artist",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    quote: "For years I struggled to be taken seriously as a brow specialist. EmviApp gives me a professional platform to highlight my specialized skills and charge what I'm worth.",
  },
  {
    name: "David Nguyen",
    profession: "Hairstylist",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    quote: "I bounced between different salons for years. After building my profile on EmviApp, I've developed my own loyal clientele that follows me wherever I go.",
  },
  {
    name: "Jasmine Torres",
    profession: "Freelancer",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    quote: "Working across multiple specialties made marketing impossible. EmviApp lets me showcase all my skills in one profile, helping me attract exactly the clients I want.",
  },
];

const ClientSuccessStories = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Auto rotation functionality for mobile
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkWidth();
    window.addEventListener("resize", checkWidth);
    
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Auto-rotation for mobile
  useEffect(() => {
    if (!emblaApi || !isMobile) return;
    
    const rotationInterval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    
    return () => clearInterval(rotationInterval);
  }, [emblaApi, isMobile]);

  // Update current index when slide changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    emblaApi.on('select', onSelect);
    onSelect();
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-5 z-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-10" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-10" />
        </div>
        
        {/* Section header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 tracking-tight text-foreground">
            No Matter Your Craft — We Know the Struggle
          </h2>
          <p className="text-lg text-muted-foreground font-inter">
            Real stories from Nail Techs, Barbers, Tattoo Artists, Makeup Artists, Massage Therapists, and more — 
            finally, a platform built for all of us.
          </p>
        </motion.div>
        
        {/* Testimonial carousel */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, idx) => {
                const professionStyle = professionStyles[testimonial.profession] || 
                                        { icon: "✨", borderColor: "border-gray-400", iconBgColor: "bg-gray-100" };
                
                return (
                  <div 
                    key={idx} 
                    className={`flex-grow-0 flex-shrink-0 w-full md:w-1/3 px-4 min-w-0`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className={`h-full bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 
                                border-t-4 ${professionStyle.borderColor} overflow-hidden`}
                    >
                      <div className="p-6 h-full flex flex-col">
                        <div className="flex items-center mb-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 
                                        ${professionStyle.iconBgColor} text-xl`}>
                            {professionStyle.icon}
                          </div>
                          <div>
                            <h3 className="font-inter font-semibold text-foreground">{testimonial.name}</h3>
                            <p className="text-sm text-muted-foreground font-inter">{testimonial.profession} • {testimonial.location}</p>
                          </div>
                        </div>
                        
                        <div className="mb-4 flex-grow">
                          <div className="relative">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-full h-40 object-cover rounded-md"
                            />
                          </div>
                        </div>
                        
                        <blockquote className="text-foreground font-inter italic text-sm md:text-base mb-3">
                          "{testimonial.quote}"
                        </blockquote>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Navigation arrows - visible on all screen sizes but styled differently */}
          <button 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 md:p-3
                      hover:bg-gray-50 transition-colors focus:outline-none"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-800" />
          </button>
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 md:p-3
                      hover:bg-gray-50 transition-colors focus:outline-none"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next testimonial"
          >
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-gray-800" />
          </button>
          
          {/* Dots indicator for mobile */}
          <div className="flex justify-center mt-6 gap-2 md:hidden">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 rounded-full mx-0.5 transition-all ${
                  idx === currentIndex ? "w-6 bg-primary" : "w-2 bg-gray-300"
                }`}
                onClick={() => emblaApi?.scrollTo(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* CTA button */}
        <div className="mt-12 text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-inter font-medium px-6 py-2 rounded-md transition-all
                                     hover:shadow-lg hover:translate-y-[-2px]">
            Join Thousands Taking Control of Their Career — Get Started with EmviApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClientSuccessStories;
