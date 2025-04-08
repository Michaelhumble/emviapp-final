
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/hooks/useTranslation";
import { Coins } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface CreditStatusCardProps {
  credits: number;
  loading: boolean;
}

const CreditStatusCard = ({ credits, loading }: CreditStatusCardProps) => {
  const { t } = useTranslation();
  
  // Calculate progress to next milestone (every 100 credits)
  const nextMilestone = Math.ceil(credits / 100) * 100;
  const currentProgress = credits % 100;
  const progressPercentage = (currentProgress / 100) * 100;
  
  return (
    <Card className="h-full overflow-hidden border-amber-100 shadow-sm">
      <CardHeader className="pb-2 bg-gradient-to-r from-amber-50 to-yellow-50">
        <CardTitle className="flex items-center text-lg font-medium">
          <Coins className="h-5 w-5 mr-2 text-amber-500" />
          {t({ 
            english: 'Credit Status', 
            vietnamese: 'Điểm Emvi' 
          })}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold mb-2 flex items-baseline">
              {credits}
              <span className="text-sm ml-1 font-normal text-gray-500">
                {t({ 
                  english: 'Emvi Credits', 
                  vietnamese: 'Điểm Emvi' 
                })}
              </span>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{currentProgress}</span>
                <span className="text-gray-600">{nextMilestone}</span>
              </div>
              <Progress 
                value={progressPercentage} 
                className="h-2" 
                indicatorClassName="bg-gradient-to-r from-amber-300 to-yellow-400" 
              />
            </div>
            
            <div className="text-sm text-gray-500 mt-3">
              <p>
                {t({ 
                  english: `${nextMilestone - credits} more to unlock a profile boost!`, 
                  vietnamese: `Còn ${nextMilestone - credits} điểm để mở khóa tính năng tăng tốc!` 
                })}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                100 {t({ english: 'credits', vietnamese: 'điểm' })} = $10 {t({ english: 'in Emvi power', vietnamese: 'sức mạnh Emvi' })}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CreditStatusCard;
