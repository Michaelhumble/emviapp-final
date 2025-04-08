
import { Button } from "@/components/ui/button";
import { Upload, Calendar, Users, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

interface ArtistToolkitSectionProps {
  onCopyReferralLink: () => void;
}

const ArtistToolkitSection = ({ onCopyReferralLink }: ArtistToolkitSectionProps) => {
  const handleAddPortfolioItem = () => {
    // In production, this would open an upload dialog/form
    toast.info("Portfolio upload feature coming soon!");
  };
  
  const handleAddService = () => {
    // In production, this would open a service form
    toast.info("Service creation feature coming soon!");
  };
  
  return (
    <section className="mb-8">
      <h2 className="text-xl font-serif font-semibold mb-4">Artist Toolkit</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="h-auto flex flex-col items-center justify-center p-6 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl shadow-sm transition hover:shadow"
          onClick={handleAddPortfolioItem}
        >
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
            <Upload className="h-6 w-6 text-purple-600" />
          </div>
          <span className="text-sm font-medium">Upload Portfolio</span>
        </Button>
        
        <Button
          variant="outline"
          className="h-auto flex flex-col items-center justify-center p-6 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl shadow-sm transition hover:shadow"
          onClick={handleAddService}
        >
          <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center mb-3">
            <ShoppingBag className="h-6 w-6 text-pink-600" />
          </div>
          <span className="text-sm font-medium">Add Services</span>
        </Button>
        
        <Button
          variant="outline"
          className="h-auto flex flex-col items-center justify-center p-6 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl shadow-sm transition hover:shadow"
          onClick={() => toast.info("Booking calendar coming soon!")}
        >
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <span className="text-sm font-medium">View Bookings</span>
        </Button>
        
        <Button
          variant="outline"
          className="h-auto flex flex-col items-center justify-center p-6 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl shadow-sm transition hover:shadow"
          onClick={onCopyReferralLink}
        >
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
            <Users className="h-6 w-6 text-amber-600" />
          </div>
          <span className="text-sm font-medium">Invite Others</span>
        </Button>
      </div>
    </section>
  );
};

export default ArtistToolkitSection;
