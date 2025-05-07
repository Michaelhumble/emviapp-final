import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Briefcase, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getFeaturedJobs } from "@/utils/featuredContent";
import { isNailJob, getNailJobImage } from "@/utils/nailSalonImages";
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const TopBeautyJobs = () => {
  const isMobile = useIsMobile();
  const jobs = getFeaturedJobs(6);

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
  
  // Check if a job is nail-related
  const isNailTechJob = (job: any): boolean => {
    return isNailJob(job.title || job.role || '', job.description || '');
  };

  // Render the jobs as a carousel on mobile
  if (isMobile) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Beauty Jobs — Hiring Today</h2>
            <p className="text-gray-600 text-lg">
              Real opportunities from salons across the U.S. Find your next gig now.
            </p>
          </motion.div>

          <div className="mt-8">
            <Carousel className="w-full">
              <CarouselContent>
                {jobs.map((job) => {
                  const isNail = isNailTechJob(job);
                  
                  return (
                    <CarouselItem key={job.id}>
                      <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                        {isNail && (
                          <div className="aspect-video w-full overflow-hidden">
                            <ImageWithFallback
                              src={getNailJobImage()}
                              alt={job.title || job.role || "Nail Technician Position"}
                              className="w-full h-full object-cover"
                              priority={true}
                            />
                          </div>
                        )}
                        
                        <CardContent className="pt-6 flex-grow">
                          <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.employment_type || "Full-time"}</span>
                          </div>
                          <h3 className="text-lg font-semibold mb-1">{job.title || job.role}</h3>
                          <div className="flex items-center text-gray-500 text-sm mb-3">
                            <MapPin className="h-4 w-4 mr-1" /> {job.location}
                          </div>
                          <p className="text-primary font-medium mb-2">
                            {job.salary_range || job.compensation_details || "$7,000 - $12,000/month"}
                          </p>
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {job.benefits?.join(", ") || "Free housing, busy plaza, high tips"}
                          </p>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button className="w-full" asChild>
                            <Link to="/jobs">Apply Now</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex left-0" />
              <CarouselNext className="hidden sm:flex right-0" />
            </Carousel>
          </div>

          <div className="mt-10 text-center">
            <Link to="/jobs">
              <Button variant="outline" size="lg">
                See More Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Render the jobs as a grid on desktop
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Beauty Jobs — Hiring Today</h2>
          <p className="text-gray-600 text-lg">
            Real opportunities from salons across the U.S. Find your next gig now.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {jobs.map((job) => {
            const isNail = isNailTechJob(job);
            
            return (
              <motion.div key={job.id} variants={item}>
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                  {isNail && (
                    <div className="aspect-video w-full overflow-hidden">
                      <ImageWithFallback
                        src={getNailJobImage()}
                        alt={job.title || job.role || "Nail Technician Position"}
                        className="w-full h-full object-cover"
                        priority={true}
                      />
                    </div>
                  )}
                  
                  <CardContent className="pt-6 flex-grow">
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.employment_type || "Full-time"}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{job.title || job.role}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-1" /> {job.location}
                    </div>
                    <p className="text-primary font-medium mb-2">
                      {job.salary_range || job.compensation_details || "$7,000 - $12,000/month"}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {job.benefits?.join(", ") || "Free housing, busy plaza, high tips"}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full" asChild>
                      <Link to="/jobs">Apply Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
        
        <div className="mt-10 text-center">
          <Link to="/jobs">
            <Button variant="outline" size="lg">
              See More Jobs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBeautyJobs;
