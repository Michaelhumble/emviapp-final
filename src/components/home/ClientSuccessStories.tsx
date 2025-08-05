
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Brush, Scissors, Palette, Pen, Hand, Eye, Sparkles } from "lucide-react";
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
    icon: "Brush", 
    borderColor: "border-pink-400",
    iconBgColor: "bg-pink-100" 
  },
  "Barber": { 
    icon: "Scissors", 
    borderColor: "border-blue-400",
    iconBgColor: "bg-blue-100" 
  },
  "Makeup Artist": { 
    icon: "Palette", 
    borderColor: "border-purple-400",
    iconBgColor: "bg-purple-100" 
  },
  "Tattoo Artist": { 
    icon: "Pen", 
    borderColor: "border-amber-400",
    iconBgColor: "bg-amber-100" 
  },
  "Massage Therapist": { 
    icon: "Hand", 
    borderColor: "border-green-400",
    iconBgColor: "bg-green-100" 
  },
  "Lash Specialist": { 
    icon: "Eye", 
    borderColor: "border-teal-400",
    iconBgColor: "bg-teal-100" 
  },
  "Brow Artist": { 
    icon: "Sparkles", 
    borderColor: "border-rose-400",
    iconBgColor: "bg-rose-100"
  },
  "Hairstylist": { 
    icon: "Scissors", 
    borderColor: "border-violet-400",
    iconBgColor: "bg-violet-100" 
  },
  "Freelancer": { 
    icon: "Sparkles", 
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

// Icon component helper
const getIconComponent = (iconName: string) => {
  const iconMap = {
    Brush: <Brush className="h-5 w-5 text-pink-600" />,
    Scissors: <Scissors className="h-5 w-5 text-blue-600" />,
    Palette: <Palette className="h-5 w-5 text-purple-600" />,
    Pen: <Pen className="h-5 w-5 text-amber-600" />,
    Hand: <Hand className="h-5 w-5 text-green-600" />,
    Eye: <Eye className="h-5 w-5 text-teal-600" />,
    Sparkles: <Sparkles className="h-5 w-5 text-indigo-600" />
  };
  return iconMap[iconName as keyof typeof iconMap] || <Sparkles className="h-5 w-5 text-gray-600" />;
};

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
    <section className="py-24 bg-gradient-to-b from-gray-50/30 via-purple-50/20 to-pink-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 via-transparent to-pink-100/30"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-blue-400/10 to-purple-400/10 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        {/* Enhanced section header */}
        <motion.div 
          className="text-center max-w-5xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <Sparkles className="w-10 h-10 text-purple-500" />
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              No Matter Your Craft — We Know the Struggle
            </motion.h2>
            <Sparkles className="w-10 h-10 text-pink-500" />
          </div>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Real stories from Nail Techs, Barbers, Tattoo Artists, Makeup Artists, Massage Therapists, and more — 
            finally, a platform built for <span className="text-purple-600 font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">all of us</span>.
          </motion.p>
        </motion.div>
        
        {/* Testimonial carousel */}
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="overflow-hidden max-w-full" ref={emblaRef}>
            <div className="flex max-w-full">
              {testimonials.map((testimonial, idx) => {
                const professionStyle = professionStyles[testimonial.profession] || 
                                        { icon: "Sparkles", borderColor: "border-gray-400", iconBgColor: "bg-gray-100" };
                
                return (
                  <div 
                    key={idx} 
                    className="flex-grow-0 flex-shrink-0 w-full md:w-1/3 px-4 min-w-0 max-w-full"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      whileHover={{ 
                        y: -12, 
                        scale: 1.03,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      className="h-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-400 overflow-hidden group cursor-pointer transform"
                    >
                      <div className="p-8 h-full flex flex-col">
                        {/* Professional Header */}
                        <div className="flex items-center mb-6">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center mr-4 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg`}>
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                              {getIconComponent(professionStyle.icon)}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{testimonial.name}</h3>
                            <p className="text-sm font-semibold text-purple-600 mb-1">{testimonial.profession}</p>
                            <p className="text-sm text-gray-500">{testimonial.location}</p>
                          </div>
                        </div>
                        
                        {/* Professional Image */}
                        <div className="mb-6 flex-grow">
                          <div className="relative overflow-hidden rounded-xl">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>
                        
                        {/* Quote */}
                        <blockquote className="text-gray-700 italic text-base leading-relaxed mb-4 flex-grow">
                          <span className="text-4xl text-purple-400 leading-none">"</span>
                          {testimonial.quote}
                          <span className="text-4xl text-purple-400 leading-none">"</span>
                        </blockquote>

                        {/* Bottom decoration */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center">
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-2">Verified Story</span>
                          </div>
                          <div className="text-xs text-purple-600 font-semibold">
                            EmviApp Success
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Enhanced Navigation arrows */}
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 
                      bg-white/90 backdrop-blur-sm rounded-full shadow-xl p-4
                      hover:bg-white hover:shadow-2xl transition-all duration-300
                      border border-purple-100 hover:border-purple-200"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="h-6 w-6 text-purple-600" />
          </button>
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 
                      bg-white/90 backdrop-blur-sm rounded-full shadow-xl p-4
                      hover:bg-white hover:shadow-2xl transition-all duration-300
                      border border-purple-100 hover:border-purple-200"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next testimonial"
          >
            <ArrowRight className="h-6 w-6 text-purple-600" />
          </button>
          
          {/* Enhanced dots indicator */}
          <div className="flex justify-center mt-8 gap-3 md:hidden">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? "w-8 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg" 
                    : "w-3 bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => emblaApi?.scrollTo(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Enhanced CTA section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join 50,000+ beauty professionals who've taken control of their success story.
            </p>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-50 font-bold px-12 py-6 rounded-2xl text-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                aria-label="Join EmviApp community"
              >
                <span className="flex items-center">
                  <span className="mr-3">💪 Start Your Success Story</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientSuccessStories;
