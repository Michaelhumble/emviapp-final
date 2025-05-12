
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface WeeklyPaySuggestionProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const WeeklyPaySuggestion: React.FC<WeeklyPaySuggestionProps> = ({ checked, onChange }) => {
  const { t, isVietnamese } = useTranslation();
  
  return (
    <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="font-medium text-purple-900">
              {t("Weekly Pay Brings the Best Talent", "Trả lương hàng tuần thu hút nhân tài tốt nhất")}
            </h3>
          </div>
          <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
            {t("Free Tip", "Mẹo miễn phí")}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-700 mb-4">
          {t(
            "💡 Almost 99% of elite technicians prefer weekly pay. Offering weekly pay helps you attract better, faster, and more loyal artists — with less ghosting. You're in control. Try it and see the difference.",
            "💡 Gần 99% thợ nail giỏi thích được trả lương hàng tuần. Việc trả lương hàng tuần giúp bạn thu hút được những người thợ tốt hơn, nhanh hơn và trung thành hơn - với ít tình trạng không đến làm việc. Bạn kiểm soát được. Hãy thử và xem sự khác biệt."
          )}
        </p>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="weekly-pay-option"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="rounded border-purple-300 text-purple-600 focus:ring-purple-500 h-5 w-5 mr-2"
          />
          <label htmlFor="weekly-pay-option" className="text-sm font-medium text-purple-900 cursor-pointer">
            {t("I offer weekly pay (optional)", "Tôi trả lương hàng tuần (tùy chọn)")}
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyPaySuggestion;
