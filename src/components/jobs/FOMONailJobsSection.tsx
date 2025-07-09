import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Flame, Star, Clock, Phone, MapPin } from 'lucide-react';
import { useSession } from '@/context/auth/hooks/useSession';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import FOMOJobDetailModal from './FOMOJobDetailModal';

interface FOMOJob {
  salonName: string;
  title: string;
  salary: string;
  description: string;
  location: string;
  phone: string;
  type: 'gold' | 'premium';
  fomoLabel: string;
  imageUrl: string;
}

const FOMONailJobsSection: React.FC = () => {
  const { user } = useSession();
  const [selectedJob, setSelectedJob] = useState<FOMOJob | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Real Vietnamese Nail Job Ads - Gold & Premium Listings
  const recentlyFilledJobs: FOMOJob[] = [
    // Gold Featured (5 jobs)
    {
      salonName: "Elite Nail Studio",
      title: "TIM THỢ NAILS – Clawson, MI",
      salary: "$1,200–$1,800/tuần",
      description: "Chúng tôi đang tuyển gấp thợ nail có kinh nghiệm làm bột, dip và gel-x. Tiệm nằm tại vị trí đắt địa – khu Downtown Clawson, khách chủ yếu là người Mỹ trắng, lịch sự và tip hậu. Tiệm nhỏ xinh, chỉ 6 ghế, dễ làm, dễ quản lý.",
      location: "Clawson, MI",
      phone: "(248) 403-6472",
      type: "gold",
      fomoLabel: "Tiệm lớn",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/photo-1465146344425-f00d5f5c8f07.jpg"
    },
    {
      salonName: "Milano Nail Spa",
      title: "TIM THỢ NAILS – Humble, TX – Milano Nail Spa",
      salary: ">$2,000/tuần",
      description: "Tiệm nail lớn nhất khu Humble/Kingwood/Atascocita, zipcode 77346. Tuyển thợ bột chuyên design >$2,000/tuần. Receptionist $150/ngày. 60 người đang làm chung.",
      location: "6947 FM 1960 Rd E, Humble, TX 77346",
      phone: "(346) 398-6868",
      type: "gold",
      fomoLabel: "Chuyên design",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/photo-1509316975850-ff9c5deb0cd9.jpg"
    },
    {
      salonName: "Lake Tahoe Nails",
      title: "TIM THỢ NAILS – South Lake Tahoe, CA",
      salary: "$1,600-$2,500+/tuần",
      description: "Tiệm thợ trẻ, dễ thương cần tìm đồng đội làm CTN hoặc everything. Giá nail cao, tip cao khỏi chê. Khách du lịch chịu xài tiền. Thu nhập mùa hè. Tip $3,000+/tháng. Ưu tiên biết tiếng Anh, có sức khỏe.",
      location: "South Lake Tahoe, CA",
      phone: "(916) 802-1922",
      type: "gold",
      fomoLabel: "Khách sang",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/photo-1513836279014-a89f7a76ae86.jpg"
    },
    {
      salonName: "Killeen Nails",
      title: "TIM THỢ NAILS – Killeen, TX",
      salary: "Ít nhất $1,500/tuần",
      description: "Tiệm lớn, khách đông, làm giá cao, tip nhiều. Thợ làm ít nhất $1500/tuần chưa kể tip.",
      location: "Killeen, TX",
      phone: "(512) 540-6173",
      type: "gold",
      fomoLabel: "Tip hậu",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/photo-1518495973542-4542c06a5843.jpg"
    },
    {
      salonName: "Luxury Nails and Spa Columbus",
      title: "CẦN THỢ NAIL Ở COLUMBUS, GA",
      salary: "$1,500-$2,200/tuần",
      description: "Tiệm Luxury Nails and Spa cần thợ biết bột, tay chân nước, design. Thu nhập mùa này từ $1,500 - $2,200/tuần. Có chỗ ở cho thợ ở xa – môi trường làm việc vui vẻ, không tranh giành. Tiệm chuyên design – khách lịch sự, dễ thương.",
      location: "Columbus, GA",
      phone: "(706) 221-3953",
      type: "gold",
      fomoLabel: "Bao lương",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/photo-1469474968028-56623f02e42e.jpg"
    },
    // Premium Listings (5 jobs)
    {
      salonName: "Houston Nails",
      title: "Cần Thợ Nails Gấp Làm Việc Tại Houston, TX",
      salary: "$800-$1,000/tuần",
      description: "Tiệm đang cần thợ nail biết làm bột, tay chân nước. Thợ nam nữ đều ok. Không quang trọng tuổi tác. Làm full hoặc part time. Thợ bột lương $1,000/tuần. Thợ tay chân nước $800/tuần. Tiệm đóng cửa chủ nhật. Tiệm nhỏ, không cạnh tranh.",
      location: "Houston, TX 77051",
      phone: "(832) 489-6956",
      type: "premium",
      fomoLabel: "Thu nhập cao",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/photo-1582562124811-c09040d0a901.jpg"
    },
    {
      salonName: "V Star Nails Spa",
      title: "Cần Gấp Thợ Nails In Placerville CA 95667",
      salary: "Bao lương theo tay nghề",
      description: "Tiệm V Star Nails Spa đang cần thợ biết làm bột, dip, tay chân nước, biết làm đủ thứ càng tốt. Bao lương hoặc ăn chia tùy tay nghề. Tiệm khu shopping center, khu đông khách. Giá nails cao, típ hậu...Good location. Nơi làm việc vui vẻ, hòa đồng, thoải mái.",
      location: "3987 Missouri Flat Rd Placerville, CA 95667",
      phone: "(530) 622-8918",
      type: "premium",
      fomoLabel: "Khu Mỹ trắng",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/photo-1465146344425-f00d5f5c8f07.jpg"
    },
    {
      salonName: "Houston Mix Nail Salon",
      title: "TUYỂN THỢ NAIL (Houston, TX)",
      salary: "$900-$1,200/tuần",
      description: "Tiệm cần tuyển thợ bột (có thể design càng tốt). Tiệm nằm gần khu chợ Thắng Hưng, HK3, khu khách mix và tip cao. Bao lương từ $900-$1,200 (tuỳ theo tay nghề). Không trừ tiền supply và clean up.",
      location: "Houston, TX 77014",
      phone: "(832) 513-0833",
      type: "premium",
      fomoLabel: "Không drama",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/photo-1509316975850-ff9c5deb0cd9.jpg"
    },
    {
      salonName: "Champaign Nails",
      title: "Cần Gấp Thợ Nails In Champaign, Illinois",
      salary: "$1,000-$1,400/tuần",
      description: "Tiệm 3 tiệm lớn ở vùng Champaign and Mahomet, cần gấp thợ nails. Cần thợ biết làm bột, tay chân nước, wax, biết làm đủ thứ càng tốt. Bao lương $1000-$1400/6 ngày. không trừ tiền supply và clean up của thợ. chủ trẻ hơn hồi đó… không vào turn, có manager, chia turn qua system công bằng.",
      location: "Champaign & Mahomet, IL",
      phone: "(817) 501-6750",
      type: "premium",
      fomoLabel: "Income ổn định",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/photo-1513836279014-a89f7a76ae86.jpg"
    },
    {
      salonName: "Massachusetts Nail Studio",
      title: "Tiệm đang cần thêm thợ biết làm bột everything biết vẽ có tay ghề",
      salary: "$1,500-$2,200/tuần",
      description: "Mùa hè income (1500-2200) up. Tiền Tip 400-500up. Có bao lương nếu thợ có Tay nghề, biết vẽ, biết lấy shape chuẩn (coffin or almond). Tiệm my T rang, khong drama. Không trừ supply của thợ, Có phòng riêng tư sạch sẽ gần tiệm 5p.",
      location: "Massachusetts",
      phone: "(617) 540-2096",
      type: "premium",
      fomoLabel: "Môi trường vui vẻ",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/photo-1518495973542-4542c06a5843.jpg"
    }
  ];

  const handleViewDetails = (job: FOMOJob) => {
    setSelectedJob(job);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedJob(null);
  };

  const goldJobs = recentlyFilledJobs.filter(job => job.type === 'gold').slice(0, 5);
  const premiumJobs = recentlyFilledJobs.filter(job => job.type === 'premium').slice(0, 5);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* FOMO Alert Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-xl mb-8 shadow-lg"
        >
          <div className="flex items-center justify-center text-center space-x-2">
            <Flame className="w-5 h-5 text-yellow-300" />
            <p className="text-sm md:text-base font-semibold">
              🔥 Những job thật, lương thật vừa đăng—chỉ hiển thị trên EmviApp! Đăng nhập để xem số điện thoại & deal trực tiếp với chủ tiệm.
            </p>
            <Flame className="w-5 h-5 text-yellow-300" />
          </div>
        </motion.div>

        {/* Gold & Premium Top Listings Section */}
        <div className="mb-16">
          <div className="flex flex-col text-center items-center justify-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold font-playfair mb-2 text-gray-900">
              🔥 Gold & Premium Top Listings
            </h2>
            <p className="text-gray-800 text-lg font-extrabold">
              Real Vietnamese nail jobs with premium features and verified contact details
            </p>
          </div>

          {/* Gold Featured Row */}
          <div className="mb-12">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              ✨ Gold Featured (Row 1)
            </h3>
            
            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden">
              <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {goldJobs.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex-none w-80 snap-start"
                  >
                    <JobCard job={job} onViewDetails={handleViewDetails} isSignedIn={!!user} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {goldJobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <JobCard job={job} onViewDetails={handleViewDetails} isSignedIn={!!user} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Premium Row */}
          <div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center">
              <Star className="w-6 h-6 text-purple-500 mr-2" />
              👑 Premium (Row 2)
            </h3>
            
            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden">
              <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {premiumJobs.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex-none w-80 snap-start"
                  >
                    <JobCard job={job} onViewDetails={handleViewDetails} isSignedIn={!!user} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {premiumJobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <JobCard job={job} onViewDetails={handleViewDetails} isSignedIn={!!user} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Job Detail Modal */}
        {selectedJob && (
          <FOMOJobDetailModal
            job={selectedJob}
            isOpen={isDetailModalOpen}
            onClose={handleCloseModal}
            isSignedIn={!!user}
          />
        )}
      </div>
    </section>
  );
};

// Job Card Component
interface JobCardProps {
  job: FOMOJob;
  onViewDetails: (job: FOMOJob) => void;
  isSignedIn: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails, isSignedIn }) => {
  return (
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
          ✓ Verified
        </Badge>
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-extrabold mb-1 text-gray-900">
          {job.salonName}
        </h3>
        
        <p className="text-sm text-gray-800 mb-2 font-extrabold">
          {job.title}
        </p>
        
        <p className="text-lg font-extrabold mb-2 text-green-600">
          💰 {job.salary}
        </p>
        
        <p className="text-sm text-gray-700 line-clamp-2 mb-3 flex-grow font-bold">
          {job.description}
        </p>
        
        <div className="flex flex-col space-y-2 mt-auto">
          <p className="text-xs text-gray-700 font-extrabold flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {job.location}
          </p>
          
          {isSignedIn ? (
            <p className="text-xs text-green-600 font-extrabold flex items-center">
              <Phone className="w-3 h-3 mr-1" />
              {job.phone}
            </p>
          ) : (
            <p className="text-xs text-red-500 font-extrabold">
              🔒 Sign in to unlock contact details
            </p>
          )}
          
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-200">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full font-extrabold">
              Nail
            </Badge>
            <Button 
              onClick={() => onViewDetails(job)}
              size="sm" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-extrabold"
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FOMONailJobsSection;