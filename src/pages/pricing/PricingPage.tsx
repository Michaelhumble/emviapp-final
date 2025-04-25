
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import FoundersEarlyAccess from "@/components/pricing/FoundersEarlyAccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Timer, Star, Sparkles, Gift, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const PricingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const { t, isVietnamese } = useTranslation();

  const handleSubscribe = (plan: string) => {
    if (user) {
      navigate(`/checkout?plan=${plan}&cycle=${billingCycle}`);
    } else {
      navigate(`/auth/signin?redirect=/pricing&plan=${plan}&cycle=${billingCycle}`);
    }
  };

  const soloFeatures = [
    {
      english: "Perfect for independent artists",
      vietnamese: "Hoàn hảo cho nghệ sĩ độc lập"
    },
    {
      english: "Full booking calendar", 
      vietnamese: "Lịch đặt chỗ đầy đủ"
    },
    {
      english: "Client management tools",
      vietnamese: "Công cụ quản lý khách hàng"
    },
    {
      english: "Portfolio showcase",
      vietnamese: "Trưng bày danh mục đầu tư"
    },
    {
      english: "Direct messaging",
      vietnamese: "Nhắn tin trực tiếp"
    },
    {
      english: "AI matching with clients",
      vietnamese: "AI kết nối với khách hàng"
    },
    {
      english: "Visibility in search results",
      vietnamese: "Hiển thị trong kết quả tìm kiếm"
    },
    {
      english: "Referral dashboard",
      vietnamese: "Bảng điều khiển giới thiệu"
    }
  ];

  const smallSalonFeatures = [
    {
      english: "Up to 5 artists",
      vietnamese: "Tối đa 5 nghệ sĩ"
    },
    {
      english: "Team management",
      vietnamese: "Quản lý nhóm"
    },
    {
      english: "Advanced analytics",
      vietnamese: "Phân tích nâng cao"
    },
    {
      english: "Priority support",
      vietnamese: "Hỗ trợ ưu tiên"
    },
    {
      english: "Custom branding",
      vietnamese: "Thương hiệu tùy chỉnh"
    },
    {
      english: "Advanced reports",
      vietnamese: "Báo cáo nâng cao"
    },
    {
      english: "AI matching with clients",
      vietnamese: "AI kết nối với khách hàng"
    },
    {
      english: "Visibility in search results",
      vietnamese: "Hiển thị trong kết quả tìm kiếm"
    },
    {
      english: "Referral dashboard",
      vietnamese: "Bảng điều khiển giới thiệu"
    }
  ];

  const mediumSalonFeatures = [
    {
      english: "Up to 10 artists", 
      vietnamese: "Tối đa 10 nghệ sĩ"
    },
    {
      english: "Advanced reports",
      vietnamese: "Báo cáo nâng cao"
    },
    {
      english: "Multi-location support",
      vietnamese: "Hỗ trợ nhiều địa điểm"
    },
    {
      english: "Training resources",
      vietnamese: "Tài nguyên đào tạo"
    },
    {
      english: "API access",
      vietnamese: "Truy cập API"
    },
    {
      english: "Premium search placement",
      vietnamese: "Vị trí tìm kiếm cao cấp"
    },
    {
      english: "AI matching with clients",
      vietnamese: "AI kết nối với khách hàng"
    },
    {
      english: "Visibility in search results",
      vietnamese: "Hiển thị trong kết quả tìm kiếm"
    },
    {
      english: "Referral dashboard",
      vietnamese: "Bảng điều khiển giới thiệu"
    }
  ];

  const unlimitedSalonFeatures = [
    {
      english: "Unlimited artists",
      vietnamese: "Không giới hạn nghệ sĩ"
    },
    {
      english: "Enterprise support",
      vietnamese: "Hỗ trợ doanh nghiệp"
    },
    {
      english: "Custom integrations",
      vietnamese: "Tích hợp tùy chỉnh"
    },
    {
      english: "White-label options",
      vietnamese: "Tùy chọn nhãn trắng"
    },
    {
      english: "Dedicated account manager",
      vietnamese: "Quản lý tài khoản chuyên dụng"
    },
    {
      english: "Premium search placement",
      vietnamese: "Vị trí tìm kiếm cao cấp"
    },
    {
      english: "AI matching with clients",
      vietnamese: "AI kết nối với khách hàng"
    },
    {
      english: "Visibility in search results",
      vietnamese: "Hiển thị trong kết quả tìm kiếm"
    },
    {
      english: "Referral dashboard",
      vietnamese: "Bảng điều khiển giới thiệu"
    }
  ];

  const getYearlyPrice = (monthlyPrice: number) => {
    const yearlyDiscount = 0.15;
    const yearlyPrice = monthlyPrice * 12 * (1 - yearlyDiscount);
    return yearlyPrice.toFixed(2);
  };

  const pricingPlans = [
    {
      name: {
        english: "Solo Artist",
        vietnamese: "Nghệ sĩ độc lập"
      },
      monthlyPrice: 49.95,
      features: soloFeatures,
      recommended: false,
      limit: {
        english: "1 artist",
        vietnamese: "1 nghệ sĩ"
      }
    },
    {
      name: {
        english: "Small Salon",
        vietnamese: "Salon nhỏ"
      },
      monthlyPrice: 99,
      features: smallSalonFeatures,
      recommended: true,
      limit: {
        english: "Up to 5 artists",
        vietnamese: "Tối đa 5 nghệ sĩ"
      }
    },
    {
      name: {
        english: "Medium Salon",
        vietnamese: "Salon vừa"
      },
      monthlyPrice: 175,
      features: mediumSalonFeatures,
      recommended: false,
      limit: {
        english: "Up to 10 artists",
        vietnamese: "Tối đa 10 nghệ sĩ"
      }
    },
    {
      name: {
        english: "Unlimited Salon",
        vietnamese: "Salon không giới hạn"
      },
      monthlyPrice: 199.95,
      features: unlimitedSalonFeatures,
      recommended: false,
      limit: {
        english: "Unlimited artists",
        vietnamese: "Không giới hạn nghệ sĩ"
      }
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <FoundersEarlyAccess />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {t({
              english: "Choose Your Perfect Plan",
              vietnamese: "Chọn Gói Hoàn Hảo Của Bạn"
            })}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {t({
              english: "Exclusive early access pricing — Join now and lock in these rates",
              vietnamese: "Giá đặc biệt cho người dùng sớm — Tham gia ngay để đảm bảo mức giá này"
            })}
          </p>
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
            <Timer className="h-5 w-5" />
            <span className="font-medium">
              {t({
                english: "Early-access pricing ends soon!",
                vietnamese: "Giá ưu đãi sớm sẽ kết thúc sớm!"
              })}
            </span>
          </div>
        </div>

        <div className="flex justify-center mb-10">
          <Tabs
            defaultValue="monthly"
            value={billingCycle}
            onValueChange={(value) => setBillingCycle(value as "monthly" | "yearly")}
            className="w-full max-w-md"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">
                {t({
                  english: "Monthly",
                  vietnamese: "Hàng tháng"
                })}
              </TabsTrigger>
              <TabsTrigger value="yearly">
                {t({
                  english: "Yearly",
                  vietnamese: "Hàng năm"
                })}
                <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">
                  {t({
                    english: "Save 15%",
                    vietnamese: "Tiết kiệm 15%"
                  })}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {pricingPlans.map((plan) => (
            <Card key={t(plan.name)} className={`relative flex flex-col ${
              plan.recommended ? 'border-primary shadow-lg' : ''
            }`}>
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="h-3 w-3 mr-1" fill="currentColor" />
                    {t({
                      english: "Most Popular",
                      vietnamese: "Phổ Biến Nhất"
                    })}
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="flex flex-col items-center">
                  <span className="text-xl mb-2">{t(plan.name)}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">
                      ${billingCycle === "monthly" ? plan.monthlyPrice : (parseFloat(getYearlyPrice(plan.monthlyPrice)) / 12).toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t({
                        english: "/mo",
                        vietnamese: "/tháng"
                      })}
                    </span>
                  </div>
                  {billingCycle === "yearly" && (
                    <span className="text-xs text-green-600 mt-1">
                      {t({
                        english: `Billed $${getYearlyPrice(plan.monthlyPrice)}/year`,
                        vietnamese: `Thanh toán $${getYearlyPrice(plan.monthlyPrice)}/năm`
                      })}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground mt-2">{t(plan.limit)}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm">{t(feature)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <Button 
                  className="w-full"
                  variant={plan.recommended ? "default" : "outline"}
                  onClick={() => handleSubscribe(t(plan.name))}
                >
                  {user ? 
                    t({
                      english: "Subscribe Now",
                      vietnamese: "Đăng Ký Ngay"
                    }) : 
                    t({
                      english: "Get Started",
                      vietnamese: "Bắt Đầu"
                    })
                  }
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  {t({
                    english: "Join now, cancel anytime",
                    vietnamese: "Tham gia ngay, hủy bất cứ lúc nào"
                  })}
                </p>
              </CardFooter>
            </Card>
          ))}
        </motion.div>

        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-12">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="mb-6 sm:mb-0 sm:mr-8">
              <Gift className="h-12 w-12 text-primary" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold mb-2">
                {t({
                  english: "Free Credits When You Refer Friends",
                  vietnamese: "Tín Dụng Miễn Phí Khi Bạn Giới Thiệu Bạn Bè"
                })}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t({
                  english: "Earn 100 credits for each friend who joins EmviApp. Credits can be used for premium features, profile boosts, and more!",
                  vietnamese: "Kiếm 100 tín dụng cho mỗi người bạn tham gia EmviApp. Tín dụng có thể được sử dụng cho các tính năng cao cấp, tăng cường hồ sơ và hơn thế nữa!"
                })}
              </p>
              <Button variant="outline" onClick={() => navigate("/referrals")}>
                {t({
                  english: "View Referral Program",
                  vietnamese: "Xem Chương Trình Giới Thiệu"
                })}
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-4">
            {t({
              english: "Join now. Once you're in, you'll never leave.",
              vietnamese: "Tham gia ngay. Khi bạn đã tham gia, bạn sẽ không bao giờ rời đi."
            })}
          </h2>
          <p className="text-muted-foreground">
            {t({
              english: "Join thousands of successful salons and artists who trust us with their business. Start your journey today with our special early-bird pricing.",
              vietnamese: "Tham gia cùng hàng nghìn salon và nghệ sĩ thành công đã tin tưởng chúng tôi với công việc kinh doanh của họ. Bắt đầu hành trình của bạn ngay hôm nay với mức giá đặc biệt dành cho người dùng sớm."
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              <span className="text-sm">
                {t({
                  english: "2,500+ happy customers",
                  vietnamese: "2,500+ khách hàng hài lòng"
                })}
              </span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
              <span className="text-sm">
                {t({
                  english: "30-day satisfaction guarantee",
                  vietnamese: "Đảm bảo hài lòng trong 30 ngày"
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
