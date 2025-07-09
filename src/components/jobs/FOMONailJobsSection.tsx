import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Flame, Star, Clock, Phone, MapPin } from 'lucide-react';
import { useSession } from '@/context/auth/hooks/useSession';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import FOMOJobDetailModal from './FOMOJobDetailModal';

interface FOMOJob {
  salonName: string;
  title: string;
  salary: string;
  description: string;
  location: string;
  phone: string;
  type: 'gold' | 'premium';
  fomoLabel: string;
  imageUrl: string;
}

const FOMONailJobsSection: React.FC = () => {
  const { user } = useSession();
  const [selectedJob, setSelectedJob] = useState<FOMOJob | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Real Vietnamese Nail Job Ads - Recently Filled Top Listings
  const recentlyFilledJobs: FOMOJob[] = [
    // Gold Featured (5 jobs)
    {
      salonName: "Elite Nail Studio",
      title: "Tìm Thợ Nails – Great Falls, MT",
      salary: "$1,200–$1,500/tuần",
      description: "Magic Nails cần thợ biết làm bột và tay chân nước.",
      location: "Great Falls, MT",
      phone: "(406) 770-3070",
      type: "gold",
      fomoLabel: "Position Just Filled",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-1.jpg"
    },
    {
      salonName: "Premier Nail Lounge",
      title: "Tuyển Thợ Nail – Clawson, MI",
      salary: "$1,200–$1,800/tuần",
      description: "Tiệm nhỏ khu Mỹ trắng, tip hậu. Cần thợ làm bột, dip, gel-x.",
      location: "Clawson, MI",
      phone: "(248) 403-6472",
      type: "gold",
      fomoLabel: "Real Job",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-2.jpg"
    },
    {
      salonName: "Luxury Nail Gallery",
      title: "Thợ Nail Design – Milano Nail Spa, Humble, TX",
      salary: ">$2,000/tuần",
      description: "Receptionist $150/ngày. 60 người đang làm chung.",
      location: "6947 FM 1960 Rd E, Humble, TX",
      phone: "(346) 398-6868",
      type: "gold",
      fomoLabel: "Busy! Apply Fast",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-3.jpg"
    },
    {
      salonName: "Diamond Nail Resort",
      title: "Tuyển Thợ Nail – South Lake Tahoe, CA",
      salary: "$1,600–$2,500+/tuần",
      description: "Tiệm dễ thương, khách du lịch chịu chi.",
      location: "South Lake Tahoe, CA",
      phone: "(916) 802-1922",
      type: "gold",
      fomoLabel: "Position Just Filled",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-4.jpg"
    },
    {
      salonName: "Royal Nail Boutique",
      title: "Cần Thợ Nail – Killeen, TX",
      salary: "$1,500+/tuần",
      description: "Tiệm lớn, giá cao, tip tốt.",
      location: "Killeen, TX",
      phone: "(512) 540-6173",
      type: "gold",
      fomoLabel: "Real Job",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-5.jpg"
    },
    // Premium Listings (5 jobs)
    {
      salonName: "Prestige Nail Spa",
      title: "Tìm Người Làm Nail – New Jersey",
      salary: "$1,600/tuần + tip",
      description: "Khách ổn định, ưu tiên biết bột và design đơn giản.",
      location: "New Jersey",
      phone: "(551) 333-5678",
      type: "premium",
      fomoLabel: "Busy! Apply Fast",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-6.jpg"
    },
    {
      salonName: "Metropolitan Nail Studio",
      title: "Cần Gấp Thợ Làm Chân Tay Nước – Houston, TX",
      salary: "Part/Full-time – lương tốt",
      description: "Ưu tiên tay nghề cứng, làm nhẹ nhàng.",
      location: "Houston, TX",
      phone: "(832) 444-2299",
      type: "premium",
      fomoLabel: "Position Just Filled",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-7.jpg"
    },
    {
      salonName: "Elegant Nail Design",
      title: "Tuyển Thợ Nail – Seattle, WA",
      salary: "$1,800–$2,400/tuần",
      description: "Tiệm sang, chủ dễ chịu, cần thợ có kinh nghiệm.",
      location: "Seattle, WA",
      phone: "(206) 888-1234",
      type: "premium",
      fomoLabel: "Real Job",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-8.jpg"
    },
    {
      salonName: "Signature Nail Bar",
      title: "Tuyển Thợ Làm Dip Powder – Orlando, FL",
      salary: "$1,400–$1,900/tuần",
      description: "Khách trẻ, chủ yếu là Mỹ trắng.",
      location: "Orlando, FL",
      phone: "(407) 777-9898",
      type: "premium",
      fomoLabel: "Busy! Apply Fast",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-9.jpg"
    },
    {
      salonName: "Professional Nail Center",
      title: "Cần Thợ Full Set – Los Angeles, CA",
      salary: "$1,800–$2,200/tuần",
      description: "Làm việc trong môi trường chuyên nghiệp.",
      location: "Los Angeles, CA",
      phone: "(323) 555-9012",
      type: "premium",
      fomoLabel: "Position Just Filled",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/nail-10.jpg"
    }
  ];

  const handleViewDetails = (job: FOMOJob) => {
    setSelectedJob(job);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedJob(null);
  };

  const goldJobs = recentlyFilledJobs.filter(job => job.type === 'gold').slice(0, 5);
  const premiumJobs = recentlyFilledJobs.filter(job => job.type === 'premium').slice(0, 5);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Sticky FOMO Alert */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-xl mb-8 shadow-lg"
        >
          <div className="flex items-center justify-center text-center space-x-2">
            <Flame className="w-5 h-5 text-yellow-300" />
            <p className="text-sm md:text-base font-semibold">
              🔥 These are real, live jobs from our Nail Community—just filled! Join now to see the newest offers and unlock contact info. EmviApp is #1 for real beauty jobs—don't miss out!
            </p>
            <Flame className="w-5 h-5 text-yellow-300" />
          </div>
        </motion.div>

        {/* Recently Filled Top Listings Section */}
        <div className="mb-16">
          <div className="flex flex-col text-center items-center justify-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold font-playfair mb-2 text-gray-900">
              🔥 Recently Filled Top Listings
            </h2>
            <p className="text-gray-800 text-lg font-extrabold">
              Real Vietnamese nail jobs that just filled up — see what you're missing!
            </p>
          </div>

          {/* Gold Featured Row */}
          <div className="mb-12">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              ✨ Gold Featured (Row 1)
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
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center">
              <Star className="w-6 h-6 text-purple-500 mr-2" />
              👑 Premium (Row 2)
            </h3>
            
            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden">
              <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {premiumJobs.map((job, index) => (
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
              {premiumJobs.map((job, index) => (
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
    <Card className={`overflow-hidden h-full flex flex-col shadow-lg hover:shadow-xl transition-all cursor-pointer relative ${
      job.type === 'gold' 
        ? 'ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50' 
        : 'ring-2 ring-purple-400 bg-gradient-to-br from-purple-50 to-violet-50'
    }`}>
      {/* FOMO Label */}
      <div className={`absolute -top-2 -right-2 z-10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
        job.fomoLabel === 'Real Job' 
          ? 'bg-green-500' 
          : job.fomoLabel === 'Position Just Filled'
          ? 'bg-red-500'
          : 'bg-orange-500'
      }`}>
        {job.fomoLabel}
      </div>

      <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
        <ImageWithFallback 
          src={job.imageUrl} 
          alt={job.salonName} 
          className="w-full h-full object-cover"
          category="nail"
        />
        
        {/* Tier Badge */}
        <Badge className={`absolute top-2 left-2 font-bold ${
          job.type === 'gold' 
            ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white' 
            : 'bg-gradient-to-r from-purple-500 to-violet-600 text-white'
        }`}>
          {job.type === 'gold' ? '✨ GOLD FEATURED' : '👑 PREMIUM'}
        </Badge>

        {/* Verified Badge */}
        <Badge className="absolute top-2 right-2 bg-blue-500 text-white text-xs">
          ✓ Facebook Group
        </Badge>

        {/* Expired Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
          <p className="text-white text-xs font-semibold flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            Just Expired · Fills Fast
          </p>
        </div>
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-extrabold mb-1 text-gray-900">
          {job.salonName}
        </h3>
        
        <p className="text-sm text-gray-800 mb-2 font-extrabold">
          {job.title}
        </p>
        
        <p className="text-lg font-extrabold mb-2 text-green-600">
          💰 {job.salary}
        </p>
        
        <p className="text-sm text-gray-700 line-clamp-2 mb-3 flex-grow font-bold">
          {job.description}
        </p>
        
        <div className="flex flex-col space-y-2 mt-auto">
          <p className="text-xs text-gray-700 font-extrabold flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {job.location}
          </p>
          
          {isSignedIn ? (
            <p className="text-xs text-green-600 font-extrabold flex items-center">
              <Phone className="w-3 h-3 mr-1" />
              {job.phone}
            </p>
          ) : (
            <p className="text-xs text-red-500 font-extrabold">
              🔒 Sign in to unlock contact details
            </p>
          )}
          
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-200">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full font-extrabold">
              Nail
            </Badge>
            <Button 
              onClick={() => onViewDetails(job)}
              size="sm" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-extrabold"
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FOMONailJobsSection;