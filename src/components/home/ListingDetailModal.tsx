
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon, DollarSign, MapPin, Clock, Award, Briefcase } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Job } from "@/types/job";
import { Salon } from "@/types/salon";
import { useAuth } from "@/context/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ListingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Job | Salon;
  listingType: "job" | "salon";
}

const ListingDetailModal = ({
  isOpen,
  onClose,
  listing,
  listingType,
}: ListingDetailModalProps) => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  // Safely access nested properties with null checks
  const safeGetProperty = (obj: any, path: string, defaultVal: any = "") => {
    const parts = path.split(".");
    let value = obj;
    for (const part of parts) {
      if (value === null || value === undefined || typeof value !== "object") {
        return defaultVal;
      }
      value = value[part];
    }
    return value === undefined || value === null ? defaultVal : value;
  };

  const getListingTitle = () => {
    if (listingType === "job") {
      return safeGetProperty(listing, "title", "Job Opportunity");
    } else {
      return safeGetProperty(listing, "name", "Salon");
    }
  };

  // Handle authentication check
  const handleActionClick = () => {
    if (!user) {
      setShowLogin(true);
    } else {
      // Handle apply or visit based on listing type
      if (listingType === "job") {
        console.log("User applying for job:", listing.id);
        // Implementation for job application would go here
      } else {
        console.log("User viewing salon details:", listing.id);
        // Implementation for salon visit would go here
      }
    }
  };

  const renderJobDetails = (job: Job) => {
    return (
      <div className="mt-6 space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Job Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeGetProperty(job, "salary") && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span>{safeGetProperty(job, "salary")}</span>
              </div>
            )}
            {safeGetProperty(job, "location") && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>{safeGetProperty(job, "location")}</span>
              </div>
            )}
            {safeGetProperty(job, "posted") && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <span>Posted: {safeGetProperty(job, "posted")}</span>
              </div>
            )}
            {safeGetProperty(job, "experience") && (
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-amber-600" />
                <span>Experience: {safeGetProperty(job, "experience")}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-2">Description</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {safeGetProperty(job, "description", "No description available.")}
          </p>
        </div>

        {safeGetProperty(job, "requirements") && (
          <div>
            <h3 className="font-medium text-lg mb-2">Requirements</h3>
            <ul className="list-disc pl-5 space-y-1">
              {Array.isArray(safeGetProperty(job, "requirements", [])) &&
                safeGetProperty(job, "requirements", []).map(
                  (req: string, idx: number) => (
                    <li key={idx}>{req}</li>
                  )
                )}
            </ul>
          </div>
        )}

        <div className="pt-4">
          <Button
            onClick={handleActionClick}
            className="w-full"
            size="lg"
          >
            {!user ? "Sign In to Apply" : "Apply Now"}
          </Button>
        </div>
      </div>
    );
  };

  const renderSalonDetails = (salon: Salon) => {
    return (
      <div className="mt-6 space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Salon Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeGetProperty(salon, "location") && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>{safeGetProperty(salon, "location")}</span>
              </div>
            )}
            {safeGetProperty(salon, "salon_type") && (
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-600" />
                <span>Type: {safeGetProperty(salon, "salon_type")}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-2">About This Salon</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {safeGetProperty(salon, "description", "No description available.")}
          </p>
        </div>

        <div className="pt-4">
          <Button
            onClick={handleActionClick}
            className="w-full"
            size="lg"
          >
            {!user ? "Sign In to View Details" : "View Salon Profile"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            {getListingTitle()}
          </DialogTitle>
          <DialogDescription>
            {listingType === "job" 
              ? safeGetProperty(listing, "company", "") 
              : safeGetProperty(listing, "address", "")}
          </DialogDescription>
        </DialogHeader>

        {showLogin ? (
          <div className="py-8 text-center">
            <h3 className="text-lg font-medium mb-4">
              Sign in to continue
            </h3>
            <p className="mb-6 text-gray-600">
              Create an account or sign in to apply to jobs and view salon details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button className="w-full sm:w-auto" size="lg">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  size="lg"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Display appropriate details based on listing type */}
            {listingType === "job" ? renderJobDetails(listing as Job) : renderSalonDetails(listing as Salon)}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ListingDetailModal;
