
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const BetterResultsBox = () => {
  return (
    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 my-6">
      <h3 className="text-base font-medium mb-4">❤️ Want Better Results?</h3>
      
      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <Checkbox id="quick-apply" defaultChecked />
          <label
            htmlFor="quick-apply"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-0.5"
          >
            I want more artists to apply quickly
          </label>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox id="writing-suggestions" defaultChecked />
          <label
            htmlFor="writing-suggestions"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-0.5"
          >
            I'm open to writing suggestions to make my post stand out
          </label>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox id="upload-photos" defaultChecked />
          <label
            htmlFor="upload-photos"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-0.5"
          >
            I want to upload photos to attract more views
          </label>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox id="hiring-immediately" defaultChecked />
          <label
            htmlFor="hiring-immediately"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-0.5"
          >
            I'm hiring immediately and ready to respond
          </label>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mt-4">
        These settings won't affect pricing. They help us personalize your visibility.
      </p>
    </div>
  );
};

export default BetterResultsBox;
