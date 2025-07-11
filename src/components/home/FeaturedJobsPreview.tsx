import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Briefcase, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

// Featured jobs preview data - limited to 3 for preview
const featuredJobs = [
  {
    id: "featured-1",
    title: "Senior Nail Technician",
    salon: "Glossy Nail Studio",
    location: "San Francisco, CA",
    salary: "$25-35/hr",
    type: "Full-time",
    featured: true
  },
  {
    id: "featured-2", 
    title: "Hair Stylist",
    salon: "Modern Hair Collective",
    location: "Los Angeles, CA",
    salary: "$22-30/hr",
    type: "Part-time",
    featured: true
  },
  {
    id: "featured-3",
    title: "Esthetician",
    salon: "Luxury Spa & Wellness",
    location: "New York, NY", 
    salary: "$20-28/hr",
    type: "Full-time",
    featured: true
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const FeaturedJobsPreview = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Star className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Job Opportunities
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Hand-picked positions from top salons and spas looking for talented professionals like you.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {featuredJobs.map((job) => (
            <motion.div key={job.id} variants={item}>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-foreground">{job.title}</h3>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span>{job.salon}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    {job.featured && (
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-primary">{job.salary}</p>
                      <p className="text-sm text-muted-foreground">{job.type}</p>
                    </div>
                    <Link to="/jobs">
                      <Button variant="outline" size="sm" className="group">
                        View
                        <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link to="/jobs">
            <Button 
              size="lg" 
              variant="outline"
              className="group px-8 py-3 text-base font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              See All Job Opportunities
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsPreview;