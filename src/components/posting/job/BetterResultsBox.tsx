
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const BetterResultsBox = () => {
  return (
    <div className="bg-[#F8F6FF] p-6 rounded-lg border border-[#E5DEFF] my-6">
      <h3 className="text-base font-medium mb-4">❤️ Want Better Results?</h3>
      
      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <Checkbox id="attract-technicians" defaultChecked />
          <label
            htmlFor="attract-technicians"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-0.5"
          >
            Attract more experienced technicians
          </label>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox id="boost-listing" defaultChecked />
          <label
            htmlFor="boost-listing"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-0.5"
          >
            Boost your listing placement in search
          </label>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox id="increase-views" defaultChecked />
          <label
            htmlFor="increase-views"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-0.5"
          >
            Increase views with smarter descriptions
          </label>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox id="get-noticed" defaultChecked />
          <label
            htmlFor="get-noticed"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-0.5"
          >
            Get noticed by better-fit artists
          </label>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mt-4">
        These tips help improve results but don't affect pricing or submission.
      </p>
    </div>
  );
};

export default BetterResultsBox;
