
import { useTranslation } from '@/hooks/useTranslation';
import { Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface SalonWelcomeBannerProps {
  salonName: string;
}

const SalonWelcomeBanner = ({ salonName }: SalonWelcomeBannerProps) => {
  const { t } = useTranslation();
  
  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative overflow-hidden">
          {/* Decorative glass elements */}
          <div className="absolute top-[-30%] right-[-10%] w-[40%] h-[300px] bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-[-20%] left-[-5%] w-[30%] h-[200px] bg-white/10 rounded-full blur-lg"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl font-bold">
              {t("Welcome back, ")} <span className="font-serif italic">{salonName}</span>
            </h1>
            <p className="text-xl mt-2 font-light max-w-lg">
              {t("Let's grow your business today.")}
            </p>
            
            <div className="mt-5 flex flex-wrap gap-3">
              <Button 
                className="bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-sm"
                size="lg"
              >
                {t("Post New Job")}
              </Button>
              <Button 
                variant="outline" 
                className="bg-transparent border-white/50 text-white hover:bg-white/10"
                size="lg"
              >
                {t("Boost Visibility")}
              </Button>
            </div>
            
            <div className="mt-5 flex items-center gap-2 text-sm text-blue-100 bg-blue-900/30 p-3 rounded-lg max-w-lg backdrop-blur-sm">
              <Info className="h-5 w-5 flex-shrink-0" />
              <p>{t("Salon owners who post jobs weekly get 3x more qualified applicants. Start today!")}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonWelcomeBanner;
