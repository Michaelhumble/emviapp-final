import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Image as ImageIcon, Camera, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { motion } from "framer-motion";

interface ArtistPortfolioUploadModalProps {
  open: boolean;
  onClose: () => void;
}

const ArtistPortfolioUploadModal = ({ open, onClose }: ArtistPortfolioUploadModalProps) => {
  const { userProfile, refreshUserProfile } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    selectedFiles.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setFiles(prev => [...prev, file]);
          setPreviews(prev => [...prev, result]);
          setTitles(prev => [...prev, '']);
          setDescriptions(prev => [...prev, '']);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
    setTitles(prev => prev.filter((_, i) => i !== index));
    setDescriptions(prev => prev.filter((_, i) => i !== index));
  };

  const updateTitle = (index: number, title: string) => {
    setTitles(prev => prev.map((t, i) => i === index ? title : t));
  };

  const updateDescription = (index: number, description: string) => {
    setDescriptions(prev => prev.map((d, i) => i === index ? description : d));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one image to upload");
      return;
    }

    setIsUploading(true);
    try {
      // Create mock URLs for demo (in real app, upload to Supabase Storage)
      const mockUrls = files.map(file => URL.createObjectURL(file));
      
      // Add portfolio items with metadata
      const portfolioItems = files.map((file, index) => ({
        url: mockUrls[index],
        title: titles[index] || `Artwork ${index + 1}`,
        description: descriptions[index] || '',
        created_at: new Date().toISOString()
      }));

      // In a real app, you would save to database here
      // For now, we'll simulate success and update local storage
      const existingUrls = userProfile?.portfolio_urls || [];
      const updatedUrls = [...existingUrls, ...mockUrls];
      
      // Update user profile (mock)
      localStorage.setItem('artist_portfolio', JSON.stringify(portfolioItems));
      
      await refreshUserProfile();
      
      toast.success(`Successfully uploaded ${files.length} image${files.length > 1 ? 's' : ''} to your portfolio!`, {
        description: "Your new work is now visible to potential clients."
      });
      
      // Reset form
      setFiles([]);
      setPreviews([]);
      setTitles([]);
      setDescriptions([]);
      onClose();
      
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error("Failed to upload images. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    if (!isUploading) {
      setFiles([]);
      setPreviews([]);
      setTitles([]);
      setDescriptions([]);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Camera className="h-5 w-5 text-purple-600" />
            Add to Portfolio
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Area */}
          <div 
            className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center">
              <Upload className="h-12 w-12 text-purple-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload Your Masterpieces
              </h3>
              <p className="text-gray-500 mb-4">
                Click to select images or drag and drop
              </p>
              <Button variant="outline" type="button">
                <Plus className="h-4 w-4 mr-2" />
                Choose Images
              </Button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Preview Grid */}
          {previews.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Preview & Details</h4>
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {previews.map((preview, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <Label htmlFor={`title-${index}`} className="text-sm">
                          Title
                        </Label>
                        <Input
                          id={`title-${index}`}
                          placeholder="Give your work a title..."
                          value={titles[index]}
                          onChange={(e) => updateTitle(index, e.target.value)}
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`description-${index}`} className="text-sm">
                          Description (optional)
                        </Label>
                        <Textarea
                          id={`description-${index}`}
                          placeholder="Describe your technique, inspiration, or process..."
                          value={descriptions[index]}
                          onChange={(e) => updateDescription(index, e.target.value)}
                          className="text-sm resize-none"
                          rows={2}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isUploading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={files.length === 0 || isUploading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload {files.length} {files.length === 1 ? 'Image' : 'Images'}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtistPortfolioUploadModal;