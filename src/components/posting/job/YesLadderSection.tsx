
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const YesLadderSection = () => {
  return (
    <div className="bg-[#F9F6FF] p-6 rounded-lg border border-[#EADCFF] my-6">
      <h3 className="text-lg font-medium mb-4 text-purple-700">
        <span className="mr-2">💡</span>
        Want Even Smarter Results?
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox id="find-someone-fast" defaultChecked />
          <div>
            <label
              htmlFor="find-someone-fast"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1"
            >
              I want to find someone fast, without wasting time
            </label>
            <p className="text-xs text-muted-foreground">
              Our matching system can help you connect with available artists quickly
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox id="help-writing" defaultChecked />
          <div>
            <label
              htmlFor="help-writing"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1"
            >
              I'd love help writing a more attractive job post
            </label>
            <p className="text-xs text-muted-foreground">
              Our AI can enhance your listing to highlight what artists care about most
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox id="weekly-pay" defaultChecked />
          <div>
            <label
              htmlFor="weekly-pay"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1"
            >
              Weekly pay helps me attract better artists
            </label>
            <p className="text-xs text-muted-foreground">
              Artists prefer regular payment schedules – we can highlight this benefit
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox id="more-visibility" defaultChecked />
          <div>
            <label
              htmlFor="more-visibility"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1"
            >
              Getting more visibility sounds great to me
            </label>
            <p className="text-xs text-muted-foreground">
              We can optimize your listing to appear higher in relevant artist searches
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox id="ai-do-work" defaultChecked />
          <div>
            <label
              htmlFor="ai-do-work"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1"
            >
              I'd rather let the AI do the work for me
            </label>
            <p className="text-xs text-muted-foreground">
              Smart automation can handle matching, screening, and initial communications
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-5 pt-4 border-t border-purple-100">
        <p className="text-sm italic">
          "Thanks to this smart system, I filled my spot in 48 hours!"
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          — Real Salon Owner
        </p>
      </div>
    </div>
  );
};

export default YesLadderSection;
