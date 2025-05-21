
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

const PricingComparison = () => {
  const { t } = useTranslation();

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
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16"
    >
      <div className="container px-4 sm:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-playfair">
            {t({
              english: "Compare Plans",
              vietnamese: "So Sánh Các Gói"
            })}
          </h2>
          <p className="text-gray-600 mt-2">
            {t({
              english: "Find the perfect plan for your beauty business",
              vietnamese: "Tìm gói hoàn hảo cho doanh nghiệp làm đẹp của bạn"
            })}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-4 px-6 text-left text-gray-600 font-medium bg-gray-50 rounded-l-lg"></th>
                <th className="py-4 px-6 text-center bg-gray-50">
                  <span className="block text-xl font-playfair font-bold">Starter</span>
                  <span className="block text-sm text-gray-500">For individuals</span>
                </th>
                <th className="py-4 px-6 text-center bg-purple-50 relative">
                  <Badge className="absolute top-2 right-2 bg-[#FF7743] text-white border-0">Popular</Badge>
                  <span className="block text-xl font-playfair font-bold text-emvi-accent">Pro</span>
                  <span className="block text-sm text-gray-500">Growing businesses</span>
                </th>
                <th className="py-4 px-6 text-center bg-gray-50 rounded-r-lg">
                  <span className="block text-xl font-playfair font-bold">Ultimate</span>
                  <span className="block text-sm text-gray-500">Established salons</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-4 px-6 border-t text-gray-800 font-medium">
                    {t(feature.name)}
                  </td>
                  <td className="py-4 px-6 border-t text-center">
                    {typeof feature.starter === 'boolean' ? (
                      feature.starter ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                      )
                    ) : (
                      <span>{feature.starter}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 border-t text-center bg-purple-50/50">
                    {typeof feature.pro === 'boolean' ? (
                      feature.pro ? (
                        <Check className="h-5 w-5 text-emvi-accent mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                      )
                    ) : (
                      <span className="font-medium">{feature.pro}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 border-t text-center">
                    {typeof feature.ultimate === 'boolean' ? (
                      feature.ultimate ? (
                        <Check className="h-5 w-5 text-purple-700 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                      )
                    ) : (
                      <span>{feature.ultimate}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
