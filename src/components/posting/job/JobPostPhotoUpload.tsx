
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Image, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface JobPostPhotoUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  dragDropText?: string;
  photoCountText?: string;
}

const JobPostPhotoUpload: React.FC<JobPostPhotoUploadProps> = ({
  files,
  onChange,
  maxFiles = 5,
  dragDropText,
  photoCountText = "{count} / {max} photos added"
}) => {
  const { isVietnamese } = useTranslation();
  
  // Format the photo count text
  const formattedCountText = photoCountText
    ? photoCountText.replace('{count}', files.length.toString()).replace('{max}', maxFiles.toString())
    : `${files.length} / ${maxFiles} photos added`;
  
  const defaultDragDropText = isVietnamese
    ? "Kéo thả hình ảnh vào đây hoặc bấm để chọn – Gợi ý: Thêm hình sẽ giúp bài đăng nổi bật hơn!"
    : "Drag and drop images here or click to browse – Tip: Adding photos will make your listing stand out!";
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Limit to max files
    const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
    onChange(newFiles);
  }, [files, onChange, maxFiles]);
  
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxFiles: maxFiles - files.length,
    disabled: files.length >= maxFiles
  });

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'}
          ${files.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <Image className="h-12 w-12 text-gray-400 mb-2" />
        <p className="text-center text-muted-foreground">
          {dragDropText || defaultDragDropText}
        </p>
      </div>
      
      {/* Preview */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{formattedCountText}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostPhotoUpload;
