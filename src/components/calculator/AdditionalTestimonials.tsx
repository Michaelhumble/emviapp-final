import React from 'react';
import { Quote } from 'lucide-react';

export const AdditionalTestimonials: React.FC = () => {
  const testimonials = [
    {
      text: "Listed my salon on EmviApp and had 3 serious buyers within a week. Sold within 45 days at asking price!",
      name: "Maria Rodriguez",
      location: "San Diego, CA",
      initials: "MR",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      text: "The valuation was spot-on. I used it to negotiate with potential buyers and felt confident throughout the process.",
      name: "David Chen",
      location: "Houston, TX",
      initials: "DC",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      text: "No broker fees saved me thousands! The platform is easy to use and buyers are serious and pre-qualified.",
      name: "Amanda Wilson",
      location: "Miami, FL",
      initials: "AW",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 my-16">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="bg-white border border-purple-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <Quote className="w-8 h-8 text-purple-400 mb-3" />
          <p className="text-sm text-foreground mb-4 leading-relaxed">
            "{testimonial.text}"
          </p>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold shadow-md flex-shrink-0`}>
              {testimonial.initials}
            </div>
            <div>
              <div className="font-semibold text-sm">{testimonial.name}</div>
              <div className="text-xs text-muted-foreground">{testimonial.location}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
