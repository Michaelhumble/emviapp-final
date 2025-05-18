
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoUploaderProps {
  onChange: (files: File[]) => void;
  files?: File[];  // Add this prop to match JobForm.tsx usage
  photoUploads?: File[];
  maxFiles?: number;
  className?: string;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  onChange,
  files = [],        // Add this prop with default value
  photoUploads = [], // Keep existing prop for backward compatibility
  maxFiles = 1,
  className,
}) => {
  const [dragActive, setDragActive] = useState(false);
  
  // Use files prop if provided, otherwise fall back to photoUploads for compatibility
  const currentFiles = files.length > 0 ? files : photoUploads;

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
      const newFiles = Array.from(e.dataTransfer.files).slice(0, maxFiles);
      onChange(newFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Only allow up to maxFiles
      const newFiles = Array.from(e.target.files).slice(0, maxFiles);
      onChange(newFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    // Create a copy of the currentFiles array
    const newFiles = [...currentFiles];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  const renderPreview = () => {
    if (currentFiles.length === 0) return null;

    return (
      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-medium">Selected Photos:</h3>
        <div className="flex flex-wrap gap-2">
          {currentFiles.map((file, index) => (
            <div key={index} className="relative">
              <div className="w-20 h-20 border rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
                {file.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
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

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-4">
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
              Supports JPG, PNG, GIF (max {maxFiles} {maxFiles === 1 ? 'file' : 'files'})
            </p>
            <div className="mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Select Photo
              </Button>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                multiple={maxFiles > 1}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
        
        {renderPreview()}
      </CardContent>
    </Card>
  );
};

export default PhotoUploader;
