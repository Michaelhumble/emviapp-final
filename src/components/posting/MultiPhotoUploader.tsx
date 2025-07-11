import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Image, Move, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface MultiPhotoUploaderProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  accept?: string[];
  className?: string;
}

const MultiPhotoUploader: React.FC<MultiPhotoUploaderProps> = ({
  files,
  onChange,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  className
}) => {
  const [errors, setErrors] = useState<string[]>([]);

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!accept.includes(file.type)) {
      return `File type ${file.type} is not supported. Please use: ${accept.join(', ')}`;
    }
    
    // Check file size
    if (file.size > maxSize) {
      return `File size ${(file.size / 1024 / 1024).toFixed(1)}MB exceeds maximum size of ${maxSize / 1024 / 1024}MB`;
    }
    
    return null;
  };

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    // Process accepted files
    acceptedFiles.forEach(file => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else if (files.length + validFiles.length < maxFiles) {
        validFiles.push(file);
      } else {
        newErrors.push(`Maximum ${maxFiles} files allowed`);
      }
    });

    // Process rejected files
    rejectedFiles.forEach(({ file, errors: fileErrors }) => {
      fileErrors.forEach((error: any) => {
        if (error.code === 'file-too-large') {
          newErrors.push(`${file.name}: File too large (max ${maxSize / 1024 / 1024}MB)`);
        } else if (error.code === 'file-invalid-type') {
          newErrors.push(`${file.name}: Invalid file type`);
        } else {
          newErrors.push(`${file.name}: ${error.message}`);
        }
      });
    });

    setErrors(newErrors);
    
    if (validFiles.length > 0) {
      onChange([...files, ...validFiles]);
    }
  }, [files, maxFiles, maxSize, onChange, accept]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    multiple: true,
    disabled: files.length >= maxFiles
  });

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onChange(newFiles);
    setErrors([]); // Clear errors when files are removed
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedFiles = Array.from(files);
    const [reorderedItem] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, reorderedItem);

    onChange(reorderedFiles);
  };

  const previewsExist = files.length > 0;
  const canAddMore = files.length < maxFiles;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Zone */}
      {canAddMore && (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200",
            isDragActive 
              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" 
              : "border-gray-300 hover:border-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800",
            previewsExist ? "py-4" : "py-8"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-3">
            {isDragActive ? (
              <>
                <Upload className="w-10 h-10 text-purple-500" />
                <p className="text-lg font-medium text-purple-700">Drop your photos here!</p>
              </>
            ) : (
              <>
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50">
                  <Image className="w-8 h-8 text-purple-600" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    Upload Job Photos
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Drag and drop up to {maxFiles} photos, or click to browse
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Supported: .jpg, .png, .webp • Max 5MB each
                  </p>
                </div>
                <Button type="button" variant="outline" size="lg" className="mt-2">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Photos
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="text-sm">{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Photo Previews with Drag & Drop */}
      {previewsExist && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Uploaded Photos ({files.length}/{maxFiles})
            </h4>
            {files.length > 1 && (
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Move className="w-3 h-3" />
                Drag to reorder
              </p>
            )}
          </div>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="photos" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                >
                  {files.map((file, index) => (
                    <Draggable key={`${file.name}-${index}`} draggableId={`photo-${index}`} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={cn(
                            "relative group aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200",
                            snapshot.isDragging 
                              ? "border-purple-500 shadow-lg scale-105 z-50" 
                              : "border-gray-200 hover:border-purple-300"
                          )}
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          
                          {/* File Info Overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-2">
                            <div className="text-white text-xs">
                              <p className="font-medium truncate">{file.name}</p>
                              <p className="opacity-75">{(file.size / 1024 / 1024).toFixed(1)}MB</p>
                            </div>
                            
                            {/* Position indicator */}
                            <div className="flex justify-between items-end">
                              <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                                #{index + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Drag handle indicator */}
                          {files.length > 1 && (
                            <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Move className="w-3 h-3 text-white drop-shadow-sm" />
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}

      {/* Upload Status */}
      {files.length >= maxFiles && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Maximum number of photos reached ({maxFiles}/{maxFiles}). Remove a photo to upload more.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default MultiPhotoUploader;