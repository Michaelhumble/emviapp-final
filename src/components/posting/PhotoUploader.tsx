
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoUploaderProps {
  onChange: (files: File[]) => void;
  files?: File[];
  photoUploads?: File[];
  maxFiles?: number;
  className?: string;
  accept?: string;
  maxPhotos?: number; // Added for backward compatibility
  uploads?: File[]; // Added for backward compatibility
  onUploadsChange?: (files: File[]) => void; // Added for backward compatibility
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  onChange,
  files = [],
  photoUploads = [],
  maxFiles = 5,
  maxPhotos, // Handle backward compatibility
  className,
  accept,
  uploads, // Handle backward compatibility
  onUploadsChange, // Handle backward compatibility
}) => {
  const [dragActive, setDragActive] = useState(false);
  
  // Use files prop if provided, otherwise fall back to uploads or photoUploads for compatibility
  const currentFiles = files.length > 0 ? files : uploads?.length ? uploads : photoUploads;
  
  // Use the higher level onChange function, or fall back to onUploadsChange if provided
  const handleChange = (newFiles: File[]) => {
    onChange(newFiles);
    if (onUploadsChange) {
      onUploadsChange(newFiles);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Only allow up to maxFiles
      const newFiles = Array.from(e.dataTransfer.files)
        .filter(file => file.type.startsWith('image/'))
        .slice(0, maxFiles || maxPhotos || 5);
      handleChange(newFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Only allow up to maxFiles
      const newFiles = Array.from(e.target.files)
        .filter(file => file.type.startsWith('image/'))
        .slice(0, maxFiles || maxPhotos || 5);
      handleChange(newFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    // Create a copy of the currentFiles array
    const newFiles = [...currentFiles];
    newFiles.splice(index, 1);
    handleChange(newFiles);
  };

  const renderPreview = () => {
    if (currentFiles.length === 0) return null;

    return (
      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-medium">Selected Photos: ({currentFiles.length}/{maxFiles || maxPhotos || 5})</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {currentFiles.map((file, index) => (
            <div key={index} className="relative">
              <div className="aspect-square border rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
                {file.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-2">
                    <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto" />
                    <span className="text-xs truncate block">{file.name}</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const maxFileLimit = maxFiles || maxPhotos || 5;
  const remainingSlots = maxFileLimit - currentFiles.length;

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-4">
        {remainingSlots > 0 ? (
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center",
              dragActive ? "border-primary bg-primary/5" : "border-gray-200",
              currentFiles.length > 0 ? "border-primary/50" : ""
            )}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm font-medium">
                Drag & drop photos here or click to browse
              </p>
              <p className="text-xs text-gray-500">
                Add up to {remainingSlots} more {remainingSlots === 1 ? 'photo' : 'photos'} (JPG, PNG only)
              </p>
              <div className="mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Select Photos
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept={accept || "image/*"}
                  multiple={remainingSlots > 1}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700">Maximum {maxFileLimit} photos reached</p>
            <p className="text-xs text-gray-500 mt-1">Remove some photos to add more</p>
          </div>
        )}
        
        {renderPreview()}
      </CardContent>
    </Card>
  );
};

export default PhotoUploader;
