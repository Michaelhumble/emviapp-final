
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface SalonPhotosSectionProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  maxPhotos?: number;
}

export const SalonPhotosSection: React.FC<SalonPhotosSectionProps> = ({ 
  photoUploads, 
  setPhotoUploads, 
  maxPhotos = 8 
}) => {
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const remainingSlots = maxPhotos - photoUploads.length;
    const filesToAdd = acceptedFiles.slice(0, remainingSlots);
    setPhotoUploads(prev => [...prev, ...filesToAdd]);
  }, [photoUploads.length, maxPhotos, setPhotoUploads]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true,
    maxFiles: maxPhotos,
  });

  const removePhoto = (index: number) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-100 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-purple-600" />
            Hình Ảnh Salon / Salon Photos
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Tải lên hình ảnh đẹp để thu hút người mua. Hình ảnh chất lượng cao sẽ giúp salon của bạn nổi bật!
            <br />
            Upload beautiful photos to attract buyers. High-quality images will make your salon stand out!
          </p>
        </CardHeader>
        <CardContent className="p-6">
          {/* Upload Area */}
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
              ${isDragActive 
                ? 'border-purple-400 bg-purple-50' 
                : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50/50'
              }
            `}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            
            {isDragActive ? (
              <p className="text-purple-600 font-medium">
                Thả hình ảnh vào đây... / Drop images here...
              </p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium text-purple-600">Nhấp để chọn</span> hoặc kéo thả hình ảnh
                </p>
                <p className="text-gray-500 text-sm">
                  <span className="font-medium text-purple-600">Click to select</span> or drag and drop images
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  PNG, JPG, WEBP tối đa {maxPhotos} ảnh / up to {maxPhotos} photos
                </p>
              </div>
            )}
          </div>

          {/* Photo Grid */}
          {photoUploads.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">
                Ảnh đã tải lên ({photoUploads.length}/{maxPhotos}) / 
                Uploaded Photos ({photoUploads.length}/{maxPhotos})
              </h4>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photoUploads.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    
                    {index === 0 && (
                      <div className="absolute bottom-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                        Ảnh chính / Main
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photo Requirements */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h5 className="font-medium text-blue-900 mb-2">
              💡 Mẹo chụp ảnh hiệu quả / Photo Tips
            </h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Chụp ảnh tổng quan không gian salon / Take overview shots of the salon space</li>
              <li>• Chụp các khu vực làm việc và thiết bị / Capture work areas and equipment</li>
              <li>• Đảm bảo ánh sáng tốt, tránh mờ / Ensure good lighting, avoid blur</li>
              <li>• Ảnh đầu tiên sẽ là ảnh đại diện / First photo will be the main display image</li>
            </ul>
          </div>

          {/* Upload Status */}
          {photoUploads.length === 0 && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 text-sm">
                ⚠️ Cần ít nhất 1 hình ảnh để tiếp tục / At least 1 photo required to continue
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPhotosSection;
