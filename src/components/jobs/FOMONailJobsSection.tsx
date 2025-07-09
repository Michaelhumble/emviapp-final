import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Flame, Star, Clock, Phone, MapPin, LockIcon } from 'lucide-react';
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
  summary: string;
  imageUrl: string;
}

const FOMONailJobsSection: React.FC = () => {
  const { user } = useSession();
  const [selectedJob, setSelectedJob] = useState<FOMOJob | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Real Vietnamese Nail Job Ads - Clean Listing Format
  const premiumJobs: FOMOJob[] = [
    // Gold Featured (5 jobs)
    {
      salonName: "Elite Nail Studio",
      title: "TIM THỢ NAILS – Clawson, MI",
      salary: "$1,200–$1,800/tuần",
      description: "Chúng tôi đang tuyển gấp thợ nail có kinh nghiệm làm bột, dip và gel-x. Tiệm nằm tại vị trí đắt địa – khu Downtown Clawson, khách chủ yếu là người Mỹ trắng, lịch sự và tip hậu. Tiệm nhỏ xinh, chỉ 6 ghế, dễ làm, dễ quản lý.",
      location: "Clawson, MI",
      phone: "(248) 403-6472",
      type: "gold",
      summary: "Khu Downtown, khách Mỹ trắng, tip hậu",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-10.png"
    },
    {
      salonName: "Milano Nail Spa",
      title: "TIM THỢ NAILS – Humble, TX",
      salary: ">$2,000/tuần",
      description: "Tiệm nail lớn nhất khu Humble/Kingwood/Atascocita, zipcode 77346. Tuyển thợ bột chuyên design >$2,000/tuần. Receptionist $150/ngày. 60 người đang làm chung. 6947 FM 1960 Rd E, Humble TX 77346.",
      location: "Humble, TX",
      phone: "(346) 398-6868",
      type: "gold",
      summary: "Tiệm lớn nhất, chuyên design, 60 người",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-12.png"
    },
    {
      salonName: "Lake Tahoe Nails",
      title: "TIM THỢ NAILS – South Lake Tahoe, CA",
      salary: "$1,600-$2,500+/tuần",
      description: "Tiệm thợ trẻ, dễ thương cần tìm đồng đội làm CTN hoặc everything. Giá nail cao, tip cao khỏi chê. Khách du lịch chịu xài tiền. Thu nhập mùa hè $1,600-$2,500+/tuần. Tip $3,000+/tháng. Ưu tiên biết tiếng Anh, có sức khỏe.",
      location: "South Lake Tahoe, CA",
      phone: "(916) 802-1922",
      type: "gold",
      summary: "Khách du lịch, giá cao, tip $3,000+/tháng",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-13.png"
    },
    {
      salonName: "Killeen Elite Nails",
      title: "TIM THỢ NAILS – Killeen, TX",
      salary: "Ít nhất $1,500/tuần",
      description: "Tiệm lớn, khách đông, làm giá cao, tip nhiều. Thợ làm ít nhất $1500/tuần chưa kể tip. Liên hệ: Johnny / Hannah (512) 540-6173 | (806) 777-0526",
      location: "Killeen, TX",
      phone: "(512) 540-6173",
      type: "gold",
      summary: "Tiệm lớn, giá cao, tip nhiều",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-6.png"
    },
    {
      salonName: "Luxury Nails Columbus",
      title: "CẦN THỢ NAIL Ở COLUMBUS, GA",
      salary: "$1,500-$2,200/tuần",
      description: "Tiệm Luxury Nails and Spa cần thợ biết bột, tay chân nước, design. Thu nhập mùa này từ $1,500 - $2,200/tuần. Có chỗ ở cho thợ ở xa – môi trường làm việc vui vẻ, không tranh giành. Tiệm chuyên design – khách lịch sự, dễ thương. Gần Columbus Airport, trong shopping center.",
      location: "Columbus, GA",
      phone: "(706) 221-3953",
      type: "gold",
      summary: "Có chỗ ở, chuyên design, khách lịch sự",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(003).png"
    },
    // Premium Listings (5 jobs)
    {
      salonName: "Houston Premium Nails",
      title: "Cần Thợ Nails Gấp Làm Việc Tại Houston, TX",
      salary: "$800-$1,000/tuần",
      description: "Tiệm đang cần thợ nail biết làm bột, tay chân nước. Thợ nam nữ đều ok. Không quang trọng tuổi tác. Làm full hoặc part time. Thợ bột lương $ 1,000 / tuần. Thợ tay chân nước $ 800 / tuần. Tiệm đóng cửa chủ nhật. Tiệm nhỏ, không cạnh tranh. Không khí làm việc vui vẻ, hòa đồng.",
      location: "Houston, TX",
      phone: "(832) 489-6956",
      type: "premium",
      summary: "Full/part time, không cạnh tranh, vui vẻ",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(01).png"
    },
    {
      salonName: "V Star Nails Spa",
      title: "Cần Gấp Thợ Nails In Placerville CA 95667",
      salary: "Bao lương theo tay nghề",
      description: "Tiệm V Star Nails Spa đang cần thợ biết làm bột, dip, tay chân nước, biết làm đủ thứ càng tốt. Bao lương hoặc ăn chia tùy tay nghề. Tiệm khu shopping center, khu đông khách. Giá nails cao, típ hậu...Good location. Nơi làm việc vui vẻ, hòa đồng, thoải mái, bảo đảm thu nhập quanh năm.",
      location: "Placerville, CA",
      phone: "(530) 622-8918",
      type: "premium",
      summary: "Shopping center, giá cao, tip hậu",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated02.png"
    },
    {
      salonName: "Houston Mix Nails",
      title: "TUYỂN THỢ NAIL (Houston, TX)",
      salary: "$900-$1,200/tuần",
      description: "Tiệm cần tuyển thợ bột (có thể design càng tốt). Tiệm nằm gần khu chợ Thắng Hưng, HK3 , khu khách mix và tip cao. Bao lương từ $900 -$ 1,200 (tuỳ theo tay nghề). Không trừ tiền supply và clean up.",
      location: "Houston, TX",
      phone: "(832) 513-0833",
      type: "premium",
      summary: "Gần chợ Thắng Hưng, tip cao, không trừ supply",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(04).png"
    },
    {
      salonName: "Champaign Nail Group",
      title: "Cần Gấp Thợ Nails In Champaign, Illinois",
      salary: "$1,000-$1,400/tuần",
      description: "Tiệm 3 tiệm lớn ở vùng Champaign and Mahomet, cần gấp thợ nails. Cần thợ biết làm bột, tay chân nước, wax, biết làm đủ thứ càng tốt. Bao lương $1000-$1400/6 ngày. Tùy khả năng. không trừ tiền supply và clean up của thợ. chủ trẻ hơn hồi đó… không vào turn, có manager, chia turn qua system công bằng. môi trường làm việc vui vẻ, thoải mái. Có chỗ ở cho thợ.",
      location: "Champaign, IL",
      phone: "(817) 501-6750",
      type: "premium",
      summary: "3 tiệm lớn, có chỗ ở, chia turn công bằng",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(1)0.png"
    },
    {
      salonName: "Massachusetts Nail Studio",
      title: "Tiệm đang cần thêm thợ biết làm bột everything biết vẽ có tay ghề",
      salary: "$1,500-$2,200/tuần",
      description: "Mùa hè income ( 1500-2200) up. Tiền Tip 400-500up. Có bao lương nếu thợ có Tay nghề , biết vẽ , biết lấy shape chuẩn ( coffin or almond). Tiệm my T rang, khong drama. Không trừ supply của thợ, Có phòng riêng tư sạch sẽ gần tiệm 5p. Tiệm hoà đồng, vui vẽ, không tranh giành và làm có tiền ổn định lâu dài,và ko thích ồn ào drama.",
      location: "Massachusetts",
      phone: "(617) 540-2096",
      type: "premium",
      summary: "Biết vẽ, shape chuẩn, có phòng riêng, không drama",
      imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated-26.png"
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

  const goldJobs = premiumJobs.filter(job => job.type === 'gold').slice(0, 5);
  const premiumListings = premiumJobs.filter(job => job.type === 'premium').slice(0, 5);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* FOMO Alert Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-lg mb-8 shadow-lg border border-slate-700"
        >
          <div className="flex items-center justify-center text-center space-x-2">
             <p className="text-sm md:text-base font-inter font-medium">
                Verified listings. Trusted by the beauty industry's top professionals. All contact details are protected—sign in to connect directly with owners.
              </p>
          </div>
        </motion.div>

        {/* Premium Listings Section */}
        <div className="mb-16">
          <div className="flex flex-col text-center items-center justify-center mb-12">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-foreground mb-2">
              Featured & Premium Listings
            </h2>
            <p className="text-muted-foreground font-inter text-base max-w-2xl">
              Real Vietnamese nail jobs with verified contact details
            </p>
          </div>

          {/* Gold Featured Row */}
          <div className="mb-12">
            <h3 className="text-xl font-playfair font-bold text-foreground mb-6 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              Featured
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
            <h3 className="text-xl font-playfair font-bold text-foreground mb-6 flex items-center">
              <Star className="w-5 h-5 text-purple-500 mr-2" />
              Premium
            </h3>
            
            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden">
              <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {premiumListings.map((job, index) => (
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
              {premiumListings.map((job, index) => (
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
    <Card className={`overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-all cursor-pointer bg-white border ${
      job.type === 'gold' 
        ? 'border-l-4 border-l-yellow-500' 
        : 'border-l-4 border-l-purple-500'
    }`}>

      <div className="relative aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
        <ImageWithFallback 
          src={job.imageUrl} 
          alt={job.salonName} 
          className="w-full h-full object-cover"
          category="nail"
        />
        
        {/* Tier Badge */}
        <Badge className={`absolute top-3 left-3 text-xs font-medium ${
          job.type === 'gold' 
            ? 'bg-yellow-500 text-white' 
            : 'bg-purple-500 text-white'
        }`}>
          {job.type === 'gold' ? 'Featured' : 'Premium'}
        </Badge>
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow space-y-3">
        <div>
          <h3 className="text-lg font-inter font-bold text-foreground line-clamp-1">
            {job.title}
          </h3>
          
          <p className="text-sm text-muted-foreground font-inter flex items-center mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            {job.location}
          </p>
        </div>
        
        <div className="bg-green-50 p-2 rounded-lg">
          <p className="text-lg font-inter font-bold text-green-700">
            {job.salary}
          </p>
        </div>
        
        <p className="text-sm text-muted-foreground font-inter line-clamp-2 flex-grow">
          {job.summary}
        </p>
        
        <div className="flex flex-col space-y-2 mt-auto pt-3 border-t border-gray-100">
          {!isSignedIn && (
            <div className="flex items-center text-xs text-amber-600 font-inter font-medium">
              <LockIcon className="w-3 h-3 mr-1" />
              <span>Sign in to view contact info</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              Nail
            </Badge>
            <Button 
              onClick={() => onViewDetails(job)}
              size="sm" 
              variant="outline"
              className="text-xs font-inter font-medium"
            >
              Xem Chi Tiết
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FOMONailJobsSection;