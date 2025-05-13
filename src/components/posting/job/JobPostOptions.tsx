
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "../SectionHeader";
import { useAuth } from "@/context/auth";
import { useNavigate } from 'react-router-dom';
import { PricingOptions, UserPostingStats } from '@/utils/posting/types';
import { generatePromotionalText, getFirstPostPromotionalText } from '@/utils/posting/promotionalText';
import { CheckCircle, Globe, Zap } from 'lucide-react';

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
    <Card className="border-2 shadow-sm">
      <CardContent className="space-y-4 pt-6">
        <SectionHeader 
          title="Job Post Options" 
          emoji="📦"
          description="Boost your visibility to find artists faster"
        />
        
        {isFirstPost && (
          <div className="bg-green-50 border border-green-200 p-3 rounded-md">
            <p className="text-sm text-green-700 font-medium">
              {getFirstPostPromotionalText('job')}
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-white border rounded-lg hover:bg-purple-50 transition-colors">
            <div className="flex-1 flex items-start gap-3">
              <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <Label htmlFor="isNationwide" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Nationwide Reach
                </Label>
                <p className="text-sm text-muted-foreground">
                  📍 Show up in every artist's radar — from Houston to San Jose.
                </p>
              </div>
            </div>
            <Checkbox
              id="isNationwide"
              checked={pricingOptions.isNationwide || false}
              onCheckedChange={() => handleCheckboxChange('isNationwide')}
              className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 h-5 w-5"
            />
            {pricingOptions.isNationwide && (
              <CheckCircle className="ml-1 h-4 w-4 text-purple-500 animate-in fade-in-50 duration-300" />
            )}
          </div>
          
          <div className="flex items-center p-3 bg-white border rounded-lg hover:bg-purple-50 transition-colors">
            <div className="flex-1 flex items-start gap-3">
              <div className="p-2 rounded-full bg-amber-100 text-amber-600">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <Label htmlFor="fastSalePackage" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Fast Sale Package
                </Label>
                <p className="text-sm text-muted-foreground">
                  ⚡ Get seen first. More artists apply faster.
                </p>
              </div>
            </div>
            <Checkbox
              id="fastSalePackage"
              checked={pricingOptions.fastSalePackage || false}
              onCheckedChange={() => handleCheckboxChange('fastSalePackage')}
              className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 h-5 w-5"
            />
            {pricingOptions.fastSalePackage && (
              <CheckCircle className="ml-1 h-4 w-4 text-purple-500 animate-in fade-in-50 duration-300" />
            )}
          </div>
          
          {postStats.salonPostCount === 0 && (
            <div className="flex items-center p-3 bg-white border rounded-lg hover:bg-purple-50 transition-colors">
              <div className="flex-1 flex items-start gap-3">
                <div className="p-2 rounded-full bg-green-100 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <Label htmlFor="bundleWithJobPost" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Bundle with Salon Post
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    🏪 Get a salon profile that artists can browse and contact you directly.
                  </p>
                </div>
              </div>
              <Checkbox
                id="bundleWithJobPost"
                checked={pricingOptions.bundleWithJobPost || false}
                onCheckedChange={() => handleCheckboxChange('bundleWithJobPost')}
                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 h-5 w-5"
              />
              {pricingOptions.bundleWithJobPost && (
                <CheckCircle className="ml-1 h-4 w-4 text-purple-500 animate-in fade-in-50 duration-300" />
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPostOptions;
