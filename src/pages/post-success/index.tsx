
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const PostSuccessPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Check URL params to see if this is a free listing
  const isFree = new URLSearchParams(window.location.search).get('free') === 'true';
  const postId = new URLSearchParams(window.location.search).get('post_id');
  
  return (
    <Layout>
      <div className="container max-w-lg py-12">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">
              {t("Listing Created Successfully!", "Tạo tin đăng thành công!")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle size={50} className="text-green-500" />
              <div>
                <p className="mb-2 text-lg font-medium">
                  {t("Your job post is now live!", "Tin tuyển dụng của bạn đã được đăng!")}
                </p>
                <p className="text-muted-foreground">
                  {isFree 
                    ? t(
                        "Your free job listing has been published and is now visible to potential candidates.",
                        "Tin tuyển dụng miễn phí của bạn đã được đăng và hiện có thể nhìn thấy bởi các ứng viên tiềm năng."
                      )
                    : t(
                        "Your job listing has been published and is now visible to potential candidates.",
                        "Tin tuyển dụng của bạn đã được đăng và hiện có thể nhìn thấy bởi các ứng viên tiềm năng."
                      )
                  }
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="flex flex-col sm:flex-row gap-4">
              {postId && (
                <Button onClick={() => navigate(`/jobs/${postId}`)}>
                  {t("View My Job Post", "Xem tin tuyển dụng")}
                </Button>
              )}
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                {t("Go to Dashboard", "Đi đến Trang chủ")}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default PostSuccessPage;
