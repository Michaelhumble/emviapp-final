
import { useState, useEffect } from "react";

import NationwideOption from "./smart-ad-options/NationwideOption";
import FastSalePackage from "./smart-ad-options/FastSalePackage";
import ShowAtTopOption from "./smart-ad-options/ShowAtTopOption";
import BundleWithJobOption from "./smart-ad-options/BundleWithJobOption";
import UserMessages from "./smart-ad-options/UserMessages";
import EmviFeatures from "./smart-ad-options/EmviFeatures";
import { getNationwidePrice } from "./smart-ad-options/pricing";

export interface SmartAdOptionsProps {
  postType: 'job' | 'salon' | 'booth' | 'supply';
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
  const [fastSale, setFastSale] = useState(false);
  
  const handleFastSaleChange = (checked: boolean) => {
    setFastSale(checked);
    if (onFastSaleChange) onFastSaleChange(checked);
  };

  // Pass through handler for nationwide with default implementation
  const handleNationwideChange = (checked: boolean) => {
    if (onNationwideChange) onNationwideChange(checked);
  };
  
  // Pass through handlers for other options
  const handleShowAtTopChange = (checked: boolean) => {
    if (onShowAtTopChange) onShowAtTopChange(checked);
  };
  
  const handleBundleWithJobChange = (checked: boolean) => {
    if (onBundleWithJobChange) onBundleWithJobChange(checked);
  };
  
  const nationwidePrice = getNationwidePrice(postType);
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Smart Ad Options</h3>
      
      {/* Nationwide Visibility Option */}
      <NationwideOption
        isFirstPost={isFirstPost}
        price={nationwidePrice}
        disabled={fastSale}
        onNationwideChange={handleNationwideChange}
      />
      
      {/* Post Type Specific Options */}
      {postType === 'salon' && (
        <FastSalePackage onFastSaleChange={handleFastSaleChange} />
      )}
      
      {postType === 'booth' && (
        <>
          <ShowAtTopOption onShowAtTopChange={handleShowAtTopChange} />
          <BundleWithJobOption onBundleWithJobChange={handleBundleWithJobChange} />
        </>
      )}
      
      {/* User Messages */}
      <UserMessages 
        isFirstPost={isFirstPost}
        hasReferrals={hasReferrals}
        postType={postType}
      />
      
      {/* EmviSEO promotion */}
      <EmviFeatures />
    </div>
  );
};

export default SmartAdOptions;
