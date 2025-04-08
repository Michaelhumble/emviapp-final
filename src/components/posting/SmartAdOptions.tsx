
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import NationwideOption from "./smart-ad-options/NationwideOption";
import FastSalePackage from "./smart-ad-options/FastSalePackage";
import ShowAtTopOption from "./smart-ad-options/ShowAtTopOption";
import BundleWithJobOption from "./smart-ad-options/BundleWithJobOption";
import { InfoIcon } from "lucide-react";
import { PostType } from "@/utils/posting/types";

interface SmartAdOptionsProps {
  postType: PostType;
  isFirstPost?: boolean;
  hasReferrals?: boolean;
  onNationwideChange?: (checked: boolean) => void;
  onFastSaleChange?: (checked: boolean) => void;
  onShowAtTopChange?: (checked: boolean) => void;
  onBundleWithJobChange?: (checked: boolean) => void;
}

const SmartAdOptions = ({
  postType,
  isFirstPost = false,
  hasReferrals = false,
  onNationwideChange,
  onFastSaleChange,
  onShowAtTopChange,
  onBundleWithJobChange
}: SmartAdOptionsProps) => {
  const isJobPost = postType === 'job';
  const isSalonPost = postType === 'salon';
  const isBoothPost = postType === 'booth';
  
  const handleNationwideChange = (checked: boolean) => {
    if (onNationwideChange) onNationwideChange(checked);
  };
  
  const handleFastSaleChange = (checked: boolean) => {
    if (onFastSaleChange) onFastSaleChange(checked);
  };
  
  const handleShowAtTopChange = (checked: boolean) => {
    if (onShowAtTopChange) onShowAtTopChange(checked);
  };
  
  const handleBundleWithJobChange = (checked: boolean) => {
    if (onBundleWithJobChange) onBundleWithJobChange(checked);
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Boost Options</h3>
      
      <div className="space-y-4">
        {/* Nationwide Visibility Option */}
        {(isJobPost || isSalonPost || isBoothPost) && (
          <NationwideOption 
            postType={postType} 
            isFirstPost={isFirstPost}
            onChange={handleNationwideChange}
          />
        )}
        
        {/* Fast Sale Package - Only for Salon posts */}
        {isSalonPost && (
          <FastSalePackage 
            onChange={handleFastSaleChange} 
          />
        )}
        
        {/* Show at Top - Only for Booth posts */}
        {isBoothPost && (
          <ShowAtTopOption 
            onChange={handleShowAtTopChange} 
          />
        )}
        
        {/* Bundle with Job - For Salon and Booth posts */}
        {(isSalonPost || isBoothPost) && (
          <BundleWithJobOption 
            postType={postType} 
            onChange={handleBundleWithJobChange} 
          />
        )}
        
        {/* First Post Information for Job Post */}
        {isJobPost && isFirstPost && (
          <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800 flex items-start">
            <InfoIcon className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
            <div>
              <p>Your first job post is only $5. We'll need a payment method for verification.</p>
              {hasReferrals && <p className="mt-1 font-medium">You have referral credit available!</p>}
            </div>
          </div>
        )}

        {/* Second Post Information for Job Post */}
        {isJobPost && !isFirstPost && !hasReferrals && (
          <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800 flex items-start">
            <InfoIcon className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
            <div>
              <p>Standard job post: $10 (local), $15 (nationwide)</p>
              <p className="mt-1">Pro tip: Refer a friend and get $5 off your next post!</p>
            </div>
          </div>
        )}
        
        {/* First Post Information for Salon Post */}
        {isSalonPost && isFirstPost && (
          <div className="bg-green-50 p-3 rounded-md text-sm text-green-800 flex items-start">
            <InfoIcon className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
            <p>Your first salon listing is free! We'll need a payment method for verification.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartAdOptions;
