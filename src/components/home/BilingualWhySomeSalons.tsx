
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import SectionHeader from './sections/SectionHeader';

const BilingualWhySomeSalons = () => {
  const benefits = [
    {
      english: "Proven customer base with regular Vietnamese clientele",
      vietnamese: "Khách hàng thường xuyên, chủ yếu người Việt"
    },
    {
      english: "Established relationships with nail supply vendors",
      vietnamese: "Mối quan hệ tốt với nhà cung cấp dụng cụ nail"
    },
    {
      english: "Prime locations in Vietnamese communities",
      vietnamese: "Vị trí đắc địa trong cộng đồng người Việt"
    },
    {
      english: "Training and mentorship included",
      vietnamese: "Có đào tạo và hướng dẫn kỹ thuật"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <SectionHeader
          title={{
            english: "Why Buy an Established Vietnamese Salon?",
            vietnamese: "Tại Sao Nên Mua Tiệm Nail Việt Đã Có Sẵn?"
          }}
          subtitle={{
            english: "Join a proven business model with built-in success factors",
            vietnamese: "Tham gia mô hình kinh doanh đã được chứng minh với các yếu tố thành công sẵn có"
          }}
          className="mb-12"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 font-medium mb-2">
                      {benefit.vietnamese}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {benefit.english}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BilingualWhySomeSalons;
