
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  client_name: string;
  service_type: string;
  review_text: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  artistName: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials, artistName }) => {
  const hasTestimonials = testimonials && testimonials.length > 0;
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-serif font-semibold mb-4">Client Testimonials</h2>
      {!hasTestimonials ? (
        <Card className="bg-gradient-to-tr from-purple-50 to-white border-none shadow-none">
          <CardContent className="py-10 flex flex-col items-center">
            <span className="text-gray-400 text-3xl mb-3">🗨️</span>
            <p className="text-muted-foreground text-center font-medium">
              No testimonials yet.<br />
              <span className="text-gray-500">
                Ask your clients to leave a review after each appointment.
              </span>
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <Card 
              key={t.id}
              className="shadow-lg border-0 bg-gradient-to-br from-white via-purple-50 to-purple-100"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-800">{t.client_name}</div>
                    <div className="text-xs text-purple-700 font-medium">{t.service_type}</div>
                  </div>
                  {typeof t.rating === "number" && t.rating > 0 && (
                    <div className="flex items-center ml-2">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`h-4 w-4 ${
                            idx < (t.rating || 0)
                              ? "text-amber-400 fill-amber-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">{t.review_text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
