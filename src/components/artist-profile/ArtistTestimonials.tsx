
import React from "react";
import { Star } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: string;
  clientName: string;
  rating: number;
  text: string;
}

interface ArtistTestimonialsProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    clientName: "Jessica T.",
    rating: 5,
    text: "Absolutely stunning work! The attention to detail and creativity exceeded my expectations.",
  },
  {
    id: "2",
    clientName: "Sara P.",
    rating: 4,
    text: "Very professional and welcoming. Loved my manicure and the studio’s atmosphere.",
  },
  {
    id: "3",
    clientName: "Amelia R.",
    rating: 5,
    text: "Best nail experience I’ve had. Highly recommended for anyone seeking luxury service.",
  },
];

function calculateAverage(testimonials: Testimonial[]): number | null {
  if (!testimonials.length) return null;
  const total = testimonials.reduce((sum, t) => sum + t.rating, 0);
  return Math.round((total / testimonials.length) * 10) / 10;
}

const ArtistTestimonials: React.FC<ArtistTestimonialsProps> = ({
  testimonials = defaultTestimonials,
}) => {
  const reviews = testimonials.slice(0, 3);
  const average = calculateAverage(reviews);

  return (
    <section className="mb-12">
      <Card className="bg-gradient-to-br from-white via-purple-50 to-purple-100 border border-purple-50 shadow-sm">
        <CardHeader className="flex flex-col items-start gap-2 bg-gradient-to-r from-white to-purple-50 border-b border-purple-100 px-6 py-5">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-400 fill-amber-300 mr-1" />
            <span className="text-lg font-serif font-semibold text-gray-900">Client Reviews &amp; Ratings</span>
          </div>
          {average !== null && (
            <span className="flex items-center text-amber-600 text-[17px] font-medium mt-1">
              <Star className="h-4 w-4 mr-1 text-amber-400 fill-amber-300" />
              {average} <span className="text-gray-500 text-base ml-1">/ 5.0</span>
            </span>
          )}
        </CardHeader>
        <CardContent className="p-6">
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map(({ id, clientName, rating, text }) => (
                <div
                  key={id}
                  className="rounded-lg bg-white/90 border border-purple-100 px-6 py-5 shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-semibold text-gray-800">{clientName}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < rating ? "text-amber-400 fill-amber-300" : "text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-[15px] leading-relaxed">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <span className="text-3xl mb-3 text-gray-300">★</span>
              <p className="text-gray-600 text-center font-medium">
                No reviews yet — <span className="text-purple-600 font-semibold">be the first to book and share your experience!</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default ArtistTestimonials;
