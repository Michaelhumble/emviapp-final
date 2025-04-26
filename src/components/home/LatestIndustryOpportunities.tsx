
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ChevronRight, Briefcase } from 'lucide-react';
import { getFeaturedJobs } from '@/utils/featuredContent';
import { Job } from '@/types/job';
import AuthAction from '@/components/common/AuthAction';

const LatestIndustryOpportunities = () => {
  const [featuredJobs, setFeaturedJobs] = React.useState<Job[]>([]);

  React.useEffect(() => {
    // Get featured job listings
    const jobs = getFeaturedJobs(3);
    setFeaturedJobs(jobs);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Opportunities Across Beauty & Business
          </h2>
          <p className="text-lg text-gray-600">
            From salons hiring to businesses for sale — discover what's available today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featuredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow border-gray-100">
                <CardContent className="p-5">
                  {job.image && (
                    <div className="mb-4 h-40 overflow-hidden rounded-md">
                      <img 
                        src={job.image} 
                        alt={job.title || job.role || "Business opportunity"} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg line-clamp-1">{job.title || job.role}</h3>
                    {job.is_featured && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-2 text-sm">
                    <span className="font-medium mr-2">{job.company || "Business"}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-4 text-sm">
                    <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                    <span>{job.location || "Location unavailable"}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {job.description || "Contact for more details about this opportunity."}
                  </p>
                  
                  <Link to={`/jobs/${job.id}`} className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center">
                    View details <ChevronRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/jobs">
            <Button variant="outline" size="lg" className="font-medium">
              <Briefcase className="mr-2 h-4 w-4" />
              Browse All Opportunities
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestIndustryOpportunities;
