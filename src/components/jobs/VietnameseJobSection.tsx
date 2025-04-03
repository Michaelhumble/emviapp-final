
import { useState } from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Phone, Clock, Building, LockIcon, Home, DollarSign, Calendar } from "lucide-react";
import { generateVietnameseNailSamples } from "@/utils/jobs/vietnameseJobSamples";

interface VietnameseJobSectionProps {
  checkExpiration: (job: Job) => boolean;
}

const VietnameseJobSection = ({ checkExpiration }: VietnameseJobSectionProps) => {
  const [tab, setTab] = useState<"active" | "expired">("active");
  const vietnameseJobs = generateVietnameseNailSamples(5);
  
  const activeJobs = vietnameseJobs.filter(job => !checkExpiration(job));
  const expiredJobs = vietnameseJobs.filter(job => checkExpiration(job));

  return (
    <div className="mt-12 pt-12 border-t">
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold mb-2">
          Tìm Việc Nail Lương Cao
        </h2>
        <p className="text-gray-600">
          Các tiệm nail đang tìm thợ trên khắp cả nước. Liên hệ ngay hôm nay!
        </p>
      </div>
      
      <Tabs defaultValue="active" className="mb-8" onValueChange={(value) => setTab(value as "active" | "expired")}>
        <TabsList className="mb-6">
          <TabsTrigger value="active" className="text-sm">
            Tin Đang Tuyển ({activeJobs.length})
          </TabsTrigger>
          <TabsTrigger value="expired" className="text-sm">
            Tin Hết Hạn ({expiredJobs.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {activeJobs.map(job => (
              <VietnameseJobCard 
                key={job.id} 
                job={job} 
                isExpired={false} 
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="expired" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            {expiredJobs.map(job => (
              <VietnameseJobCard 
                key={job.id} 
                job={job} 
                isExpired={true} 
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="text-center pt-6 pb-2">
        <Button variant="outline">Xem Thêm Tin Tuyển Dụng</Button>
      </div>
    </div>
  );
};

interface VietnameseJobCardProps {
  job: Job;
  isExpired: boolean;
}

const VietnameseJobCard = ({ job, isExpired }: VietnameseJobCardProps) => {
  return (
    <Card className={`overflow-hidden transition-all duration-200 hover:shadow-md ${
      isExpired ? 'bg-gray-50/80' : 'bg-white'
    }`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column with salon info */}
          <div className="w-full md:w-2/3">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              {job.trust_indicators?.verified && (
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  Đã Xác Thực
                </Badge>
              )}
            </div>
            
            <div className="flex items-center mb-3 text-gray-700">
              <Building className="h-4 w-4 mr-2" />
              <span className="font-medium">{job.company}</span>
            </div>
            
            <div className="flex items-center mb-3 text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{job.location}</span>
            </div>
            
            {/* Vietnamese job description */}
            <p className="text-gray-700 mb-4 border-l-2 border-amber-500 pl-3">
              {job.vietnamese_description}
            </p>
            
            {/* Job details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {job.salary_range && (
                <div className="flex items-center text-gray-700">
                  <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                  <span>Lương: {job.salary_range}</span>
                </div>
              )}
              {job.work_hours && (
                <div className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  <span>Giờ làm: {job.work_hours}</span>
                </div>
              )}
              {job.tip_range && (
                <div className="flex items-center text-gray-700">
                  <DollarSign className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Tips: {job.tip_range}</span>
                </div>
              )}
              {job.has_housing && (
                <div className="flex items-center text-gray-700">
                  <Home className="h-4 w-4 mr-2 text-purple-600" />
                  <span>Có chỗ ở</span>
                </div>
              )}
            </div>
            
            {/* Specialties */}
            {job.specialties && job.specialties.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Cần thợ:</div>
                <div className="flex flex-wrap gap-2">
                  {job.specialties.map((specialty, index) => (
                    <Badge 
                      key={index} 
                      className="bg-pink-100 text-pink-800 border-pink-200"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Contact section */}
            {isExpired ? (
              <div className="mt-4 mb-2">
                <Badge variant="destructive" className="flex items-center gap-1 mb-2">
                  <LockIcon size={12} /> Tin đã hết hạn
                </Badge>
                <p className="text-sm text-gray-500">
                  Tin đã hết hạn – vui lòng đăng lại để nhận thêm ứng viên
                </p>
              </div>
            ) : (
              <div className="mt-4">
                <div className="flex items-center mb-3 text-gray-700">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{job.contact_info?.owner_name} - {job.contact_info?.phone}</span>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1">Liên Hệ Ngay</Button>
                  <Button variant="outline" className="flex-1">Lưu Tin</Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Right column with benefits */}
          <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg self-start">
            <h4 className="font-medium mb-3">Ưu điểm của tiệm:</h4>
            <ul className="space-y-2">
              {job.benefits?.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-2 mt-0.5">•</div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center text-gray-600 text-sm">
                <Calendar className="h-3.5 w-3.5 mr-2" />
                <span>Đăng ngày: {new Date(job.created_at).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VietnameseJobSection;
