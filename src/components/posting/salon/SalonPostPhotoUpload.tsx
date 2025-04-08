
import { useState } from "react";
import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SalonPostPhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
}

export const SalonPostPhotoUpload = ({ photoUploads, setPhotoUploads }: SalonPostPhotoUploadProps) => {
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setPhotoUploads((prev) => [...prev, ...newFiles]);
      
      // Clear the input to allow selecting the same file again
      e.target.value = '';
      
      toast({
        title: "Photos Selected",
        description: `${newFiles.length} photo${newFiles.length > 1 ? 's' : ''} added to your listing.`,
      });
    }
  };
  
  return (
    <div className="space-y-4">
      <FormLabel>Photo Upload</FormLabel>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500 mb-3">
          Upload photos of your salon (max 5 photos)
        </p>
        <div className="flex justify-center">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={photoUploads.length >= 5}
          >
            Select Photos
          </Button>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
            disabled={photoUploads.length >= 5}
          />
        </div>
        
        {photoUploads.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {photoUploads.map((file, index) => (
              <div 
                key={index} 
                className="w-20 h-20 relative rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-600 overflow-hidden"
              >
                {file.name.substring(0, 10)}...
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
