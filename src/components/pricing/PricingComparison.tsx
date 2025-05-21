
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const PricingComparison = () => {
  const { t } = useTranslation();

  // Feature comparison data
  const features = [
    {
      name: {
        english: "Job Listings",
        vietnamese: "Danh sách công việc"
      },
      starter: "3/month",
      pro: "10/month",
      ultimate: "Unlimited"
    },
    {
      name: {
        english: "Featured Placement",
        vietnamese: "Vị trí nổi bật"
      },
      starter: false,
      pro: true,
      ultimate: true
    },
    {
      name: {
        english: "Profile Visibility Boost",
        vietnamese: "Tăng khả năng hiển thị hồ sơ"
      },
      starter: "Basic",
      pro: "Enhanced",
      ultimate: "Maximum"
    },
    {
      name: {
        english: "Client Management",
        vietnamese: "Quản lý khách hàng"
      },
      starter: "Basic",
      pro: "Advanced",
      ultimate: "Premium"
    },
    {
      name: {
        english: "Analytics Reports",
        vietnamese: "Báo cáo phân tích"
      },
      starter: false,
      pro: "Monthly",
      ultimate: "Weekly"
    },
    {
      name: {
        english: "Priority Support",
        vietnamese: "Hỗ trợ ưu tiên"
      },
      starter: false,
      pro: true,
      ultimate: true
    },
    {
      name: {
        english: "Appointment Scheduling",
        vietnamese: "Lập lịch hẹn"
      },
      starter: "Basic",
      pro: "Advanced",
      ultimate: "Premium"
    },
    {
      name: {
        english: "Team Members",
        vietnamese: "Thành viên nhóm"
      },
      starter: "1",
      pro: "5",
      ultimate: "Unlimited"
    },
    {
      name: {
        english: "Marketing Tools",
        vietnamese: "Công cụ tiếp thị"
      },
      starter: "Basic",
      pro: "Advanced",
      ultimate: "Premium"
    },
    {
      name: {
        english: "Customer Support",
        vietnamese: "Hỗ trợ khách hàng"
      },
      starter: "Email",
      pro: "Email + Chat",
      ultimate: "Email + Chat + Phone"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-gradient-to-b from-white via-gray-50/30 to-white"
    >
      <div className="container px-4 sm:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-playfair bg-gradient-to-r from-purple-600 to-emvi-accent bg-clip-text text-transparent">
            {t({
              english: "Compare All Features",
              vietnamese: "So Sánh Tất Cả Tính Năng"
            })}
          </h2>
          <p className="text-gray-600 mt-2">
            {t({
              english: "Find the perfect plan for your beauty business",
              vietnamese: "Tìm gói hoàn hảo cho doanh nghiệp làm đẹp của bạn"
            })}
          </p>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-lg">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="py-6 bg-white w-1/4">{/* Empty first cell */}</TableHead>
                <TableHead className="py-6 px-6 text-center bg-white">
                  <span className="block text-xl font-playfair font-bold">Starter</span>
                  <span className="block text-sm text-gray-500">
                    {t({
                      english: "For individuals",
                      vietnamese: "Cho cá nhân" 
                    })}
                  </span>
                  <span className="font-bold text-emvi-accent block mt-1">$9.99</span>
                </TableHead>
                <TableHead className="py-6 px-6 text-center bg-purple-50 relative">
                  <Badge className="absolute top-4 right-4 bg-[#FF7743] text-white border-0">
                    {t({
                      english: "Popular",
                      vietnamese: "Phổ Biến"
                    })}
                  </Badge>
                  <span className="block text-xl font-playfair font-bold text-emvi-accent">Pro</span>
                  <span className="block text-sm text-gray-500">
                    {t({
                      english: "Growing businesses",
                      vietnamese: "Doanh nghiệp đang phát triển"
                    })}
                  </span>
                  <span className="font-bold text-emvi-accent block mt-1">$14.99</span>
                </TableHead>
                <TableHead className="py-6 px-6 text-center bg-white">
                  <span className="block text-xl font-playfair font-bold">Ultimate</span>
                  <span className="block text-sm text-gray-500">
                    {t({
                      english: "Established salons",
                      vietnamese: "Tiệm nail đã thành lập"
                    })}
                  </span>
                  <span className="font-bold text-emvi-accent block mt-1">$24.99</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature, index) => (
                <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <TableCell className="py-4 px-6 font-medium">
                    {t(feature.name)}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-center">
                    {typeof feature.starter === 'boolean' ? (
                      feature.starter ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                      )
                    ) : (
                      <span>{feature.starter}</span>
                    )}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-center bg-purple-50/50">
                    {typeof feature.pro === 'boolean' ? (
                      feature.pro ? (
                        <Check className="h-5 w-5 text-emvi-accent mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                      )
                    ) : (
                      <span className="font-medium">{feature.pro}</span>
                    )}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-center">
                    {typeof feature.ultimate === 'boolean' ? (
                      feature.ultimate ? (
                        <Check className="h-5 w-5 text-purple-700 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                      )
                    ) : (
                      <span>{feature.ultimate}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          {t({
            english: "All plans include basic features such as profile creation, messaging, and mobile access.",
            vietnamese: "Tất cả các gói bao gồm các tính năng cơ bản như tạo hồ sơ, nhắn tin và truy cập di động."
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default PricingComparison;
