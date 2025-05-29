
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';

interface PhotoUploadStepProps {
  form: UseFormReturn<SalonFormValues>;
  onNext: () => void;
  onPrev: () => void;
  photos: File[];
  setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
}

export const PhotoUploadStep: React.FC<PhotoUploadStepProps> = ({ 
  form, 
  onNext, 
  onPrev, 
  photos, 
  setPhotos 
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setPhotos(prev => [...prev, ...newFiles]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Photo Upload</h2>
        <p className="text-gray-600 mt-2">
          Add photos of your salon to attract potential buyers
        </p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="photo-upload"
        />
        <label htmlFor="photo-upload" className="cursor-pointer">
          <div className="space-y-2">
            <div className="text-4xl text-gray-400">📷</div>
            <div className="text-lg font-medium">Click to upload photos</div>
            <div className="text-sm text-gray-500">or drag and drop</div>
          </div>
        </label>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Salon photo ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="text-sm text-gray-500">
        {photos.length} photo(s) uploaded
      </div>
    </div>
  );
};
