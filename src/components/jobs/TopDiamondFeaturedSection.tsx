
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Phone, Diamond } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";
import AuthAction from "@/components/common/AuthAction";

interface TopDiamondFeaturedSectionProps {
  featuredJobs: Job[];
  onViewDetails: (job: Job) => void;
}

const TopDiamondFeaturedSection = ({ featuredJobs, onViewDetails }: TopDiamondFeaturedSectionProps) => {
  const { isSignedIn } = useAuth();

  if (!featuredJobs.length) return null;

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <Diamond className="h-6 w-6 text-amber-500 mr-2" />
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">Top Diamond Featured</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredJobs.map((job) => (
          <Card
            key={job.id}
            className="overflow-hidden border-2 border-amber-200 shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <div className="h-2 bg-gradient-to-r from-amber-400 to-amber-600" />

            <div className="aspect-video relative">
              <ImageWithFallback
                src={job.image || ""}
                alt={job.title || "Featured job listing"}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 left-2 bg-amber-500 text-white border-0">
                Diamond
              </Badge>
            </div>

            <CardContent className="p-6">
              <div className="mb-3">
                <h3 className="font-playfair font-semibold text-lg line-clamp-2">{job.title}</h3>
                <p className="text-gray-600 font-medium">{job.company}</p>
              </div>

              <div className="flex items-center text-base text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" /> {job.location}
              </div>

              <div className="flex items-center text-base text-gray-600 mb-4">
                <Calendar className="h-4 w-4 mr-1" /> {new Date(job.created_at).toLocaleDateString()}
              </div>

              <p className="text-base text-gray-700 mb-4 line-clamp-2">
                {job.description}
              </p>

              <div className="border-t border-amber-100 pt-3 mb-4">
                {job.contact_info?.phone ? (
                  isSignedIn ? (
                    <div className="flex items-center text-base">
                      <Phone className="h-3.5 w-3.5 mr-1 text-gray-500" />
                      <span>{job.contact_info.phone}</span>
                    </div>
                  ) : (
                    <AuthAction
                      customTitle="Sign in to see contact details"
                      onAction={() => true}
                      fallbackContent={
                        <div className="text-base text-gray-500 italic flex items-center gap-1">
                          <span className="text-base">🔒</span>
                          <span>Sign in to see contact details</span>
                        </div>
                      }
                    />
                  )
                ) : null}
              </div>

              <Button
                className="w-full font-bold bg-gradient-to-r from-amber-500 to-amber-600"
                onClick={() => onViewDetails(job)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};

export default TopDiamondFeaturedSection;
