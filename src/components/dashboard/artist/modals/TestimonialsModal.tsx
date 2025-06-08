
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
      name: "Hương Linh",
      rating: 5,
      text: "Tay nghề tuyệt vời! Nail art đẹp không tì vết. Sẽ quay lại nhiều lần nữa! 💖",
      service: "Nail Art"
    },
    {
      name: "Phương Anh",
      rating: 5,
      text: "Dịch vụ chuyên nghiệp, không gian sạch sẽ. Rất hài lòng với kết quả!",
      service: "Manicure"
    },
    {
      name: "Thu Trang",
      rating: 5,
      text: "Chị làm rất tỉ mỉ và kiên nhẫn. Nail đẹp y như mong muốn! ⭐",
      service: "Pedicure"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Quote className="h-5 w-5 text-purple-500" />
            Đánh Giá Từ Khách Hàng
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.service}</div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialsModal;
