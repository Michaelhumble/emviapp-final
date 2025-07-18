import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabaseBypass } from "@/types/supabase-bypass";
import { UserProfile } from "@/context/auth/types";
import { useAuth } from "@/context/auth";
import { useArtistData } from "../context/ArtistDataContext";
import UniversalPortfolioUploader from "@/components/portfolio/UniversalPortfolioUploader";
import { motion, AnimatePresence } from "framer-motion";

interface ArtistPortfolioUploaderProps {
  onComplete: () => void;
}

const ArtistPortfolioUploader = ({ onComplete }: ArtistPortfolioUploaderProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { artistProfile, refreshArtistProfile } = useArtistData();
  const [showModal, setShowModal] = useState(false);

  const handleUploadComplete = async (urls: string[]) => {
    try {
      // Update user profile with new images
      const currentUrls = artistProfile?.portfolio_urls || [];
      const updatedUrls = [...currentUrls, ...urls];
      
      const { error } = await supabaseBypass
        .from('profiles')
        .update({ portfolio_urls: updatedUrls })
        .eq('id', user.id);

      if (error) throw error;
      
      toast({
        title: "Upload complete",
        description: `Successfully uploaded ${urls.length} image${urls.length !== 1 ? 's' : ''}.`
      });
      
      // Refresh artist profile data
      await refreshArtistProfile();
      
      // Call onComplete to notify parent
      onComplete();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast({
        title: "Error updating profile",
        description: "Your images were uploaded but we couldn't update your profile. Please try again.",
        variant: "error"
      });
    }
  };

  const currentImages = artistProfile?.portfolio_urls || [];

  return (
    <>
      <div className="p-4 bg-purple-50/50 rounded-lg border border-purple-100">
        <h3 className="text-lg font-medium mb-3">Upload Portfolio Images</h3>
        <p className="text-gray-500 mb-4">
          Show your best work to attract clients.
          Images should be clear and high quality.
          <br/>
          <span className="text-sm italic mt-1 inline-block">
            Maximum 12 images total ({currentImages.length}/12 used). Files must be JPG, PNG or WEBP format.
          </span>
        </p>
        
        <div className="flex items-center gap-4">
          <Button onClick={() => setShowModal(true)} variant="default">
            <Upload className="mr-2 h-4 w-4" />
            Select Images
          </Button>
          
          <Button variant="outline" type="button" onClick={onComplete}>
            Cancel
          </Button>
        </div>
      </div>

      {/* Universal Portfolio Uploader Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowModal(false);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-playfair font-bold">Upload Portfolio Images</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowModal(false)}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <UniversalPortfolioUploader
                onUploadComplete={handleUploadComplete}
                onClose={() => setShowModal(false)}
                existingCount={currentImages.length}
                maxFiles={12}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ArtistPortfolioUploader;
