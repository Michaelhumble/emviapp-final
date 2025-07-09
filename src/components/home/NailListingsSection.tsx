
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Flame, Star, Clock } from 'lucide-react';
import ValidatedLink from '@/components/common/ValidatedLink';
import AuthAction from '@/components/common/AuthAction';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/context/auth/hooks/useSession';
import { nailSalonImages, cardDestinations } from '@/utils/beautyExchangeImages';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const NailListingsSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSession();
  
  const handleCardClick = (destinationPath: string) => {
    return async () => {
      return true; // Return true to allow navigation after auth
    };
  };

  // Real Vietnamese Nail Job Ads - Recently Filled Top Listings
  const recentlyFilledJobs = [
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

  // Legacy job listing content for the cards
  const nailJobListings = [
    {
      title: "Tìm Thợ Nails Magic Nails– Great Falls, MT",
      salary: "💰 $1,200–$1,500/tuần",
      description: "Magic Nails cần thợ biết làm bột và tay chân nước.",
      location: "📍Great Falls, MT"
    },
    {
      title: "Tuyển Thợ Nail – Clawson, MI",
      salary: "💰 $1,200–$1,800/tuần",
      description: "Tiệm nhỏ, khu Mỹ trắng, tip hậu. Cần thợ làm bột, dip, gel-x.",
      location: "📍Clawson, MI"
    },
    {
      title: "Thợ Nail Design – Humble, TX (Milano Nail Spa)",
      salary: "💰 >$2,000/tuần",
      description: "Tiệm lớn nhất khu vực, tuyển thợ bột design. Receptionist $150/ngày.",
      location: "📍Humble, TX"
    },
    {
      title: "Tuyển Thợ Nail – South Lake Tahoe, CA",
      salary: "💰 $1,600–$2,500+/tuần",
      description: "Tiệm dễ thương, khách du lịch chịu chi. Ưu tiên biết tiếng Anh.",
      location: "📍South Lake Tahoe, CA"
    },
    {
      title: "Cần Thợ Nail – Killeen, TX",
      salary: "💰 $1,500+/tuần",
      description: "Tiệm lớn, giá cao, tip tốt. Gặp Johnny/Hannah.",
      location: "📍Killeen, TX"
    }
  ];

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
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-2 text-gray-900">
              🔥 Recently Filled Top Listings
            </h2>
            <p className="text-gray-600 text-lg">
              Real Vietnamese nail jobs that just filled up — see what you're missing!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {recentlyFilledJobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="h-full"
              >
                <AuthAction
                  onAction={handleCardClick("/jobs")}
                  redirectPath="/jobs"
                  customTitle="Sign in to view nail job details"
                  fallbackContent={
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
                        <h3 className="text-lg font-bold mb-1 text-gray-900">
                          {job.salonName}
                        </h3>
                        
                        <p className="text-sm text-gray-700 mb-2 font-semibold">
                          {job.title}
                        </p>
                        
                        <p className="text-lg font-bold mb-2 text-green-600">
                          💰 {job.salary}
                        </p>
                        
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-grow">
                          {job.description}
                        </p>
                        
                        <div className="flex flex-col space-y-2 mt-auto">
                          <p className="text-xs text-gray-500 font-semibold">
                            📍 {job.location}
                          </p>
                          <p className="text-xs text-red-500 font-semibold">
                            🔒 Sign in to unlock contact details
                          </p>
                          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-200">
                            <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full">
                              Nail
                            </Badge>
                            <Button 
                              onClick={() => navigate("/jobs")} 
                              size="sm" 
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  }
                  authenticatedContent={
                    <ValidatedLink 
                      to="/jobs" 
                      listingId="nails-general" 
                      listingType="page"
                      className="no-underline block h-full"
                    >
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
                          <h3 className="text-lg font-bold mb-1 text-gray-900">
                            {job.salonName}
                          </h3>
                          
                          <p className="text-sm text-gray-700 mb-2 font-semibold">
                            {job.title}
                          </p>
                          
                          <p className="text-lg font-bold mb-2 text-green-600">
                            💰 {job.salary}
                          </p>
                          
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-grow">
                            {job.description}
                          </p>
                          
                          <div className="flex flex-col space-y-2 mt-auto">
                            <p className="text-xs text-gray-500 font-semibold">
                              📍 {job.location}
                            </p>
                            <p className="text-xs text-green-600 font-semibold">
                              📞 {job.phone}
                            </p>
                            <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-200">
                              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full">
                                Nail
                              </Badge>
                              <Button 
                                size="sm" 
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold"
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </ValidatedLink>
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Original Section */}
        <div className="flex flex-col text-center items-center justify-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
            Nail Listings — Preview Spaces
          </h2>
          <p className="text-gray-600">
            Discover premium nail salon spaces and services. Browse our listings.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {nailSalonImages.map((imageSrc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="h-full"
            >
              <AuthAction
                onAction={handleCardClick("/jobs")}
                redirectPath="/jobs"
                customTitle="Sign in to view nail job details"
                fallbackContent={
                  <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      <ImageWithFallback 
                        src={imageSrc} 
                        alt={`Nail Salon ${index + 1}`} 
                        className="w-full h-full object-cover"
                        category="nail"
                      />
                      <Badge className="absolute top-2 left-2 bg-amber-500 text-white hover:bg-amber-600">
                        ★ FEATURED
                      </Badge>
                    </div>
                    
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-1">
                        {nailJobListings[index]?.title || `Nail Studio ${index + 1}`}
                      </h3>
                      
                      <p className="text-sm font-medium mb-2">
                        {nailJobListings[index]?.salary || "💰 $1,200-1,800/week"}
                      </p>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                        {nailJobListings[index]?.description || "Premium nail salon with modern facilities and high-end clientele. Great opportunity for experienced nail technicians."}
                      </p>
                      
                      <div className="flex flex-col space-y-2 mt-auto">
                        <p className="text-xs text-gray-500">
                          {nailJobListings[index]?.location || "📍Location information"}
                        </p>
                        <p className="text-xs text-gray-500">
                          🔒 Sign in to view contact info
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full">
                            Nail
                          </Badge>
                          <Button 
                            onClick={() => navigate("/jobs")} 
                            size="sm" 
                            className="bg-[#9B51E0] hover:bg-[#8A46C2] text-white rounded-xl ml-auto"
                          >
                            Xem Chi Tiết
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                }
                authenticatedContent={
                  <ValidatedLink 
                    to="/jobs" 
                    listingId="nails-general" 
                    listingType="page"
                    className="no-underline block h-full"
                  >
                    <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                        <ImageWithFallback 
                          src={imageSrc} 
                          alt={`Nail Salon ${index + 1}`} 
                          className="w-full h-full object-cover"
                          category="nail"
                        />
                        <Badge className="absolute top-2 left-2 bg-amber-500 text-white hover:bg-amber-600">
                          ★ FEATURED
                        </Badge>
                      </div>
                      
                      <CardContent className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold mb-1">
                          {nailJobListings[index]?.title || `Nail Studio ${index + 1}`}
                        </h3>
                        
                        <p className="text-sm font-medium mb-2">
                          {nailJobListings[index]?.salary || "💰 $1,200-1,800/week"}
                        </p>
                        
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                          {nailJobListings[index]?.description || "Premium nail salon with modern facilities and high-end clientele. Great opportunity for experienced nail technicians."}
                        </p>
                        
                        <div className="flex flex-col space-y-2 mt-auto">
                          <p className="text-xs text-gray-500">
                            {nailJobListings[index]?.location || "📍Location information"}
                          </p>
                          <p className="text-xs text-gray-500">
                            🔒 Sign in to view contact info
                          </p>
                          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                            <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full">
                              Nail
                            </Badge>
                            <Button 
                              size="sm" 
                              className="bg-[#9B51E0] hover:bg-[#8A46C2] text-white rounded-xl ml-auto"
                            >
                              Xem Chi Tiết
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ValidatedLink>
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NailListingsSection;
