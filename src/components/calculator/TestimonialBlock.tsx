import React from 'react';
import { Quote } from 'lucide-react';

export const TestimonialBlock: React.FC = () => {
  return (
    <div className="bg-card border rounded-lg p-8 max-w-3xl mx-auto my-12">
      <Quote className="w-10 h-10 text-primary mb-4" />
      <blockquote className="text-lg text-foreground mb-4">
        "I was shocked at how accurate the valuation was! I used this calculator before listing my salon, and the final sale price was within 5% of the estimate. It gave me the confidence to negotiate properly."
      </blockquote>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
          LN
        </div>
        <div>
          <div className="font-semibold text-foreground">Linda Nguyen</div>
          <div className="text-sm text-muted-foreground">Sold her salon in Orange County, CA</div>
        </div>
      </div>
    </div>
  );
};
