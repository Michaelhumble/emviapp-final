
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  path: string;
  action: string;
}

interface AIRecommendationsProps {
  className?: string;
}

const AIRecommendations = ({ className = "" }: AIRecommendationsProps) => {
  const { user, userRole } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    if (!user) return;
    
    // In a real app, this would fetch from an API based on user data
    // For now, we'll simulate personalized recommendations
    const mockRecommendations: Record<string, Recommendation[]> = {
      artist: [
        {
          id: "rec1",
          title: "Full-time Nail Artist",
          description: "Luxury salon in downtown - $65K-75K/year + benefits",
          path: "/jobs",
          action: "Apply Now"
        },
        {
          id: "rec2",
          title: "Pearly Nails & Spa",
          description: "Looking for nail techs with 2+ years experience",
          path: "/jobs",
          action: "View Job"
        },
        {
          id: "rec3",
          title: "Complete Your Portfolio",
          description: "Add 3 more photos to increase visibility by 40%",
          path: "/profile/artist/setup",
          action: "Update Now"
        }
      ],
      salon: [
        {
          id: "rec1",
          title: "5 Artists Nearby",
          description: "Nail technicians with 3+ years experience available now",
          path: "/artists",
          action: "View Artists"
        },
        {
          id: "rec2",
          title: "Job Post Analytics",
          description: "Your recent post is performing 30% above average",
          path: "/dashboard/owner",
          action: "See Details"
        },
        {
          id: "rec3",
          title: "Boost Business",
          description: "Verified salon badge increases applications by 45%",
          path: "/profile/salon/setup",
          action: "Get Verified"
        }
      ],
      customer: [
        {
          id: "rec1",
          title: "Weekend Special",
          description: "20% off lash extensions at top-rated salons",
          path: "/salons",
          action: "Book Now"
        },
        {
          id: "rec2",
          title: "Summer Nail Trends",
          description: "Discover the hottest nail designs for summer",
          path: "/artists",
          action: "Find Artists"
        },
        {
          id: "rec3",
          title: "Gift Card Balance",
          description: "You have $25 remaining on your EmviApp gift card",
          path: "/checkout",
          action: "Use Balance"
        }
      ],
      freelancer: [
        {
          id: "rec1",
          title: "Wedding Makeup Gig",
          description: "Looking for makeup artist for bridal party of 5",
          path: "/jobs",
          action: "Apply Now"
        },
        {
          id: "rec2",
          title: "Portfolio Review",
          description: "Get feedback from top industry professionals",
          path: "/profile/freelancer/setup",
          action: "Submit Work"
        },
        {
          id: "rec3",
          title: "Photoshoot Opportunity",
          description: "Beauty brand looking for makeup artist collaboration",
          path: "/jobs",
          action: "View Details"
        }
      ],
      vendor: [
        {
          id: "rec1",
          title: "10 Salons Searching",
          description: "Businesses looking for nail polish suppliers now",
          path: "/supplier-directory",
          action: "Connect"
        },
        {
          id: "rec2",
          title: "Product Promotion",
          description: "Featured product slot available - 70% more views",
          path: "/product-promotions",
          action: "Promote"
        },
        {
          id: "rec3",
          title: "Supply Trends",
          description: "Eco-friendly nail products seeing 40% growth",
          path: "/supplier-directory",
          action: "Explore Trend"
        }
      ],
      other: [
        {
          id: "rec1",
          title: "Choose Your Path",
          description: "Select your role to see personalized recommendations",
          path: "/dashboard/other",
          action: "Select Role"
        },
        {
          id: "rec2",
          title: "Explore Opportunities",
          description: "Browse the marketplace to see what EmviApp offers",
          path: "/salons",
          action: "Explore"
        },
        {
          id: "rec3",
          title: "Get Started Guide",
          description: "Learn how to make the most of your EmviApp experience",
          path: "/analysis",
          action: "Read Guide"
        }
      ]
    };
    
    // Set recommendations based on user role
    const role = userRole || 'other';
    setRecommendations(mockRecommendations[role] || mockRecommendations.other);
  }, [user, userRole]);

  if (!user || recommendations.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <Card className="border border-purple-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Just For You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <motion.div 
                key={rec.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0"
              >
                <h4 className="font-medium text-sm">{rec.title}</h4>
                <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                <Button variant="ghost" size="sm" asChild className="h-6 text-xs px-2 text-primary">
                  <a href={rec.path}>{rec.action}</a>
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIRecommendations;
