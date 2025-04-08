
import { Award, Briefcase, Users, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";

interface NextStepItem {
  id: string;
  title: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  icon: React.ElementType;
  actionUrl: string;
  actionText: {
    en: string;
    vi: string;
  };
  color: string;
}

const NextStepsSmart = () => {
  const { t } = useTranslation();
  const { userProfile } = useAuth();
  const preferredLanguage = userProfile?.preferred_language || 'English';
  const isVietnamese = preferredLanguage === 'Vietnamese';
  
  const nextSteps: NextStepItem[] = [
    {
      id: "post-job",
      title: {
        en: "Post a Job",
        vi: "Đăng Tuyển Dụng",
      },
      description: {
        en: "Find skilled nail techs for your salon",
        vi: "Tìm thợ nail cho tiệm của bạn",
      },
      icon: Briefcase,
      actionUrl: "/post/job",
      actionText: {
        en: "Create Job Post",
        vi: "Đăng Việc",
      },
      color: "text-blue-500 bg-blue-50",
    },
    {
      id: "boost-salon",
      title: {
        en: "Boost Your Salon",
        vi: "Tăng Độ Phổ Biến",
      },
      description: {
        en: "Get more visibility and reach more artists",
        vi: "Tăng khả năng hiển thị và tiếp cận nhiều thợ hơn",
      },
      icon: Star,
      actionUrl: "/boost",
      actionText: {
        en: "Get Boosted",
        vi: "Tăng Độ Phổ Biến",
      },
      color: "text-amber-500 bg-amber-50",
    },
    {
      id: "refer-salons",
      title: {
        en: "Refer Other Salons",
        vi: "Giới Thiệu Tiệm Khác",
      },
      description: {
        en: "Earn credits for each referral",
        vi: "Kiếm điểm thưởng cho mỗi lần giới thiệu",
      },
      icon: Users,
      actionUrl: "/referral",
      actionText: {
        en: "Refer Now",
        vi: "Giới Thiệu Ngay",
      },
      color: "text-green-500 bg-green-50",
    },
    {
      id: "upgrade-pro",
      title: {
        en: "Upgrade to Emvi Pro",
        vi: "Nâng Cấp Lên Emvi Pro",
      },
      description: {
        en: "Unlock premium features for your business",
        vi: "Mở khóa tính năng cao cấp cho doanh nghiệp",
      },
      icon: Award,
      actionUrl: "/pro",
      actionText: {
        en: "Upgrade Now",
        vi: "Nâng Cấp Ngay",
      },
      color: "text-purple-500 bg-purple-50",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
        <CardTitle className="text-lg font-medium text-gray-800">
          {isVietnamese ? "Phát Triển Tiệm — Bước Tiếp Theo" : "Grow Your Salon — What's Next?"}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-5">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {nextSteps.map((step) => (
            <motion.div key={step.id} variants={item}>
              <div className="flex flex-col space-y-3 p-4 border border-gray-100 rounded-lg hover:border-blue-100 hover:shadow-sm transition-all">
                <div className="flex items-start">
                  <div className={`p-2 rounded-md mr-3 ${step.color}`}>
                    <step.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {isVietnamese ? step.title.vi : step.title.en}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {isVietnamese ? step.description.vi : step.description.en}
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto"
                  asChild
                >
                  <Link to={step.actionUrl} className="flex items-center text-sm">
                    {isVietnamese ? step.actionText.vi : step.actionText.en}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default NextStepsSmart;
