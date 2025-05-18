
import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { CheckCheck } from 'lucide-react';

interface YesLadderProps {
  onOptionChange: (options: {
    expertReview: boolean;
    priorityPlacement: boolean;
    extendedReach: boolean;
  }) => void;
  suggestPremium: () => void;
}

const YesLadder: React.FC<YesLadderProps> = ({ onOptionChange, suggestPremium }) => {
  const { t } = useTranslation();
  const [options, setOptions] = useState({
    expertReview: false,
    priorityPlacement: false,
    extendedReach: false
  });

  useEffect(() => {
    // If user selects 2 or more options, suggest premium plan
    const selectedCount = Object.values(options).filter(Boolean).length;
    if (selectedCount >= 2) {
      suggestPremium();
    }
    
    onOptionChange(options);
  }, [options, onOptionChange, suggestPremium]);

  const handleOptionChange = (option: keyof typeof options, checked: boolean) => {
    setOptions(prev => ({ ...prev, [option]: checked }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#fdfbf8] rounded-[18px] border border-[#e9e3d9] p-6 mb-8"
    >
      <div className="flex items-center mb-4">
        <CheckCheck className="text-[#e0c89d] mr-2 h-5 w-5" />
        <h3 className="font-playfair text-lg font-semibold text-gray-900">
          {t({
            english: 'Boost Your Post',
            vietnamese: 'Tăng cường bài đăng của bạn'
          })}
        </h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        {t({
          english: 'Get up to 10x more applications with these premium features',
          vietnamese: 'Nhận được gấp 10 lần số lượng đơn ứng tuyển với các tính năng cao cấp này'
        })}
      </p>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="expertReview"
            checked={options.expertReview}
            onCheckedChange={(checked) => handleOptionChange('expertReview', checked === true)}
            className="mt-1"
          />
          <div>
            <Label htmlFor="expertReview" className="font-medium">
              {t({
                english: 'Expert Review & Enhancement',
                vietnamese: 'Đánh giá và cải thiện chuyên nghiệp'
              })}
            </Label>
            <p className="text-sm text-gray-500">
              {t({
                english: 'Our team reviews your post to make it stand out to qualified applicants',
                vietnamese: 'Đội ngũ của chúng tôi đánh giá bài đăng của bạn để làm nổi bật với các ứng viên đủ điều kiện'
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox
            id="priorityPlacement"
            checked={options.priorityPlacement}
            onCheckedChange={(checked) => handleOptionChange('priorityPlacement', checked === true)}
            className="mt-1"
          />
          <div>
            <Label htmlFor="priorityPlacement" className="font-medium">
              {t({
                english: 'Priority Placement',
                vietnamese: 'Vị trí ưu tiên'
              })}
            </Label>
            <p className="text-sm text-gray-500">
              {t({
                english: 'Your job appears at the top of search results for more visibility',
                vietnamese: 'Công việc của bạn xuất hiện ở đầu kết quả tìm kiếm để có thêm khả năng hiển thị'
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox
            id="extendedReach"
            checked={options.extendedReach}
            onCheckedChange={(checked) => handleOptionChange('extendedReach', checked === true)}
            className="mt-1"
          />
          <div>
            <Label htmlFor="extendedReach" className="font-medium">
              {t({
                english: 'Extended Reach',
                vietnamese: 'Mở rộng phạm vi tiếp cận'
              })}
            </Label>
            <p className="text-sm text-gray-500">
              {t({
                english: 'Promote your post to candidates beyond your immediate area',
                vietnamese: 'Quảng bá bài đăng của bạn đến các ứng viên ngoài khu vực của bạn'
              })}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default YesLadder;
