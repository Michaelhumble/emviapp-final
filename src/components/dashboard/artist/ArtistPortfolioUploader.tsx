
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageIcon, X, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { motion, AnimatePresence } from "framer-motion";

const MODAL_ANIMATION = {
  initial: { opacity: 0, y: 24, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.36, ease: "easeOut" } },
  exit: { opacity: 0, y: 12, scale: 0.96, transition: { duration: 0.2, ease: "easeIn" } }
};

interface ArtistPortfolioUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const ArtistPortfolioUploader = (props: ArtistPortfolioUploaderProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.svg']
    },
    maxFiles: 1
  });

  const handleSave = async () => {
    if (!user || !file) {
      toast({
        title: "Missing image",
        description: "Please upload an image to continue.",
        variant: "destructive"
      });
      return;
    }

    try {
      setUploading(true);

      // 1. Upload image to Supabase storage
      const filePath = `portfolio_images/${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('portfolio_images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/portfolio_images/${filePath}`;

      // 2. Update user profile with the new portfolio URL
      const { data: userData } = await supabase
        .from('users')
        .select('portfolio_urls')
        .eq('id', user.id)
        .single();

      const currentUrls = userData?.portfolio_urls || [];
      const updatedUrls = [...currentUrls, imageUrl];

      const { error: updateError } = await supabase
        .from('users')
        .update({ portfolio_urls: updatedUrls })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      toast({
        title: "Upload complete",
        description: "Your portfolio image has been uploaded successfully."
      });
      props.onComplete();
      props.onClose();
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {props.isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/20"
          {...MODAL_ANIMATION}
        >
          {/* Modal content here: use motion.div inside for dialog panel for scale/opacity */}
          <motion.div
            className="bg-white rounded-2xl overflow-hidden shadow-lg w-full max-w-md p-6"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.28 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Upload New Work</h2>
              <Button variant="ghost" size="icon" onClick={props.onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div {...getRootProps()} className="relative border-2 border-dashed rounded-md p-4 cursor-pointer bg-gray-50">
              <input {...getInputProps()} id="portfolio-upload" />
              {isDragActive ? (
                <p className="text-center text-gray-600">Drop the image here ...</p>
              ) : (
                <div className="text-center">
                  {file ? (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Uploaded preview"
                        className="max-h-40 w-full object-contain rounded-md"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="mx-auto h-6 w-6 text-gray-400" />
                      <p className="text-gray-500 mt-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Accepts .png, .jpg, .jpeg, .gif, .svg
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Summer Collection"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add a description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between rounded-md border p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Preview Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Enable to hide this image from your public portfolio.
                  </p>
                </div>
                <Switch id="preview-mode" checked={previewMode} onCheckedChange={setPreviewMode} />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={props.onClose}>
                Cancel
              </Button>
              <Button type="button" onClick={handleSave} disabled={uploading}>
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArtistPortfolioUploader;
