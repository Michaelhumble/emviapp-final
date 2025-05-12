
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowRight, Lock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export type BoostOption = 'none' | 'homepage' | 'premium';

interface BoostOptionData {
  title: string;
  vietnameseTitle?: string;
  price: number;
  description: string;
  vietnameseDescription?: string;
  hoverClass: string;
}

export interface BoostListingModalProps {
  open: boolean;
  onClose: () => void;
  onOpenChange?: (open: boolean) => void;
  onConfirm: (boostOption: BoostOption) => void;
  baseAmount: number;
  basePlanName: string;
}

const BoostListingModal: React.FC<BoostListingModalProps> = ({
  open,
  onClose,
  onOpenChange,
  onConfirm,
  baseAmount,
  basePlanName
}) => {
  const { t } = useTranslation();
  const [selectedBoost, setSelectedBoost] = useState<BoostOption>('none');
  
  const boostOptions: Record<BoostOption, BoostOptionData> = {
    none: {
      title: 'No Boost',
      vietnameseTitle: 'Không tăng cường',
      price: 0,
      description: 'Regular 30-day post with standard visibility.',
      vietnameseDescription: 'Bài đăng 30 ngày thông thường với khả năng hiển thị tiêu chuẩn.',
      hoverClass: 'hover:bg-gray-50'
    },
    homepage: {
      title: 'Homepage Boost',
      vietnameseTitle: 'Tăng cường Trang chủ',
      price: 5,
      description: 'Get featured on the homepage for 7 days.',
      vietnameseDescription: 'Được hiển thị trên trang chủ trong 7 ngày.',
      hoverClass: 'hover:bg-yellow-50'
    },
    premium: {
      title: 'Premium Priority',
      vietnameseTitle: 'Ưu tiên Cao cấp',
      price: 10,
      description: 'Featured on homepage + top of your industry category with highlight styling.',
      vietnameseDescription: 'Hiển thị trên trang chủ + đầu danh mục ngành của bạn với kiểu dáng nổi bật.',
      hoverClass: 'hover:bg-purple-50'
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose();
    if (onOpenChange) onOpenChange(isOpen);
  };

  const handleConfirm = () => {
    onConfirm(selectedBoost);
  };
  
  // Calculate the total amount based on the base amount and the selected boost
  const getBoostAmount = () => boostOptions[selectedBoost].price;
  const getTotalAmount = () => baseAmount + getBoostAmount();

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            🎯 {t('Boost Your Job Listing', 'Tăng cường tin tuyển dụng của bạn')}
          </DialogTitle>
          <DialogDescription>
            {t(
              'Choose how visible you want your post to be. You\'ll never be charged without knowing exactly what you selected.',
              'Chọn mức độ hiển thị bạn muốn cho bài đăng. Bạn sẽ không bao giờ bị tính phí mà không biết chính xác những gì bạn đã chọn.'
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Boost options */}
          {(Object.keys(boostOptions) as BoostOption[]).map((option) => {
            const boostData = boostOptions[option];
            return (
              <label 
                key={option} 
                className={`block p-4 border rounded-md cursor-pointer transition ${
                  selectedBoost === option 
                    ? option === 'none' 
                      ? 'ring-1 ring-gray-300 bg-gray-50' 
                      : option === 'homepage' 
                        ? 'ring-1 ring-yellow-300 bg-yellow-50' 
                        : 'ring-1 ring-purple-300 bg-purple-50'
                    : boostData.hoverClass
                }`}
              >
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    name="boostOption" 
                    value={option} 
                    className="mr-2" 
                    checked={selectedBoost === option}
                    onChange={() => setSelectedBoost(option)}
                  />
                  <span className="font-semibold">
                    {t(boostData.title, boostData.vietnameseTitle || boostData.title)}
                  </span>
                  <span className="ml-2">
                    {option === 'none' 
                      ? ` — ${t('Free', 'Miễn phí')}` 
                      : ` — +${formatCurrency(boostData.price)}`
                    }
                  </span>
                </div>
                <p className={`text-xs ${
                  option === 'none' 
                    ? 'text-gray-500' 
                    : option === 'homepage' 
                      ? 'text-yellow-700' 
                      : 'text-purple-700'
                } ml-6 mt-1`}>
                  {t(boostData.description, boostData.vietnameseDescription || boostData.description)}
                </p>
              </label>
            );
          })}

          {/* Payment summary */}
          <div className="mt-6 p-3 bg-gray-50 rounded-md border">
            <h4 className="font-medium text-sm text-gray-800 mb-2">
              {t('Payment Summary', 'Tóm tắt thanh toán')}
            </h4>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>{t('Base plan', 'Gói cơ bản')} ({basePlanName}):</span>
                <span>{formatCurrency(baseAmount)}</span>
              </div>
              
              {getBoostAmount() > 0 && (
                <div className="flex justify-between text-purple-700">
                  <span>{t('Visibility boost', 'Tăng cường hiển thị')}:</span>
                  <span>+{formatCurrency(getBoostAmount())}</span>
                </div>
              )}
              
              <div className="flex justify-between font-bold border-t border-gray-200 pt-1 mt-2">
                <span>{t('Total', 'Tổng cộng')}:</span>
                <span>{formatCurrency(getTotalAmount())}</span>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <p className="text-xs text-gray-400 text-center italic">
            💛 {t(
              'We believe in full transparency. You\'ll never be charged unless you pick an option. Your final cost will be shown before payment.',
              'Chúng tôi tin vào sự minh bạch hoàn toàn. Bạn sẽ không bao giờ bị tính phí trừ khi bạn chọn một tùy chọn. Chi phí cuối cùng của bạn sẽ được hiển thị trước khi thanh toán.'
            )}
          </p>

          <div className="flex justify-end space-x-3 mt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="px-4"
            >
              {t('Cancel', 'Hủy')}
            </Button>
            
            <Button 
              onClick={handleConfirm}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4"
            >
              <div className="flex items-center gap-1">
                {t('Confirm & Continue to Payment', 'Xác nhận & Tiếp tục thanh toán')}
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-center text-xs text-neutral-400 mt-4 flex items-center justify-center gap-1">
              <Lock className="h-3 w-3" />
              {t(
                'All payments processed securely by Stripe. We never store your card info.',
                'Tất cả các khoản thanh toán được xử lý an toàn bởi Stripe. Chúng tôi không bao giờ lưu trữ thông tin thẻ của bạn.'
              )}
            </p>
            <p className="text-center text-xs text-neutral-400 mt-2">
              ☀️ {t('Inspired by Sunshine', 'Lấy cảm hứng từ Sunshine')} ☀️
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BoostListingModal;
