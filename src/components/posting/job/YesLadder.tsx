
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface YesLadderItem {
  question: string;
  vietnameseQuestion: string;
  benefit: string;
  vietnameseBenefit: string;
  upgrade: string;
  vietnameseUpgrade: string;
}

interface YesLadderProps {
  onSelectPremium: () => void;
  onSelectFeature: () => void;
  onSelectDiamond: () => void;
  className?: string;
}

const YesLadder: React.FC<YesLadderProps> = ({
  onSelectPremium,
  onSelectFeature,
  onSelectDiamond,
  className = ""
}) => {
  const { t, isVietnamese } = useTranslation();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [animation, setAnimation] = useState<'enter' | 'exit' | null>(null);

  const yesLadderItems: YesLadderItem[] = [
    {
      question: "Want your job seen by more candidates?",
      vietnameseQuestion: "Bạn muốn tin tuyển dụng của mình được nhiều ứng viên nhìn thấy hơn?",
      benefit: "Premium listings get 4x more views & applications",
      vietnameseBenefit: "Tin đăng cao cấp nhận được nhiều lượt xem và đơn ứng tuyển gấp 4 lần",
      upgrade: "Upgrade to Premium 🌟",
      vietnameseUpgrade: "Nâng cấp lên Cao cấp 🌟"
    },
    {
      question: "Need to fill this position quickly?",
      vietnameseQuestion: "Cần tuyển người nhanh chóng?",
      benefit: "Featured listings are highlighted & shown first",
      vietnameseBenefit: "Tin đăng nổi bật được tô sáng và hiển thị đầu tiên",
      upgrade: "Make it Featured 🔝",
      vietnameseUpgrade: "Đăng tin nổi bật 🔝"
    },
    {
      question: "Want only the most qualified applicants?",
      vietnameseQuestion: "Chỉ muốn những ứng viên có trình độ cao nhất?",
      benefit: "Diamond listings reach top-tier professionals",
      vietnameseBenefit: "Tin đăng kim cương tiếp cận các chuyên gia hàng đầu",
      upgrade: "Go Diamond ✨",
      vietnameseUpgrade: "Chọn Kim cương ✨"
    }
  ];

  const handleYes = () => {
    setAnimation('exit');
    setTimeout(() => {
      if (currentStep < yesLadderItems.length - 1) {
        setCurrentStep(currentStep + 1);
      }
      setAnimation('enter');
    }, 300);
  };

  const handleUpgrade = () => {
    switch (currentStep) {
      case 0:
        onSelectPremium();
        break;
      case 1:
        onSelectFeature();
        break;
      case 2:
        onSelectDiamond();
        break;
      default:
        break;
    }
  };

  const handleNo = () => {
    // Skip to the next step
    setAnimation('exit');
    setTimeout(() => {
      if (currentStep < yesLadderItems.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // If it's the last step, reset to the beginning
        setCurrentStep(0);
      }
      setAnimation('enter');
    }, 300);
  };

  // Reset animation after component mounts
  useEffect(() => {
    setAnimation('enter');
  }, []);

  const item = yesLadderItems[currentStep];

  return (
    <div className={`my-6 w-full ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: animation === 'enter' ? 0 : 1, y: animation === 'enter' ? 20 : 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-indigo-100 shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-3 text-purple-900">
            {isVietnamese ? item.vietnameseQuestion : item.question}
          </h3>
          
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="text-emerald-500 h-5 w-5" />
            <p className="text-gray-700">
              {isVietnamese ? item.vietnameseBenefit : item.benefit}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button 
              onClick={handleUpgrade}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white flex-1 py-6"
            >
              <span className="mr-2">{isVietnamese ? item.vietnameseUpgrade : item.upgrade}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleYes}
              className="border-gray-300 text-gray-700 flex-1"
            >
              {isVietnamese ? "Tôi muốn tìm hiểu thêm" : "Tell me more"}
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={handleNo}
              className="text-gray-500 flex-1"
            >
              {isVietnamese ? "Bỏ qua" : "Skip"}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default YesLadder;
