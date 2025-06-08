
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, Quote } from 'lucide-react';

interface TestimonialsModalProps {
  open: boolean;
  onClose: () => void;
}

const TestimonialsModal = ({ open, onClose }: TestimonialsModalProps) => {
  const testimonials = [
    {
      name: "Alex Parker",
      rating: 5,
      text: "Absolutely incredible work! The attention to detail is unmatched. Professional service and beautiful results every time.",
      service: "Nail Art"
    },
    {
      name: "Jordan Kim",
      rating: 5,
      text: "Professional service and amazing results. Clean facility, friendly staff, and exceptional quality work.",
      service: "Manicure"
    },
    {
      name: "Casey Mitchell",
      rating: 5,
      text: "Outstanding experience from start to finish. The artistry and skill level is truly impressive!",
      service: "Pedicure"
    },
    {
      name: "Taylor Davis",
      rating: 5,
      text: "Best nail artist in the city! Always delivers exactly what I envision and more.",
      service: "Full Set"
    },
    {
      name: "Morgan Roberts",
      rating: 5,
      text: "Incredible talent and attention to detail. The studio is spotless and the atmosphere is so relaxing.",
      service: "Nail Art"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-playfair">
            <Quote className="h-6 w-6 text-rose-500" />
            Client Reviews
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-slate-50 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-slate-600">{testimonial.service}</div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-slate-700">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialsModal;
