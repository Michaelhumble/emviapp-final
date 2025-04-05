
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import { useNavigate } from 'react-router-dom';
import { PricingOptions, UserPostingStats } from '@/utils/posting/types';
import { generatePromotionalText, getFirstPostPromotionalText } from '@/utils/posting/promotionalText';

interface JobPostOptionsProps {
  pricingOptions: PricingOptions;
  setPricingOptions: (options: PricingOptions) => void;
}

const JobPostOptions: React.FC<JobPostOptionsProps> = ({ pricingOptions, setPricingOptions }) => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  
  const [totalJobPosts, setTotalJobPosts] = useState(0);
  const [totalSalonPosts, setTotalSalonPosts] = useState(0);
  const [totalBoothPosts, setTotalBoothPosts] = useState(0);
  const [totalSupplyPosts, setTotalSupplyPosts] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [isFirstPost, setIsFirstPost] = useState(true);
  
  useEffect(() => {
    if (!user) return;
    
    // Mock data - replace with actual data fetching from backend
    setTotalJobPosts(3);
    setTotalSalonPosts(1);
    setTotalBoothPosts(2);
    setTotalSupplyPosts(0);
    
    // Safely get referral count from user profile
    const userReferralCount = userProfile?.referral_count || 0;
    setReferralCount(userReferralCount);
    
    // Determine if it's the user's first post
    setIsFirstPost(totalJobPosts + totalSalonPosts + totalBoothPosts + totalSupplyPosts === 0);
  }, [user, userProfile, totalJobPosts, totalSalonPosts, totalBoothPosts, totalSupplyPosts]);
  
  const handleCheckboxChange = (option: keyof PricingOptions) => {
    setPricingOptions({
      ...pricingOptions,
      [option]: !pricingOptions[option]
    });
  };
  
  const getPostStats = (): UserPostingStats => {
    // Create an object that matches the UserPostingStats interface
    return {
      jobPostCount: totalJobPosts,
      salonPostCount: totalSalonPosts,
      boothPostCount: totalBoothPosts,
      supplyPostCount: totalSupplyPosts,
      totalPostCount: totalJobPosts + totalSalonPosts + totalBoothPosts + totalSupplyPosts,
      hasReferrals: referralCount > 0
    };
  };
  
  const postStats = getPostStats();
  
  return (
    <Card className="border-2">
      <CardContent className="space-y-4 pt-6">
        <h3 className="text-lg font-medium">Job Post Options</h3>
        
        {isFirstPost && (
          <div className="bg-green-50 border border-green-200 p-3 rounded-md">
            <p className="text-sm text-green-700 font-medium">
              {getFirstPostPromotionalText()}
            </p>
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="isNationwide">Nationwide Reach</Label>
            <Checkbox
              id="isNationwide"
              checked={pricingOptions.isNationwide || false}
              onCheckedChange={() => handleCheckboxChange('isNationwide')}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Reach candidates across the country.
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="fastSalePackage">Fast Sale Package</Label>
            <Checkbox
              id="fastSalePackage"
              checked={pricingOptions.fastSalePackage || false}
              onCheckedChange={() => handleCheckboxChange('fastSalePackage')}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Get your job post seen by more candidates faster.
          </p>
        </div>
        
        {postStats.salonPostCount === 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="bundleWithSalonPost">Bundle with Salon Post</Label>
              <Checkbox
                id="bundleWithSalonPost"
                checked={pricingOptions.bundleWithSalonPost || false}
                onCheckedChange={() => handleCheckboxChange('bundleWithSalonPost')}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Create a salon post to promote your salon and attract more candidates.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobPostOptions;
