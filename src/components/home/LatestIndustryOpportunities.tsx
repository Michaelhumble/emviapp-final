
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flame, Building, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Job } from "@/types/job";

type OpportunityType = "job" | "salon";

interface Opportunity {
  id: string;
  title: string;
  location: string;
  details: string[];
  isUrgent?: boolean;
  type: OpportunityType;
}

const LatestIndustryOpportunities: React.FC = () => {
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Sample opportunities data combining jobs and salons for sale
  const opportunities: Opportunity[] = [
    {
      id: "1",
      title: "Hiring Nail Tech",
      location: "Wheeling, WV",
      details: ["$7,000–$12,000/month", "Free Housing", "High-End Clients"],
      isUrgent: true,
      type: "job"
    },
    {
      id: "2",
      title: "Salon for Sale",
      location: "Fresno, CA",
      details: ["2700 sqft", "$450K Negotiable", "20 Tables/Chairs", "Busy Location"],
      type: "salon"
    },
    {
      id: "3",
      title: "Need 2 Powder Techs",
      location: "Tampa, FL",
      details: ["$1,800/week", "Housing Provided", "No Rent"],
      isUrgent: true,
      type: "job"
    },
    {
      id: "4",
      title: "Full-Time Nail Tech",
      location: "Silver Spring, MD",
      details: ["Stable Clients", "High Tips", "Drama-Free Environment"],
      isUrgent: true,
      type: "job"
    },
    {
      id: "5",
      title: "Salon for Sale",
      location: "Daniel Island, SC",
      details: ["10 Tables & Chairs", "Prime Shopping Center", "Contact for Price"],
      type: "salon"
    },
    {
      id: "6",
      title: "Hiring Dip & Gel Tech",
      location: "Charlotte, NC",
      details: ["$1,500/week", "Clean Environment", "Flexible Hours"],
      isUrgent: true,
      type: "job"
    },
    {
      id: "7",
      title: "Large Nail Salon for Sale",
      location: "Kennesaw, GA",
      details: ["Income $20K–$28K/month", "Fully Equipped", "Beautiful Location"],
      type: "salon"
    },
    {
      id: "8",
      title: "Hiring Nail Tech",
      location: "Highlands Ranch, CO",
      details: ["Part-Time", "$1,200–$1,500/week", "Friendly Team"],
      isUrgent: true,
      type: "job"
    },
    {
      id: "9",
      title: "Salon for Sale",
      location: "Fontana, CA",
      details: ["1173 sqft", "Rent $3,400", "Newly Renovated Plaza"],
      type: "salon"
    }
  ];

  const totalSlides = isMobile ? opportunities.length : Math.ceil(opportunities.length / 4);
  
  const resetTimeout = () => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    
    if (!isPaused) {
      autoPlayRef.current = setTimeout(() => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % totalSlides);
      }, 5000);
    }
    
    return () => {
      resetTimeout();
    };
  }, [currentSlide, isPaused, totalSlides]);

  const nextSlide = () => {
    resetTimeout();
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    resetTimeout();
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? totalSlides - 1 : prevSlide - 1));
  };

  const goToSlide = (index: number) => {
    resetTimeout();
    setCurrentSlide(index);
  };

  const renderOpportunityCards = () => {
    if (isMobile) {
      // For mobile: show one card at a time
      return (
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {opportunities.map((opportunity) => (
                <div key={opportunity.id} className="min-w-full px-4">
                  <OpportunityCard opportunity={opportunity} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full p-2 bg-white/90" 
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full p-2 bg-white/90" 
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex justify-center mt-4 gap-2">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${currentSlide === index ? 'bg-primary' : 'bg-gray-300'}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      );
    } else {
      // For desktop: show 4 cards per slide
      return (
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {[...Array(totalSlides)].map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full grid grid-cols-4 gap-4 px-4">
                  {opportunities.slice(slideIndex * 4, slideIndex * 4 + 4).map((opportunity) => (
                    <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {totalSlides > 1 && (
            <>
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full p-2 bg-white/90" 
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full p-2 bg-white/90" 
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-center mt-4 gap-2">
                {[...Array(totalSlides)].map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full ${currentSlide === index ? 'bg-primary' : 'bg-gray-300'}`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      );
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Beauty Industry Opportunities</h2>
          <p className="text-gray-600 text-lg">
            Real jobs, real salons for sale, real people — updated daily.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-10"
        >
          {renderOpportunityCards()}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
        >
          <Button className="px-8" size="lg" asChild>
            <Link to="/jobs">See All Jobs</Link>
          </Button>
          <Button variant="outline" className="px-8" size="lg" asChild>
            <Link to="/salon-marketplace">See All Salons for Sale</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

// Opportunity Card Component
const OpportunityCard: React.FC<{ opportunity: Opportunity }> = ({ opportunity }) => {
  const { title, location, details, isUrgent, type } = opportunity;
  
  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <div className="p-6 flex-grow">
        {/* Tag */}
        <div className="flex justify-between items-start mb-3">
          {type === "job" && isUrgent ? (
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              <Flame className="h-3 w-3 mr-1" /> Urgent Hire
            </div>
          ) : (
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              <Building className="h-3 w-3 mr-1" /> Salon for Sale
            </div>
          )}
        </div>
        
        {/* Title and Location */}
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-500 text-sm mb-3">{location}</p>
        
        {/* Details */}
        <ul className="space-y-1 mb-4">
          {details.map((detail, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-center">
              <span className="h-1 w-1 rounded-full bg-gray-400 mr-2"></span>
              {detail}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Button */}
      <div className="p-5 pt-0 mt-auto">
        <Button 
          variant={type === "job" ? "default" : "outline"} 
          className="w-full"
          asChild
        >
          <Link to={type === "job" ? "/jobs" : "/salon-marketplace"}>
            {type === "job" ? "Apply Now" : "View Listing"}
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default LatestIndustryOpportunities;
