
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { JobPricingTier } from '@/utils/posting/types';

export interface PricingMicroCopyProps {
  tier?: JobPricingTier;
  selectedPlan?: string; // Added to support this prop
}

const PricingMicroCopy = ({ tier, selectedPlan }: PricingMicroCopyProps) => {
  const { t } = useTranslation();
  const pricingTier = tier || selectedPlan as JobPricingTier;

  // Convert the text based on tier
  const text = {
    free: {
      english: "Free listings appear at the bottom of results with basic formatting.",
      vietnamese: "Tin đăng miễn phí xuất hiện ở cuối kết quả với định dạng cơ bản."
    },
    standard: {
      english: "Standard listings include highlighted formatting and moderate visibility.",
      vietnamese: "Tin đăng tiêu chuẩn bao gồm định dạng nổi bật và khả năng hiển thị vừa phải."
    },
    premium: {
      english: "Premium listings get priority placement, boosted visibility, and increased exposure.",
      vietnamese: "Tin đăng cao cấp được ưu tiên vị trí, tăng khả năng hiển thị và tiếp cận nhiều hơn."
    },
    gold: {
      english: "Gold listings are showcased at the top with maximum visibility and featured badge.",
      vietnamese: "Tin đăng Vàng được trình bày ở đầu với khả năng hiển thị tối đa và huy hiệu nổi bật."
    },
    diamond: {
      english: "Diamond listings get exclusive top placement, maximum exposure, and special formatting.",
      vietnamese: "Tin đăng Kim cương nhận vị trí hàng đầu độc quyền, phạm vi tiếp cận tối đa và định dạng đặc biệt."
    }
  };

  const tierText = pricingTier && pricingTier in text ? text[pricingTier] : text.standard;

  return (
    <p className="text-sm text-gray-600 italic mt-1">
      {t(tierText)}
    </p>
  );
};

export default PricingMicroCopy;
