
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, CheckCircle2, Star, Award, Diamond } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const PostJobPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleStartPosting = () => {
    navigate('/post-job/form');
  };
  
  return (
    <Layout>
      <div className="container py-12 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">{t("Post a Job", "Đăng tin tuyển dụng")}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t(
              "Get your job listing in front of thousands of qualified nail technicians and salon professionals.",
              "Đăng tin tuyển dụng của bạn trước hàng nghìn thợ nail và chuyên gia salon có trình độ."
            )}
          </p>
        </div>

        <div className="mb-10">
          <Card className="border-green-100 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="bg-white p-3 rounded-full">
                  <Briefcase className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    {t("How Job Posting Works", "Cách đăng tin tuyển dụng")}
                  </h3>
                  <ol className="space-y-3 list-none pl-0">
                    <li className="flex items-start gap-2">
                      <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                      <span>{t("Create your job listing with all details", "Tạo tin tuyển dụng của bạn với đầy đủ thông tin")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                      <span>{t("Choose your listing plan (Free listings available)", "Chọn gói đăng tin (Có sẵn tin đăng miễn phí)")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                      <span>{t("Get applications from qualified candidates", "Nhận hồ sơ từ các ứng viên đủ điều kiện")}</span>
                    </li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
              <CardTitle className="text-lg">{t("Free", "Miễn phí")}</CardTitle>
              <CardDescription>{t("14-day basic listing", "Tin cơ bản 14 ngày")}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-3xl font-bold mb-2">$0</div>
              <ul className="text-sm space-y-2 mb-4">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> {t("Standard visibility", "Hiển thị tiêu chuẩn")}</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> {t("14 days duration", "Thời hạn 14 ngày")}</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> {t("Basic analytics", "Phân tích cơ bản")}</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" onClick={handleStartPosting}>
                {t("Start Posting", "Bắt đầu đăng tin")}
              </Button>  
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-all border-blue-200">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-amber-600" />
              </div>
              <CardTitle className="text-lg">{t("Featured", "Nổi bật")}</CardTitle>
              <CardDescription>{t("30-day highlighted listing", "Tin nổi bật 30 ngày")}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-3xl font-bold mb-2">$19.99<span className="text-sm font-normal text-gray-500">/mo</span></div>
              <ul className="text-sm space-y-2 mb-4">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> {t("Highlighted in search", "Nổi bật trong tìm kiếm")}</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> {t("30 days duration", "Thời hạn 30 ngày")}</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> {t("Detailed analytics", "Phân tích chi tiết")}</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleStartPosting}>
                {t("Start Posting", "Bắt đầu đăng tin")}
              </Button>  
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-all border-purple-200 relative">
            <div className="absolute -top-2 right-4 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
              {t("Best Value", "Giá trị nhất")}
            </div>
            <CardHeader className="pb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <CardTitle className="text-lg">{t("Premium", "Cao cấp")}</CardTitle>
              <CardDescription>{t("90-day premium visibility", "Hiển thị cao cấp 90 ngày")}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-3xl font-bold mb-2">$49.99<span className="text-sm font-normal text-gray-500">/3mo</span></div>
              <ul className="text-sm space-y-2 mb-4">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> {t("Priority placement", "Vị trí ưu tiên")}</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> {t("90 days duration", "Thời hạn 90 ngày")}</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> {t("Featured in newsletters", "Xuất hiện trong bản tin")}</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> {t("Applicant management", "Quản lý ứng viên")}</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleStartPosting}>
                {t("Start Posting", "Bắt đầu đăng tin")}
              </Button>  
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-all border-amber-200 bg-gradient-to-br from-amber-50 to-white">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                <Diamond className="w-5 h-5 text-amber-600" />
              </div>
              <CardTitle className="text-lg">{t("Diamond Featured", "Kim cương")}</CardTitle>
              <CardDescription>{t("Premium annual package", "Gói cao cấp hàng năm")}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-3xl font-bold mb-2">$999.99<span className="text-sm font-normal text-gray-500">/yr</span></div>
              <ul className="text-sm space-y-2 mb-4">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> {t("Top placement guarantee", "Đảm bảo vị trí hàng đầu")}</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> {t("365 days duration", "Thời hạn 365 ngày")}</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> {t("VIP support", "Hỗ trợ VIP")}</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> {t("Multiple job postings", "Đăng nhiều tin tuyển dụng")}</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> {t("Featured salon profile", "Hồ sơ salon nổi bật")}</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleStartPosting}>
                {t("Start Posting", "Bắt đầu đăng tin")}
              </Button>  
            </CardFooter>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            {t("All plans include customer support and help with your listing", "Tất cả các gói bao gồm hỗ trợ khách hàng và trợ giúp với tin đăng của bạn")}
          </p>
          <Button size="lg" onClick={handleStartPosting} className="px-8">
            {t("Start Creating Your Job Post", "Bắt đầu tạo tin tuyển dụng của bạn")}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PostJobPage;
