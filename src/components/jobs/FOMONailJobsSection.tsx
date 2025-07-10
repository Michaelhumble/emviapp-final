import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Flame, Star, Clock, Phone, MapPin, LockIcon } from 'lucide-react';
import { useSession } from '@/context/auth/hooks/useSession';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import FOMOJobDetailModal from './FOMOJobDetailModal';
import { vietnameseJobs } from '@/data/protected/vietnameseJobs';

interface FOMOJob {
  salonName: string;
  title: string;
  salary: string;
  description: string;
  location: string;
  phone: string;
  type: 'gold' | 'premium';
  summary: string;
  imageUrl: string;
}

const FOMONailJobsSection: React.FC = () => {
  const { user } = useSession();
  const [selectedJob, setSelectedJob] = useState<FOMOJob | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Transform real Vietnamese jobs from protected data  
  const transformToFOMOJob = (job: any): FOMOJob => ({
    salonName: job.company || 'Nail Salon',
    title: job.title,
    salary: job.salary_range || job.compensation_details || 'Contact for details',
    description: job.description,
    location: job.location,
    phone: job.contact_info?.phone || '',
    type: job.pricingTier === 'diamond' ? 'gold' : 'premium',
    summary: job.description.substring(0, 100) + '...',
    imageUrl: job.image || 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-10.png'
  });

  // Real Vietnamese Nail Job Ads - Using protected authentic data
  const premiumJobs: FOMOJob[] = vietnameseJobs.map(transformToFOMOJob);

  const handleViewDetails = (job: FOMOJob) => {
    setSelectedJob(job);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedJob(null);
  };

  const goldJobs = premiumJobs.filter(job => job.type === 'gold').slice(0, 5);
  const premiumListings = premiumJobs.filter(job => job.type === 'premium').slice(0, 5);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* FOMO Alert Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-lg mb-8 shadow-lg border border-slate-700"
        >
          <div className="flex items-center justify-center text-center space-x-2">
             <p className="text-sm md:text-base font-inter font-medium">
                Verified listings. Trusted by the beauty industry's top professionals. All contact details are protected—sign in to connect directly with owners.
              </p>
          </div>
        </motion.div>

        {/* Premium Listings Section */}
        <div className="mb-16">
          <div className="flex flex-col text-center items-center justify-center mb-12">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-foreground mb-2">
              Featured & Premium Listings
            </h2>
            <p className="text-muted-foreground font-inter text-base max-w-2xl">
              Real Vietnamese nail jobs with verified contact details
            </p>
          </div>

          {/* Gold Featured Row */}
          <div className="mb-12">
            <h3 className="text-xl font-playfair font-bold text-foreground mb-6 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              Featured
            </h3>
            
            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden">
              <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {goldJobs.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex-none w-80 snap-start"
                  >
                    <JobCard job={job} onViewDetails={handleViewDetails} isSignedIn={!!user} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {goldJobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <JobCard job={job} onViewDetails={handleViewDetails} isSignedIn={!!user} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Premium Row */}
          <div>
            <h3 className="text-xl font-playfair font-bold text-foreground mb-6 flex items-center">
              <Star className="w-5 h-5 text-purple-500 mr-2" />
              Premium
            </h3>
            
            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden">
              <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {premiumListings.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex-none w-80 snap-start"
                  >
                    <JobCard job={job} onViewDetails={handleViewDetails} isSignedIn={!!user} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {premiumListings.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <JobCard job={job} onViewDetails={handleViewDetails} isSignedIn={!!user} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Job Detail Modal */}
        {selectedJob && (
          <FOMOJobDetailModal
            job={selectedJob}
            isOpen={isDetailModalOpen}
            onClose={handleCloseModal}
            isSignedIn={!!user}
          />
        )}
      </div>
    </section>
  );
};

// Job Card Component
interface JobCardProps {
  job: FOMOJob;
  onViewDetails: (job: FOMOJob) => void;
  isSignedIn: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails, isSignedIn }) => {
  return (
    <Card className={`overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-all cursor-pointer bg-white border ${
      job.type === 'gold' 
        ? 'border-l-4 border-l-yellow-500' 
        : 'border-l-4 border-l-purple-500'
    }`}>

      <div className="relative aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
        <ImageWithFallback 
          src={job.imageUrl} 
          alt={job.salonName} 
          className="w-full h-full object-cover"
          category="nail"
        />
        
        {/* Tier Badge */}
        <Badge className={`absolute top-3 left-3 text-xs font-medium ${
          job.type === 'gold' 
            ? 'bg-yellow-500 text-white' 
            : 'bg-purple-500 text-white'
        }`}>
          {job.type === 'gold' ? 'Featured' : 'Premium'}
        </Badge>
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow space-y-3">
        <div>
          <h3 className="text-lg font-inter font-bold text-foreground line-clamp-1">
            {job.title}
          </h3>
          
          <p className="text-sm text-muted-foreground font-inter flex items-center mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            {job.location}
          </p>
        </div>
        
        <div className="bg-green-50 p-2 rounded-lg">
          <p className="text-lg font-inter font-bold text-green-700">
            {job.salary}
          </p>
        </div>
        
        <p className="text-sm text-muted-foreground font-inter line-clamp-2 flex-grow">
          {job.summary}
        </p>
        
        <div className="flex flex-col space-y-2 mt-auto pt-3 border-t border-gray-100">
          {!isSignedIn && (
            <div className="flex items-center text-xs text-amber-600 font-inter font-medium">
              <LockIcon className="w-3 h-3 mr-1" />
              <span>Sign in to view contact info</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              Nail
            </Badge>
            <Button 
              onClick={() => onViewDetails(job)}
              size="sm" 
              variant="outline"
              className="text-xs font-inter font-medium"
            >
              Xem Chi Tiết
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FOMONailJobsSection;