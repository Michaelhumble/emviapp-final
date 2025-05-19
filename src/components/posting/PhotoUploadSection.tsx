
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';

interface PhotoUploadSectionProps {
  files: File[];
  onFilesSelected: (files: File[]) => void;
  onFileRemoved: (index: number) => void;
  maxFiles?: number;
}

export const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({
  files,
  onFilesSelected,
  onFileRemoved,
  maxFiles = 5
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const remainingSlots = maxFiles - files.length;
    const filesToAdd = acceptedFiles.slice(0, remainingSlots);
    
    if (filesToAdd.length > 0) {
      onFilesSelected(filesToAdd);
    }
  }, [files, maxFiles, onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    maxFiles: maxFiles - files.length,
    disabled: files.length >= maxFiles
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Photo Uploads</h3>
        <p className="text-sm text-gray-500">
          Upload photos of your business or workplace (Optional, max {maxFiles})
        </p>
      </div>

      {/* File preview area */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((file, index) => (
            <div 
              key={index} 
              className="relative h-24 w-24 border rounded overflow-hidden group"
            >
              <img 
                src={URL.createObjectURL(file)} 
                alt={`Upload ${index + 1}`}
                className="h-full w-full object-cover" 
              />
              <button
                type="button"
                onClick={() => onFileRemoved(index)}
                className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Dropzone */}
      {files.length < maxFiles && (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-600">
              {isDragActive ? 'Drop the files here' : 'Drag photos here or click to browse'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {files.length} of {maxFiles} photos uploaded
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUploadSection;
