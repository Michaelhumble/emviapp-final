
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Copy, Gift, Share, Trophy, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ArtistReferrals = () => {
  const { userProfile } = useAuth();
  const [copied, setCopied] = useState(false);
  
  const referralCount = userProfile?.referral_count || 0;
  const referralCode = userProfile?.referral_code || "EMVI1000";
  const preferredLanguage = userProfile?.preferred_language || "English";
  const isVietnamese = preferredLanguage === 'vi' || preferredLanguage === 'Vietnamese';
  
  // Generate referral link
  const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;
  
  // Progress calculation (assuming target is 10 referrals)
  const targetReferrals = 10;
  const referralProgress = Math.min(referralCount / targetReferrals * 100, 100);
  
  // Amount earned
  const creditsPerReferral = 50;
  const earnedCredits = referralCount * creditsPerReferral;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      toast.success(
        isVietnamese ? 
          "Đã sao chép đường dẫn giới thiệu!" : 
          "Referral link copied to clipboard!"
      );
      
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Users className="mr-2 h-5 w-5 text-primary" />
          {isVietnamese ? "Giới thiệu & Thưởng" : "Referrals & Rewards"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Referral Link */}
          <div className="md:col-span-2">
            <h3 className="text-base font-medium mb-2">
              {isVietnamese ? "Chia sẻ liên kết giới thiệu của bạn" : "Share your referral link"}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {isVietnamese 
                ? "Mời bạn bè tham gia EmviApp và nhận được tín dụng cho mỗi người đăng ký." 
                : "Invite friends to join EmviApp and earn credits for each signup."}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="p-2 border border-gray-200 rounded-md w-full text-sm bg-gray-50"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopy}
                className={copied ? "bg-green-50 text-green-600 border-green-200" : ""}
              >
                <Copy className="h-4 w-4 mr-1" /> 
                {isVietnamese ? "Sao chép" : "Copy"}
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" className="gap-1">
                <Share className="h-4 w-4" />
                {isVietnamese ? "Chia sẻ" : "Share"}
              </Button>
            </div>
          </div>
          
          {/* Right: Stats */}
          <div className="border rounded-md p-4">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">
                    {isVietnamese ? "Số lượt giới thiệu" : "Your referrals"}
                  </span>
                  <span className="text-sm font-medium">
                    {referralCount}/{targetReferrals}
                  </span>
                </div>
                <Progress value={referralProgress} className="h-2" />
                
                <div className="flex justify-between items-center mt-3">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      {isVietnamese ? "Đã kiếm được" : "Earned"}
                    </p>
                    <p className="font-medium">
                      {earnedCredits} {isVietnamese ? "điểm" : "credits"}
                    </p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-sm text-gray-600">
                      {isVietnamese ? "Còn lại để đạt mốc tiếp theo" : "Next milestone"}
                    </p>
                    <p className="font-medium">
                      {targetReferrals - referralCount} {isVietnamese ? "lượt giới thiệu" : "referrals"}
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                {isVietnamese 
                  ? "Mỗi người được giới thiệu thành công sẽ mang đến cho bạn 50 điểm." 
                  : "Each successful referral brings you 50 Emvi credits."}
              </p>
            </div>
          </div>
        </div>
        
        {/* Rewards Section */}
        <div className="border-t pt-6">
          <h3 className="text-base font-medium mb-3">
            {isVietnamese ? "Phần thưởng" : "Rewards"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md p-4 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                <Gift className="h-6 w-6 text-blue-500" />
              </div>
              <h4 className="font-medium">{isVietnamese ? "3 Giới thiệu" : "3 Referrals"}</h4>
              <p className="text-gray-500 text-sm mb-2">
                {isVietnamese ? "Huy hiệu Người Xây Dựng Cộng Đồng" : "Community Builder Badge"}
              </p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                referralCount >= 3 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}>
                {referralCount >= 3 ? (
                  isVietnamese ? "Đã hoàn thành" : "Completed"
                ) : (
                  isVietnamese ? "Đang tiến hành" : "In progress"
                )}
              </span>
            </div>
            
            <div className="border rounded-md p-4 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center mb-2">
                <Trophy className="h-6 w-6 text-purple-500" />
              </div>
              <h4 className="font-medium">{isVietnamese ? "5 Giới thiệu" : "5 Referrals"}</h4>
              <p className="text-gray-500 text-sm mb-2">
                {isVietnamese ? "Huy hiệu Đại Sứ Emvi + 250 điểm" : "Emvi Ambassador Badge + 250 credits"}
              </p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                referralCount >= 5 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}>
                {referralCount >= 5 ? (
                  isVietnamese ? "Đã hoàn thành" : "Completed"
                ) : (
                  isVietnamese ? "Đang tiến hành" : "In progress"
                )}
              </span>
            </div>
            
            <div className="border rounded-md p-4 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center mb-2">
                <Trophy className="h-6 w-6 text-amber-500" />
              </div>
              <h4 className="font-medium">{isVietnamese ? "10 Giới thiệu" : "10 Referrals"}</h4>
              <p className="text-gray-500 text-sm mb-2">
                {isVietnamese ? "Tài khoản Pro miễn phí 1 tháng" : "Free 1-month Pro account"}
              </p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                referralCount >= 10 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}>
                {referralCount >= 10 ? (
                  isVietnamese ? "Đã hoàn thành" : "Completed"
                ) : (
                  isVietnamese ? "Đang tiến hành" : "In progress"
                )}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistReferrals;
