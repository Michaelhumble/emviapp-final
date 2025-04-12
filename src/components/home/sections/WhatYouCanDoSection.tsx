
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
      className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      <DecorativeBackground />
      
      <div className="container mx-auto px-4 relative z-10">
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
