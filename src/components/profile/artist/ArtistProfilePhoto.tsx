
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Trash2, Upload } from "lucide-react";
import React from "react";

interface ArtistProfilePhotoProps {
  avatarUrl: string | null;
  avatarPreview: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveAvatar: () => void;
  isLoading: boolean;
}

const ArtistProfilePhoto = ({
  avatarUrl,
  avatarPreview,
  onFileChange,
  onRemoveAvatar,
  isLoading,
}: ArtistProfilePhotoProps) => {
  // Determine which image to display (preview takes precedence over URL)
  const displayImage = avatarPreview || avatarUrl;
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-lg font-medium">Profile Photo</h3>
      
      <div className="h-36 w-36 rounded-full overflow-hidden border-2 border-primary flex items-center justify-center bg-muted relative">
        {displayImage ? (
          <img
            src={displayImage}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-muted">
            <Upload className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
            disabled={isLoading}
          />
          <Label
            htmlFor="avatar"
            className={`cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-2 rounded-md text-sm font-medium inline-flex items-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Upload className="h-4 w-4 mr-2" />
            {avatarUrl || avatarPreview ? "Change Photo" : "Upload Photo"}
          </Label>
        </div>
        
        {(avatarUrl || avatarPreview) && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRemoveAvatar}
            disabled={isLoading}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground text-center max-w-md">
        Upload a professional photo that clearly shows your face. This helps build trust with clients and salon owners.
      </p>
    </div>
  );
};

export default ArtistProfilePhoto;
