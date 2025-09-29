import React from 'react';
import { Quote } from 'lucide-react';

export const TestimonialBlock: React.FC = () => {
  return (
    <div className="relative bg-white border-4 border-transparent rounded-2xl p-10 max-w-3xl mx-auto my-16 shadow-xl" style={{
      backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #8B5CF6, #EC4899, #F97316)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box'
    }}>
      <Quote className="w-14 h-14 text-purple-500 mb-6" />
      <blockquote className="text-xl md:text-2xl text-foreground mb-6 font-medium leading-relaxed">
        "I was shocked at how accurate the valuation was! I used this calculator before listing my salon, and the final sale price was within 5% of the estimate. It gave me the confidence to negotiate properly."
      </blockquote>
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
          LN
        </div>
        <div>
          <div className="font-bold text-lg text-foreground">Linda Nguyen</div>
          <div className="text-base text-muted-foreground">Sold her salon in Orange County, CA</div>
        </div>
      </div>
    </div>
  );
};
