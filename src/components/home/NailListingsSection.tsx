
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, DollarSign, Lock } from "lucide-react";
import AuthAction from "@/components/common/AuthAction";
import ValidatedLink from "@/components/common/ValidatedLink";
import { useAuth } from "@/context/auth";

const NailListingsSection = () => {
  const { isSignedIn } = useAuth();

  const vietnameseJobs = [
    {
      id: 'vn-job-1',
      title: 'Tìm Thợ Nails Tất Cả – Great Falls, MT',
      company: 'MAGIC NAILS cần thợ biết làm tất cả',
      description: 'Magic Nails cần thợ biết làm bột và tay chân nước.',
      salary: '$1,200–$1,500/tuần',
      location: 'Great Falls, MT',
      phone: '(406) 770-3070',
      type: 'job',
      image: '/lovable-uploads/22e3fd7a-4237-43fa-bbbb-c1fafcd171ca.png'
    },
    {
      id: 'vn-job-2',
      title: 'Cần Thợ Full Set Giỏi – Lương Cao',
      company: 'Khu LA, tiệm chuyên dip, gel, full set',
      description: 'Khu LA, tiệm chuyên dip, gel, full set.',
      salary: '$1,800–$2,200/tuần',
      location: 'Los Angeles, CA',
      phone: '(323) 888-8888',
      type: 'job',
      image: '/lovable-uploads/9fd70a92-786e-46d6-9ffd-eeacd71980a0.png'
    },
    {
      id: 'vn-job-3',
      title: 'New Jersey – Cần Thợ Nail Bột',
      company: 'Ưu tiên biết làm design đơn giản',
      description: 'Ưu tiên biết làm design đơn giản.',
      salary: '$1,600/tuần + tip cao',
      location: 'New Jersey',
      phone: '(973) 222-2222',
      type: 'job',
      image: '/lovable-uploads/33bd824b-1209-4c48-b67f-395aa2aeae75.png'
    },
    {
      id: 'vn-job-4',
      title: 'Houston – Tuyển Gấp Thợ Tay Nước',
      company: 'Cần 1 thợ có tay nghề chân tay nước',
      description: 'Cần 1 thợ có tay nghề chân tay nước',
      salary: 'Làm part-time hoặc full-time, lương tốt',
      location: 'Houston, TX',
      phone: '(713) 777-7777',
      type: 'job',
      image: '/lovable-uploads/301796c9-b003-4355-9834-317f8cd54ad3.png'
    },
    {
      id: 'vn-job-5',
      title: 'Salon Chicago – Thợ Nail Chính',
      company: 'Tiệm lớn cần thợ chính tay nghề cao',
      description: 'Tiệm lớn cần thợ chính tay nghề cao',
      salary: '$1,700–$2,000/tuần, khách đông',
      location: 'Chicago, IL',
      phone: '(312) 333-3333',
      type: 'job',
      image: '/lovable-uploads/460b3098-6079-44c3-a249-65c268c54fc8.png'
    }
  ];

  const vietnameseSalons = [
    {
      id: 'vn-salon-1',
      title: 'Sang Tiệm Nail – Arlington TX',
      description: 'Bao khách, chủ đi định cư, thu nhập tốt',
      location: 'Arlington, TX',
      phone: '(817) 111-1111',
      type: 'salon',
      image: '/lovable-uploads/22e3fd7a-4237-43fa-bbbb-c1fafcd171ca.png'
    },
    {
      id: 'vn-salon-2',
      title: 'Bán Tiệm Nail – Garland TX',
      description: 'Giá mềm, bao đồ nghề, sẵn khách',
      location: 'Garland, TX',
      phone: '(972) 222-2222',
      type: 'salon',
      image: '/lovable-uploads/9fd70a92-786e-46d6-9ffd-eeacd71980a0.png'
    },
    {
      id: 'vn-salon-3',
      title: 'Tiệm Sang Gấp – Grand Prairie',
      description: 'Vào làm ngay, tiệm sạch, khu ổn định',
      location: 'Grand Prairie, TX',
      phone: '(682) 333-3333',
      type: 'salon',
      image: '/lovable-uploads/33bd824b-1209-4c48-b67f-395aa2aeae75.png'
    },
    {
      id: 'vn-salon-4',
      title: 'Sang Tiệm Ở Plano – Bao Đẹp',
      description: 'Chủ cần chuyển tiểu bang, tiệm 4 bàn, 6 ghế',
      location: 'Plano, TX',
      phone: '(469) 444-4444',
      type: 'salon',
      image: '/lovable-uploads/301796c9-b003-4355-9834-317f8cd54ad3.png'
    },
    {
      id: 'vn-salon-5',
      title: 'Tiệm Gần Downtown Houston – Sang Lại',
      description: 'Giá tốt, decor đẹp, đầy đủ dụng cụ',
      location: 'Houston, TX',
      phone: '(832) 555-5555',
      type: 'salon',
      image: '/lovable-uploads/460b3098-6079-44c3-a249-65c268c54fc8.png'
    }
  ];

  const renderCard = (item: any, isJob: boolean) => (
    <Card key={item.id} className="overflow-hidden h-full hover:shadow-md transition-all">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-pink-500 hover:bg-pink-600 text-white">
          Featured
        </Badge>
      </div>
      <CardContent className="p-4 pt-4 flex flex-col h-full">
        <h3 className="font-medium text-lg mb-1 line-clamp-2">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{isJob ? item.company : item.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mt-1 mb-1">
          <MapPin size={14} className="mr-1" />
          <span>{item.location}</span>
        </div>

        {isSignedIn ? (
          <>
            {isJob && (
              <div className="flex items-center text-sm text-green-600 font-medium mt-1 mb-1">
                <DollarSign size={14} className="mr-1" />
                <span>{item.salary}</span>
              </div>
            )}
            
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Phone size={14} className="mr-1" />
              <span>{item.phone}</span>
            </div>
          </>
        ) : (
          <div className="flex items-center text-sm text-gray-400 italic mt-2 mb-2">
            <Lock size={14} className="mr-1" />
            <span>Sign in to unlock full listing</span>
          </div>
        )}

        <div className="mt-auto pt-3">
          <AuthAction
            onAction={() => true}
            redirectPath={isJob ? "/jobs" : "/salons"}
            customTitle={`View Full ${isJob ? "Job" : "Salon"} Details`}
          >
            <ValidatedLink
              to={isJob ? "/jobs" : "/salons"}
              listingId={item.id}
              listingType={isJob ? "job" : "salon"}
              className="w-full"
            >
              <Button 
                size="sm" 
                className="w-full mt-2"
              >
                View {isJob ? "Job" : "Salon"}
              </Button>
            </ValidatedLink>
          </AuthAction>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-12">
      {/* Vietnamese Nail Jobs Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Vietnamese Nail Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {vietnameseJobs.map(job => renderCard(job, true))}
        </div>
        <div className="flex justify-center mt-8">
          <ValidatedLink 
            to="/jobs" 
            listingId="all-jobs" 
            listingType="page"
            className="block"
          >
            <Button className="bg-violet-600 hover:bg-violet-700">
              View All Nail Jobs
            </Button>
          </ValidatedLink>
        </div>
      </div>

      {/* Vietnamese Salons for Sale Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Vietnamese Salons for Sale</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {vietnameseSalons.map(salon => renderCard(salon, false))}
        </div>
        <div className="flex justify-center mt-8">
          <ValidatedLink 
            to="/salons" 
            listingId="all-salons" 
            listingType="page"
            className="block"
          >
            <Button className="bg-violet-600 hover:bg-violet-700">
              View All Nail Salons for Sale
            </Button>
          </ValidatedLink>
        </div>
      </div>
    </div>
  );
};

export default NailListingsSection;
