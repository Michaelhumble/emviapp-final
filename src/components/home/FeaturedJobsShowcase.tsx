
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, DollarSign, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";
import { getFeaturedJobs } from "@/utils/featuredContent";

const FeaturedJobsShowcase = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  
  useEffect(() => {
    // Get featured jobs
    const featuredJobs = getFeaturedJobs(3);
    setJobs(featuredJobs);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Format date to display how long ago the job was posted
  const formatPostedDate = (dateString: string) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Featured Beauty Jobs
          </h2>
          <p className="text-lg text-gray-600">
            Premier opportunities at top salons with competitive pay and benefits
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {jobs.map((job) => (
            <motion.div key={job.id} variants={item}>
              <Card className="overflow-hidden h-full transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      {job.employment_type}
                    </Badge>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {job.posted_date ? formatPostedDate(job.posted_date) : "Recently posted"}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold font-serif mb-1">{job.title}</h3>
                  <div className="text-lg font-medium text-gray-700 mb-1">{job.company}</div>
                  
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700 mb-4">
                    <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                    <span className="font-medium">{job.compensation_details}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {job.vietnamese_description || job.description}
                  </p>
                  
                  <div className="mb-4 flex flex-wrap gap-2">
                    {job.specialties?.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-5">
                    {job.weekly_pay && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Weekly Pay
                      </Badge>
                    )}
                    {job.has_housing && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Housing Available
                      </Badge>
                    )}
                    {job.owner_will_train && (
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        Will Train
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Users className="h-4 w-4" />
                      Contact
                    </Button>
                    
                    <Link to={`/jobs/${job.id}`}>
                      <Button size="sm">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link to="/jobs">
            <Button size="lg" className="font-medium">
              View All Job Listings
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsShowcase;
