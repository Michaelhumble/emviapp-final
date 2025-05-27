
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Building, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from './SectionHeader';

const WhatYouCanDoSection = () => {
  const actions = [
    {
      icon: Briefcase,
      title: { english: "Find Your Dream Job", vietnamese: "Tìm Công Việc Mơ Ước" },
      description: { english: "Browse nail technician positions at top salons", vietnamese: "Duyệt các vị trí thợ nail tại các salon hàng đầu" },
      buttonText: { english: "View Jobs", vietnamese: "Xem Việc Làm" },
      href: "/jobs",
      color: "purple"
    },
    {
      icon: Building,
      title: { english: "Buy or Sell a Salon", vietnamese: "Mua Bán Salon" },
      description: { english: "Connect with salon owners and potential buyers", vietnamese: "Kết nối với chủ salon và người mua tiềm năng" },
      buttonText: { english: "Browse Salons", vietnamese: "Duyệt Salon" },
      href: "/salons-for-sale",
      color: "pink"
    },
    {
      icon: Users,
      title: { english: "Hire Top Talent", vietnamese: "Thuê Nhân Tài Hàng Đầu" },
      description: { english: "Post jobs and find skilled nail technicians", vietnamese: "Đăng tin tuyển dụng và tìm thợ nail có kỹ năng" },
      buttonText: { english: "Post a Job", vietnamese: "Đăng Tin Tuyển Dụng" },
      href: "/post-job",
      color: "blue"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          title={{
            english: "What You Can Do on EmviApp",
            vietnamese: "Bạn Có Thể Làm Gì Trên EmviApp"
          }}
          subtitle={{
            english: "Everything you need for your nail industry career and business",
            vietnamese: "Mọi thứ bạn cần cho sự nghiệp và kinh doanh trong ngành nail"
          }}
          className="mb-12"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <div className={`mx-auto w-16 h-16 rounded-full bg-${action.color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 text-${action.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    {action.title.english}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {action.description.english}
                  </p>
                  <Link to={action.href}>
                    <Button 
                      className={`w-full bg-${action.color}-600 hover:bg-${action.color}-700 text-white`}
                    >
                      {action.buttonText.english}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatYouCanDoSection;
