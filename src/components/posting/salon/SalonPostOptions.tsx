
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import { useNavigate } from 'react-router-dom';
import { PricingOptions, UserPostingStats } from '@/utils/posting/types';
import { generatePromotionalText, getFirstPostPromotionalText } from '@/utils/posting/promotionalText';

interface SalonPostOptionsProps {
  pricingOptions: PricingOptions;
  setPricingOptions: (options: PricingOptions) => void;
}

const SalonPostOptions: React.FC<SalonPostOptionsProps> = ({ pricingOptions, setPricingOptions }) => {
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
    setTotalJobPosts(2);
    setTotalSalonPosts(0);
    setTotalBoothPosts(1);
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
        <h3 className="text-lg font-medium">Salon Post Options</h3>
        
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
            Reach customers across the country (recommended for mobile salons).
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="showAtTop">Featured Positioning</Label>
            <Checkbox
              id="showAtTop"
              checked={pricingOptions.showAtTop || false}
              onCheckedChange={() => handleCheckboxChange('showAtTop')}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Show your salon at the top of search results.
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
            Boost visibility with our premium promotion package.
          </p>
        </div>
        
        {postStats.jobPostCount === 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="bundleWithJobPost">Bundle with Job Post</Label>
              <Checkbox
                id="bundleWithJobPost"
                checked={pricingOptions.bundleWithJobPost || false}
                onCheckedChange={() => handleCheckboxChange('bundleWithJobPost')}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Create a job post to find new talent while promoting your salon (20% off).
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalonPostOptions;
