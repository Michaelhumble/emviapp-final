
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PhotoUploaderProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  className?: string;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  files,
  onChange,
  maxFiles = 5,
  accept = 'image/*',
  className
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Add new files and respect the maxFiles limit
    const newFiles = [...files];
    acceptedFiles.forEach(file => {
      if (newFiles.length < maxFiles) {
        newFiles.push(file);
      }
    });
    onChange(newFiles);
  }, [files, maxFiles, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    maxFiles: maxFiles - files.length
  });

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };
  
  const previewsExist = files.length > 0;

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400",
          previewsExist ? "py-4" : "py-10"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          {isDragActive ? (
            <>
              <Upload className="w-8 h-8 text-primary" />
              <p className="text-sm font-medium">Drop the files here</p>
            </>
          ) : (
            <>
              <div className="p-2 rounded-full bg-primary/10">
                <Image className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium">
                {files.length >= maxFiles ? (
                  "Maximum number of files reached"
                ) : (
                  "Drag and drop files here, or click to select"
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                Upload up to {maxFiles} images (max 5MB each)
              </p>
              {files.length < maxFiles && (
                <Button type="button" variant="outline" size="sm">
                  Select Files
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {previewsExist && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="relative group aspect-square">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;
