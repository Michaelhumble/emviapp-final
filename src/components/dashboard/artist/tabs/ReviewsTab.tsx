
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Mock review data
const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    date: "Apr 18, 2025",
    rating: 5,
    review: "Absolutely amazing work! My nails have never looked better. The attention to detail is incredible and the design lasted for weeks without chipping. I've already booked my next appointment!",
    responded: true,
    response: "Thank you so much, Sarah! I'm so glad you loved your nails. Looking forward to seeing you again soon!"
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/150?img=3",
    date: "Apr 12, 2025",
    rating: 5,
    review: "I was nervous about trying a new nail tech, but I'm so glad I did! The service was exceptional from start to finish and the results were exactly what I wanted.",
    responded: false
  },
  {
    id: 3,
    name: "Emily Wright",
    avatar: "https://i.pravatar.cc/150?img=5",
    date: "Apr 8, 2025",
    rating: 4,
    review: "Great experience overall. Very professional, friendly and talented. My nails look fantastic and I've received so many compliments.",
    responded: true,
    response: "Thanks for your kind words, Emily! It was a pleasure working with you."
  },
  {
    id: 4,
    name: "Jessica Miller",
    avatar: "https://i.pravatar.cc/150?img=6",
    date: "Apr 2, 2025",
    rating: 5,
    review: "The best nail artist I've ever been to! Extremely talented and professional. My nails have never looked better.",
    responded: false
  },
  {
    id: 5,
    name: "Alex Thompson",
    avatar: "https://i.pravatar.cc/150?img=7",
    date: "Mar 25, 2025",
    rating: 4,
    review: "Very skilled artist with an eye for detail. The design was exactly as discussed and looks beautiful. Highly recommended!",
    responded: false
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 } 
  }
};

const ReviewsTab = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const filteredReviews = activeFilter === "all" 
    ? reviews 
    : activeFilter === "unresponded" 
      ? reviews.filter(review => !review.responded)
      : reviews.filter(review => review.responded);
      
  // Calculate average rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = (totalRating / reviews.length).toFixed(1);
  
  // Count reviews by rating
  const ratingCounts = reviews.reduce((counts, review) => {
    counts[review.rating] = (counts[review.rating] || 0) + 1;
    return counts;
  }, {} as Record<number, number>);
  
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Reviews Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="text-center">
              <div className="text-4xl font-bold">{averageRating}</div>
              <div className="flex justify-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(parseFloat(averageRating))
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-1">Based on {reviews.length} reviews</div>
            </div>
            
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingCounts[rating] || 0;
                const percentage = (count / reviews.length) * 100;
                
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="flex items-center w-16">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 ml-1" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-sm text-gray-500">
                      {count}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-lg font-medium">Client Reviews</CardTitle>
            <div className="flex rounded-lg border divide-x overflow-hidden">
              <Button
                variant="ghost"
                className={`rounded-none h-9 ${activeFilter === 'all' ? 'bg-gray-100' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All ({reviews.length})
              </Button>
              <Button
                variant="ghost"
                className={`rounded-none h-9 ${activeFilter === 'unresponded' ? 'bg-gray-100' : ''}`}
                onClick={() => setActiveFilter('unresponded')}
              >
                Needs Response ({reviews.filter(r => !r.responded).length})
              </Button>
              <Button
                variant="ghost"
                className={`rounded-none h-9 ${activeFilter === 'responded' ? 'bg-gray-100' : ''}`}
                onClick={() => setActiveFilter('responded')}
              >
                Responded ({reviews.filter(r => r.responded).length})
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                variants={itemVariants}
                className="p-4 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{review.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="mt-3 text-gray-700">{review.review}</p>
                
                {review.responded ? (
                  <div className="mt-3 pl-4 border-l-2 border-purple-200">
                    <p className="text-sm italic text-gray-600">{review.response}</p>
                    <p className="text-xs text-gray-500 mt-1">Your response</p>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Respond
                  </Button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsTab;
