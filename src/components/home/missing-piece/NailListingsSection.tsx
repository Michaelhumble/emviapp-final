import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Lock } from 'lucide-react';
import ValidatedLink from '@/components/common/ValidatedLink';
import AuthAction from '@/components/common/AuthAction';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/context/auth/hooks/useSession';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const NailListingsSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSession();
  
  const isSignedIn = !!user;
  
  const nailJobImages = [
    "/lovable-uploads/6a8d9dce-243d-4080-a2ae-ca58ba74bc00.png",
    "/lovable-uploads/a3f7c4c0-2cb1-4ff0-9678-ff2d29861111.png",
    "/lovable-uploads/c66d9ec2-97f3-4ea6-8a56-bbed5d85bf28.png",
    "/lovable-uploads/6a7006a0-0a75-4764-9a4f-c267040cc256.png",
    "/lovable-uploads/7e046031-bbe5-4027-9cf6-977ead550a42.png"
  ];
  
  const vietnameseJobs = [
    {
      id: "vn-job-1",
      title: "Tìm Thợ Nails Tất Cả – Great Falls, MT",
      description: "Magic Nails cần thợ biết làm bột và tay chân nước.",
      location: "Great Falls, MT",
      phone: "(406) 770-3070",
      compensation: "$1,200–$1,500/tuần",
      featured: true
    },
    {
      id: "vn-job-2",
      title: "Tuyển Thợ Nail – Clawson, MI",
      description: "Tiệm nhỏ, 6 ghế khu Mỹ trắng, tip hậu. Cần thợ làm bột, dip, gel-x.",
      location: "Clawson, MI",
      phone: "(248) 403-6472 | (248) 525-9911",
      compensation: "$1,200–$1,800/tuần",
      featured: true
    },
    {
      id: "vn-job-3",
      title: "Thợ Nail Design – Humble, TX (Milano Nail Spa)",
      description: "Tiệm lớn nhất khu vực, tuyển thợ bột design. Receptionist $150/ngày.",
      location: "Humble, TX – 6947 FM 1960 Rd E",
      phone: "(346) 398-6868 (gặp Nhi)",
      compensation: ">$2,000/tuần",
      featured: true
    },
    {
      id: "vn-job-4",
      title: "Tuyển Thợ Nail – South Lake Tahoe, CA",
      description: "Tiệm dễ thương, khách du lịch nhiều. Ưu tiên biết tiếng Anh.",
      location: "South Lake Tahoe, CA",
      phone: "(916) 802-1922",
      compensation: "$1,600–$2,500+/tuần",
      featured: true
    },
    {
      id: "vn-job-5",
      title: "Cần Thợ Nail – Killeen, TX",
      description: "Tiệm lớn, giá cao, tip tốt. Ít nhất $1,500/tuần chưa tính tip.",
      location: "Killeen, TX",
      phone: "(512) 540-6173 | (806) 777-0526 (Johnny / Hannah)",
      compensation: "$1,500+/tuần",
      featured: true
    }
  ];

  const handleCardClick = (path: string) => {
    return async () => {
      return true; // Return true to allow navigation after auth
    };
  };

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        {/* VIETNAMESE NAIL JOBS SECTION */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-2 text-gray-900">
                Vietnamese Nail Jobs
              </h2>
              <p className="text-gray-600">
                Premium nail technician positions for Vietnamese speakers
              </p>
            </div>
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0 text-primary hover:text-primary-foreground hover:bg-primary border-primary"
              onClick={() => navigate('/jobs')}
            >
              View All Jobs →
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {vietnameseJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="h-full"
              >
                <AuthAction
                  onAction={handleCardClick(`/jobs/${job.id}`)}
                  redirectPath={`/jobs/${job.id}`}
                  customTitle="Sign in to view listing details"
                  fallbackContent={
                    <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                        <ImageWithFallback 
                          src={nailJobImages[index % nailJobImages.length]} 
                          alt={job.title} 
                          className="w-full h-full object-cover"
                          category="nail"
                        />
                        {job.featured && (
                          <Badge className="absolute top-3 left-3 bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-100">
                            Featured
                          </Badge>
                        )}
                      </div>
                      
                      <CardContent className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{job.location}</p>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{job.description}</p>
                        
                        <div className="mt-3 p-2 bg-gray-50 rounded-md mb-3 flex items-center text-sm">
                          <Lock className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-500">🔒 Sign in to view contact details</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full mt-2 gap-1 hover:bg-primary hover:text-white"
                            onClick={() => navigate(`/jobs/${job.id}`)}
                          >
                            <Eye className="h-3.5 w-3.5" /> View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  }
                  authenticatedContent={
                    <ValidatedLink 
                      to={`/jobs/${job.id}`}
                      listingId={job.id}
                      listingType="job"
                      className="no-underline block h-full"
                    >
                      <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                          <ImageWithFallback 
                            src={nailJobImages[index % nailJobImages.length]} 
                            alt={job.title} 
                            className="w-full h-full object-cover"
                            category="nail"
                          />
                          {job.featured && (
                            <Badge className="absolute top-3 left-3 bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-100">
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        <CardContent className="p-5 flex flex-col flex-grow">
                          <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{job.location}</p>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{job.description}</p>
                          
                          <div className="mt-2 flex flex-col gap-1">
                            <div className="text-sm font-medium text-gray-900 flex items-center">
                              <span className="mr-2">📞</span> {job.phone}
                            </div>
                            <div className="text-sm font-semibold text-emerald-700 flex items-center">
                              <span className="mr-2">💰</span> {job.compensation}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="w-full mt-2 gap-1 hover:bg-primary hover:text-white"
                            >
                              <Eye className="h-3.5 w-3.5" /> View Details
                            </Button>
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
        
        {/* Keep the rest of the existing sections */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-900">
            Premium Nail Salons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {/* Nail salon cards will go here */}
        </div>
      </div>
    </section>
  );
};

export default NailListingsSection;
