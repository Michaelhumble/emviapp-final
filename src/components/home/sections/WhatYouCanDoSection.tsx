
import React from "react";
import SectionHeader from "./SectionHeader";
import FeatureGrid from "./FeatureGrid";
import DecorativeBackground from "./DecorativeBackground";
import { useFeatureData } from "../data/featureData";

const WhatYouCanDoSection: React.FC = () => {
  const features = useFeatureData();
  
  return (
    <section 
      id="what-you-can-do" 
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 relative overflow-hidden"
    >
      <DecorativeBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Number Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/60 rounded-full px-4 py-2">
            <span className="w-6 h-6 bg-indigo-600 text-white text-sm font-semibold rounded-full flex items-center justify-center">
              3
            </span>
            <span className="text-indigo-700 font-medium text-sm">
              Platform Features
            </span>
          </div>
        </div>

        <SectionHeader
          title="What You Can Do With EmviApp"
          vietnameseTitle="EmviApp giúp bạn làm được gì?"
          description="The all-in-one platform for salons, artists, and beauty professionals."
        />

        <FeatureGrid features={features} />
      </div>
    </section>
  );
};

export default WhatYouCanDoSection;
