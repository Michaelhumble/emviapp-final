
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Flame, Building, MapPin, DollarSign } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Sample combined listings data
const sampleListings = [
  {
    id: "job1",
    title: "Hiring Nail Tech",
    location: "Wheeling, WV",
    compensation: "$7,000-$12,000/month",
    perks: "Free housing, high tips",
    type: "job",
    isUrgent: true,
  },
  {
    id: "salon1",
    title: "Salon for Sale",
    location: "Fresno, CA",
    compensation: "2700 sqft, 20 tables/chairs",
    perks: "$450K Negotiable",
    type: "salon",
    isUrgent: false,
  },
  {
    id: "job2",
    title: "Need 2 Dip Techs",
    location: "Tampa, FL",
    compensation: "$1,800/week",
    perks: "Housing available",
    type: "job",
    isUrgent: true,
  },
  {
    id: "job3",
    title: "Fulltime Nail Tech",
    location: "Silver Spring, MD",
    compensation: "Stable clients",
    perks: "No drama",
    type: "job",
    isUrgent: false,
  }
];

const LatestIndustryOpportunities = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Auto rotate listings every 5 seconds
    intervalRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % sampleListings.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Container animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animation variants
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Render as carousel on mobile
  if (isMobile) {
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

          <div className="mt-8">
            <Carousel className="w-full">
              <CarouselContent>
                {sampleListings.map((listing) => (
                  <CarouselItem key={listing.id}>
                    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="pt-6 flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            {listing.type === 'salon' ? (
                              <Building className="h-4 w-4 text-primary" />
                            ) : (
                              <DollarSign className="h-4 w-4 text-primary" />
                            )}
                            <span>{listing.type === 'salon' ? 'Salon for Sale' : 'Job Posting'}</span>
                          </div>
                          {listing.isUrgent && (
                            <span className="inline-flex items-center bg-red-50 text-red-600 text-xs px-2 py-1 rounded-full">
                              <Flame className="h-3 w-3 mr-1" />
                              Urgent
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{listing.title}</h3>
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <MapPin className="h-4 w-4 mr-1" /> {listing.location}
                        </div>
                        <p className="text-primary font-medium mb-2">
                          {listing.compensation}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {listing.perks}
                        </p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button className="w-full" asChild>
                          <Link to={listing.type === 'salon' ? "/salon-marketplace" : "/jobs"}>
                            {listing.type === 'salon' ? "View Listing" : "Apply Now"}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex left-0" />
              <CarouselNext className="hidden sm:flex right-0" />
            </Carousel>
          </div>

          <div className="mt-10 flex justify-center gap-4">
            <Link to="/jobs">
              <Button variant="outline" size="lg">
                See All Jobs
              </Button>
            </Link>
            <Link to="/salon-marketplace">
              <Button variant="outline" size="lg">
                See All Salons for Sale
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Render as grid on desktop
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {sampleListings.map((listing) => (
            <motion.div key={listing.id} variants={item}>
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="pt-6 flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      {listing.type === 'salon' ? (
                        <Building className="h-4 w-4 text-primary" />
                      ) : (
                        <DollarSign className="h-4 w-4 text-primary" />
                      )}
                      <span>{listing.type === 'salon' ? 'Salon for Sale' : 'Job Posting'}</span>
                    </div>
                    {listing.isUrgent && (
                      <span className="inline-flex items-center bg-red-50 text-red-600 text-xs px-2 py-1 rounded-full">
                        <Flame className="h-3 w-3 mr-1" />
                        Urgent
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{listing.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1" /> {listing.location}
                  </div>
                  <p className="text-primary font-medium mb-2">
                    {listing.compensation}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {listing.perks}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button className="w-full" asChild>
                    <Link to={listing.type === 'salon' ? "/salon-marketplace" : "/jobs"}>
                      {listing.type === 'salon' ? "View Listing" : "Apply Now"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center gap-4">
          <Link to="/jobs">
            <Button variant="outline" size="lg">
              See All Jobs
            </Button>
          </Link>
          <Link to="/salon-marketplace">
            <Button variant="outline" size="lg">
              See All Salons for Sale
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestIndustryOpportunities;
