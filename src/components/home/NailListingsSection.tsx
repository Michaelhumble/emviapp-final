
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, DollarSign, ExternalLink, Lock } from 'lucide-react';
import { Link } from "react-router-dom";
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';
import ValidatedLink from '@/components/common/ValidatedLink';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { cn } from '@/lib/utils';

const NailListingsSection = () => {
  const { isSignedIn } = useAuth();

  // Vietnamese Nail Job listings data
  const vietnameseNailJobs = [
    {
      id: "vn-job-1",
      title: "Tìm Thợ Nails Tất Cả – Great Falls, MT",
      business: "Magic Nails cần thợ biết làm bột và tay chân nước.",
      location: "Great Falls, MT",
      phone: "(406) 770-3070",
      compensation: "$1,200–$1,500/tuần",
      image: "/lovable-uploads/20e4e48d-b84f-46a0-9b09-386a94843baf.png",
      listingType: "job"
    },
    {
      id: "vn-job-2",
      title: "Cần Thợ Full Set Giỏi – Lương Cao",
      business: "Khu LA, tiệm chuyên dip, gel, full set.",
      location: "Los Angeles, CA",
      phone: "(323) 888-8888",
      compensation: "$1,800–$2,200/tuần",
      image: "/lovable-uploads/34594f32-0ac4-499d-8752-7baa4ec5a944.png",
      listingType: "job"
    },
    {
      id: "vn-job-3",
      title: "New Jersey – Cần Thợ Nail Bột",
      business: "Ưu tiên biết làm design đơn giản.",
      location: "New Jersey",
      phone: "(973) 222-2222",
      compensation: "$1,600/tuần + tip cao",
      image: "/lovable-uploads/5984db4c-29f7-462f-8307-f45107dc257e.png",
      listingType: "job"
    },
    {
      id: "vn-job-4",
      title: "Houston – Tuyển Gấp Thợ Tay Nước",
      business: "Cần 1 thợ có tay nghề chân tay nước",
      location: "Houston, TX",
      phone: "(713) 777-7777",
      compensation: "Làm part-time hoặc full-time, lương tốt",
      image: "/lovable-uploads/01f5003f-86f3-484f-85af-78d16880a724.png",
      listingType: "job"
    },
    {
      id: "vn-job-5",
      title: "Salon Chicago – Thợ Nail Chính",
      business: "Tiệm lớn cần thợ chính tay nghề cao",
      location: "Chicago, IL",
      phone: "(312) 333-3333",
      compensation: "$1,700–$2,000/tuần, khách đông",
      image: "/lovable-uploads/3e28131f-5a40-4c66-9480-5c83bd0d07e1.png",
      listingType: "job"
    }
  ];

  // Vietnamese Nail Salon sale listings data
  const vietnameseNailSalons = [
    {
      id: "vn-salon-1",
      title: "Sang Tiệm Nail – Arlington TX",
      description: "Bao khách, chủ đi định cư, thu nhập tốt",
      location: "Arlington, TX",
      phone: "(817) 111-1111",
      image: "/lovable-uploads/vn-salon1.jpg",
      listingType: "salon"
    },
    {
      id: "vn-salon-2",
      title: "Bán Tiệm Nail – Garland TX",
      description: "Giá mềm, bao đồ nghề, sẵn khách",
      location: "Garland, TX",
      phone: "(972) 222-2222",
      image: "/lovable-uploads/vn-salon2.jpg",
      listingType: "salon"
    },
    {
      id: "vn-salon-3",
      title: "Tiệm Sang Gấp – Grand Prairie",
      description: "Vào làm ngay, tiệm sạch, khu ổn định",
      location: "Grand Prairie, TX",
      phone: "(682) 333-3333",
      image: "/lovable-uploads/vn-salon3.jpg",
      listingType: "salon"
    },
    {
      id: "vn-salon-4",
      title: "Sang Tiệm Ở Plano – Bao Đẹp",
      description: "Chủ cần chuyển tiểu bang, tiệm 4 bàn, 6 ghế",
      location: "Plano, TX",
      phone: "(469) 444-4444",
      image: "/lovable-uploads/vn-salon4.jpg", 
      listingType: "salon"
    },
    {
      id: "vn-salon-5",
      title: "Tiệm Gần Downtown Houston – Sang Lại",
      description: "Giá tốt, decor đẹp, đầy đủ dụng cụ",
      location: "Houston, TX",
      phone: "(832) 555-5555",
      image: "/lovable-uploads/vn-salon5.jpg",
      listingType: "salon"
    }
  ];

  // Card component for Vietnamese listings with conditional details
  const VietnameseListingCard = ({ listing }) => {
    const isJob = listing.listingType === "job";
    const destinationPath = isJob ? "/jobs" : "/salons";
    
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="relative h-48">
          <ImageWithFallback
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-3 left-3 bg-pink-500 text-white">
            Featured
          </Badge>
        </div>
        
        <CardContent className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-lg mb-2">{listing.title}</h3>
          
          <p className="text-sm text-gray-700 mb-2">
            {isJob ? listing.business : listing.description}
          </p>
          
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{listing.location}</span>
          </div>
          
          {isSignedIn ? (
            <>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Phone className="h-4 w-4 mr-1" />
                <span>{listing.phone}</span>
              </div>
              
              {isJob && (
                <div className="text-sm font-medium text-green-700 mb-3">
                  <DollarSign className="h-4 w-4 inline mr-1" />
                  {listing.compensation}
                </div>
              )}
            </>
          ) : (
            <div className="text-sm italic text-purple-600 mb-3 flex items-center">
              <Lock className="h-4 w-4 mr-1" />
              Sign in to view contact details
            </div>
          )}
          
          <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
            <AuthAction
              onAction={() => true}
              redirectPath={destinationPath}
              customTitle="Sign in to view full details"
            >
              <ValidatedLink
                to={destinationPath}
                listingId={listing.id}
                listingType={listing.listingType}
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium",
                  "bg-purple-600 text-white px-3 py-2 hover:bg-purple-700 transition-colors"
                )}
              >
                View Details
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </ValidatedLink>
            </AuthAction>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Vietnamese Nail Jobs Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Vietnamese Featured Nail Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {vietnameseNailJobs.map((job) => (
              <VietnameseListingCard key={job.id} listing={job} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button 
              asChild 
              variant="default"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Link to="/jobs">View All Nail Jobs</Link>
            </Button>
          </div>
        </div>

        {/* Vietnamese Salons for Sale Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Vietnamese Salons for Sale</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {vietnameseNailSalons.map((salon) => (
              <VietnameseListingCard key={salon.id} listing={salon} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button 
              asChild 
              variant="default"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Link to="/salons">View All Nail Salons for Sale</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NailListingsSection;
