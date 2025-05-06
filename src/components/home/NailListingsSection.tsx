
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign } from 'lucide-react';
import { MobileButton } from '@/components/ui/mobile-button';
import ValidatedLink from '@/components/common/ValidatedLink';
import AuthAction from '@/components/common/AuthAction';

const NailListingsSection = () => {
  // Vietnamese Featured Nail Jobs data (Row 1)
  const vietnameseNailJobs = [
    {
      id: 'vn-job-1',
      title: 'Tìm Thợ Nails Tất Cả – Great Falls, MT',
      company: 'MAGIC NAILS cần thợ biết làm tất cả',
      salary: '$1,200–$1,500/tuần',
      location: 'Great Falls, MT',
      type: 'job'
    },
    {
      id: 'vn-job-2',
      title: 'Cần Thợ Full Set Giỏi – Lương Cao',
      company: 'Khu LA, tiệm chuyên dip, gel, full set',
      salary: '$1,800–$2,200/tuần',
      location: 'Los Angeles, CA',
      type: 'job'
    },
    {
      id: 'vn-job-3',
      title: 'New Jersey – Cần Thợ Nail Bột',
      company: 'Ưu tiên biết làm design đơn giản',
      salary: '$1,600/tuần + tip cao',
      location: 'New Jersey',
      type: 'job'
    },
    {
      id: 'vn-job-4',
      title: 'Houston – Tuyển Gấp Thợ Tay Nước',
      company: 'Cần 1 thợ có tay nghề chân tay nước',
      salary: 'Làm part-time hoặc full-time, lương tốt',
      location: 'Houston, TX',
      type: 'job'
    },
    {
      id: 'vn-job-5',
      title: 'Salon Chicago – Thợ Nail Chính',
      company: 'Tiệm lớn cần thợ chính tay nghề cao',
      salary: '$1,700–$2,000/tuần, khách đông',
      location: 'Chicago, IL',
      type: 'job'
    }
  ];

  // Vietnamese Salons for Sale data (Row 2)
  const vietnameseSalonsForSale = [
    {
      id: 'vn-salon-1',
      title: 'Sang Tiệm Nail – Arlington TX',
      description: 'Bao khách, chủ đi định cư, thu nhập tốt',
      location: 'Arlington, TX',
      type: 'salon'
    },
    {
      id: 'vn-salon-2',
      title: 'Bán Tiệm Nail – Garland TX',
      description: 'Giá mềm, bao đồ nghề, sẵn khách',
      location: 'Garland, TX',
      type: 'salon'
    },
    {
      id: 'vn-salon-3',
      title: 'Tiệm Sang Gấp – Grand Prairie',
      description: 'Vào làm ngay, tiệm sạch, khu ổn định',
      location: 'Grand Prairie, TX',
      type: 'salon'
    },
    {
      id: 'vn-salon-4',
      title: 'Sang Tiệm Ở Plano – Bao Đẹp',
      description: 'Chủ cần chuyển tiểu bang, tiệm 4 bàn, 6 ghế',
      location: 'Plano, TX',
      type: 'salon'
    },
    {
      id: 'vn-salon-5',
      title: 'Tiệm Gần Downtown Houston – Sang Lại',
      description: 'Giá tốt, decor đẹp, đầy đủ dụng cụ',
      location: 'Houston, TX',
      type: 'salon'
    }
  ];

  const renderCard = (item: any, isJob: boolean) => (
    <Card key={item.id} className="overflow-hidden h-full hover:shadow-md transition-all">
      <div className="relative pt-2 px-3">
        <Badge className="absolute top-3 right-3 bg-pink-500 hover:bg-pink-600 text-white">
          Featured
        </Badge>
      </div>
      <CardContent className="p-4 pt-8 flex flex-col h-full">
        <h3 className="font-medium text-lg mb-1 line-clamp-2">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{isJob ? item.company : item.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span>{item.location}</span>
        </div>
        
        {isJob && (
          <div className="flex items-center text-sm text-gray-700 font-medium mb-4">
            <span className="mr-1">💵</span>
            <span>{item.salary}</span>
          </div>
        )}
        
        <div className="mt-auto pt-3">
          <AuthAction
            onAction={() => Promise.resolve(true)}
            customTitle={isJob ? "View Job Details" : "View Salon Details"}
            fallbackContent={
              <MobileButton 
                variant="outline" 
                className="w-full border-gray-300 hover:bg-gray-50 hover:text-gray-900"
              >
                {isJob ? "View Job" : "View Salon"}
              </MobileButton>
            }
          >
            <ValidatedLink
              to={isJob ? `/jobs/${item.id}` : `/salons/${item.id}`}
              className="w-full"
              listingId={item.id}
              listingType={isJob ? "job" : "salon"}
              fallbackRoute={isJob ? "/jobs" : "/salons"}
            >
              <MobileButton 
                variant="outline" 
                className="w-full border-gray-300 hover:bg-gray-50 hover:text-gray-900"
              >
                {isJob ? "View Job" : "View Salon"}
              </MobileButton>
            </ValidatedLink>
          </AuthAction>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
            Vietnamese Featured Nail Jobs
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-center">
            Exclusive job opportunities for experienced nail technicians
          </p>
        </div>

        {/* Row 1: Vietnamese Featured Nail Jobs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {vietnameseNailJobs.map((job) => renderCard(job, true))}
        </div>

        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
            Vietnamese Salons for Sale
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-center">
            Ready-to-own salon opportunities with established clientele
          </p>
        </div>

        {/* Row 2: Vietnamese Salons for Sale */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {vietnameseSalonsForSale.map((salon) => renderCard(salon, false))}
        </div>
      </div>
    </section>
  );
};

export default NailListingsSection;
