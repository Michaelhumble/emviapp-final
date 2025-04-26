
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ChevronRight, Briefcase, Building } from 'lucide-react';
import { getFeaturedJobs, getAllJobs, getAllBooths, getSalonsForSale } from '@/utils/featuredContent';
import { Job } from '@/types/job';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';

const LatestIndustryOpportunities = () => {
  const [diverseListings, setDiverseListings] = useState<Job[]>([]);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Get a diverse mix of listings
    const loadDiverseListings = async () => {
      // Get all types of listings
      const featuredJobs = getFeaturedJobs(2);
      const booths = getAllBooths(2);
      const salonsForSale = getSalonsForSale(2);
      const allJobs = getAllJobs(10);
      
      // Create a diverse mix by combining different listing types
      let mixed: Job[] = [];
      
      // Add a hair salon job
      const hairSalon = allJobs.find(job => 
        job.specialties?.some(s => s.toLowerCase().includes('hair')) || 
        job.title?.toLowerCase().includes('hair') ||
        job.company?.toLowerCase().includes('hair')
      );
      if (hairSalon) mixed.push(hairSalon);
      
      // Add a nail salon job
      const nailSalon = allJobs.find(job => 
        job.specialties?.some(s => s.toLowerCase().includes('nail')) || 
        job.title?.toLowerCase().includes('nail') ||
        job.company?.toLowerCase().includes('nail')
      );
      if (nailSalon) mixed.push(nailSalon);
      
      // Add a spa or wellness listing
      const spa = allJobs.find(job => 
        job.specialties?.some(s => s.toLowerCase().includes('spa') || s.toLowerCase().includes('wellness')) || 
        job.title?.toLowerCase().includes('spa') ||
        job.company?.toLowerCase().includes('spa') || 
        job.company?.toLowerCase().includes('wellness')
      );
      if (spa) mixed.push(spa);
      
      // Add a business for sale
      if (salonsForSale.length > 0) {
        mixed.push(salonsForSale[0]);
      }
      
      // Add a booth rental
      if (booths.length > 0) {
        mixed.push(booths[0]);
      }
      
      // Add a tattoo or beauty supply store listing
      const other = allJobs.find(job => 
        job.specialties?.some(s => 
          s.toLowerCase().includes('tattoo') || 
          s.toLowerCase().includes('supply') ||
          s.toLowerCase().includes('makeup')
        ) || 
        job.title?.toLowerCase().includes('tattoo') ||
        job.company?.toLowerCase().includes('tattoo') ||
        job.title?.toLowerCase().includes('supply') ||
        job.company?.toLowerCase().includes('supply')
      );
      if (other) mixed.push(other);
      
      // If we don't have enough yet, add from featured jobs
      while (mixed.length < 6 && featuredJobs.length > 0) {
        // Make sure we don't add duplicates
        const nextJob = featuredJobs.shift();
        if (nextJob && !mixed.some(item => item.id === nextJob.id)) {
          mixed.push(nextJob);
        }
      }
      
      // If still not enough, add from general listings
      while (mixed.length < 6) {
        // Add some variety in locations and business types
        const remainingJobs = allJobs.filter(job => !mixed.some(item => item.id === job.id));
        if (remainingJobs.length > 0) {
          mixed.push(remainingJobs[Math.floor(Math.random() * remainingJobs.length)]);
        } else {
          break;
        }
      }
      
      // Ensure we have exactly 6 listings
      mixed = mixed.slice(0, 6);
      
      // Randomize the order for variety
      mixed.sort(() => Math.random() - 0.5);
      
      setDiverseListings(mixed);
    };
    
    loadDiverseListings();
  }, []);

  const handleViewDetails = (jobId: string, forSale?: boolean) => {
    if (!isSignedIn) {
      // If not signed in, redirect to sign-in with redirect back to this job
      const redirectPath = forSale ? `/salons/${jobId}` : `/jobs/${jobId}`;
      navigate(`/sign-in?redirect=${encodeURIComponent(redirectPath)}`);
      return;
    }
    
    // If signed in, navigate directly
    if (forSale) {
      navigate(`/salons/${jobId}`);
    } else {
      navigate(`/jobs/${jobId}`);
    }
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {diverseListings.map((job, index) => (
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
                    <Building className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                    <span className="font-medium mr-2">{job.company || "Business"}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-4 text-sm">
                    <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                    <span>{job.location || "Location unavailable"}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {job.description || "Contact for more details about this opportunity."}
                  </p>
                  
                  {!isSignedIn && (
                    <div className="text-xs text-gray-500 italic mb-4">
                      Sign up or log in to view contact details
                    </div>
                  )}
                  
                  <AuthAction 
                    onAction={() => true}
                    redirectPath={job.for_sale ? `/salons/${job.id}` : `/jobs/${job.id}`}
                  >
                    <div className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center cursor-pointer">
                      View details <ChevronRight className="h-4 w-4" />
                    </div>
                  </AuthAction>
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
