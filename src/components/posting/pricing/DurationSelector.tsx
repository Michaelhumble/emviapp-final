
import React from 'react';
import { cn } from "@/lib/utils";
import { DurationOption } from '@/types/pricing';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from '@/hooks/useTranslation';

interface DurationSelectorProps {
  durationMonths: number;
  onDurationChange: (months: number) => void;
  selectedPricingTier?: string;
  isDiamondPlan?: boolean;
}

export function DurationSelector({ 
  durationMonths, 
  onDurationChange, 
  selectedPricingTier,
  isDiamondPlan = false
}: DurationSelectorProps) {
  const { t } = useTranslation();
  
  // Duration options with discounts
  const durations: DurationOption[] = [
    { months: 1, label: '1 Month', vietnameseLabel: '1 tháng', discount: 0 },
    { months: 3, label: '3 Months', vietnameseLabel: '3 tháng', discount: 10 },
    { months: 6, label: '6 Months', vietnameseLabel: '6 tháng', discount: 20 },
    { months: 12, label: '12 Months', vietnameseLabel: '1 năm', discount: 35 },
  ];

  // For Diamond plan, only show annual option
  const displayedDurations = isDiamondPlan 
    ? durations.filter(d => d.months === 12)
    : durations;

  // Helper function to determine badge content based on duration
  const getBadgeContent = (months: number) => {
    if (months === 6) return t({english: "Most Popular", vietnamese: "Phổ biến nhất"});
    if (months === 12) return t({english: "Best Value!", vietnamese: "Giá trị nhất!"});
    return null;
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">{t({english: "Post Duration", vietnamese: "Thời hạn đăng tin"})}</h3>
      <p className="text-sm text-gray-500">{t({english: "Choose how long your job post will be active", vietnamese: "Chọn thời gian bài đăng của bạn sẽ hoạt động"})}</p>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {displayedDurations.map((duration) => {
          const badgeContent = getBadgeContent(duration.months);
          
          return (
            <TooltipProvider key={duration.months}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => onDurationChange(duration.months)}
                    disabled={isDiamondPlan && duration.months !== 12}
                    className={cn(
                      "px-4 py-2 rounded-full border transition-all relative",
                      "text-sm font-medium flex flex-col items-center gap-1",
                      durationMonths === duration.months
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white border-gray-200 hover:bg-gray-50",
                      isDiamondPlan && duration.months !== 12 && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <span>{duration.label}</span>
                    {duration.discount > 0 && (
                      <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                        {t({english: `Save ${duration.discount}%`, vietnamese: `Tiết kiệm ${duration.discount}%`})}
                      </span>
                    )}
                    {badgeContent && (
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "absolute -top-2 -right-2 text-[10px]",
                          duration.months === 12 ? "bg-amber-100 border-amber-300 text-amber-800" : "bg-purple-100 border-purple-300 text-purple-800"
                        )}
                      >
                        {badgeContent}
                      </Badge>
                    )}
                  </button>
                </TooltipTrigger>
                {isDiamondPlan && duration.months !== 12 && (
                  <TooltipContent side="top">
                    <p>{t({english: "Diamond plan is only available as annual subscription", vietnamese: "Gói Diamond chỉ khả dụng với đăng ký hàng năm"})}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
      
      {durationMonths >= 6 && (
        <p className="text-xs text-green-600 font-medium mt-2">
          {durationMonths === 12 
            ? t({english: "🔒 Lock in this special pricing for a full year!", vietnamese: "🔒 Khóa mức giá đặc biệt này trong cả năm!"})
            : t({english: "Great choice! Extended visibility at a discount.", vietnamese: "Lựa chọn tuyệt vời! Hiển thị kéo dài với giá giảm."})}
        </p>
      )}
    </div>
  );
}
