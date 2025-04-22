
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

export const RecentReviewsCard = () => {
  const reviews = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      comment: "Amazing service as always! Love my nails.",
      date: "2 days ago"
    },
    {
      id: 2,
      author: "Jessica L.",
      rating: 4,
      comment: "Great experience, very professional staff.",
      date: "4 days ago"
    }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{review.author}</span>
                <div className="flex items-center">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className="w-4 h-4 text-yellow-400 fill-current" 
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-2">{review.date}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
