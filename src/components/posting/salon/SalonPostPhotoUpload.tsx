
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface SalonPostPhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
}

const SalonPostPhotoUpload = ({ photoUploads, setPhotoUploads }: SalonPostPhotoUploadProps) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setPhotoUploads([...photoUploads, ...files]);
  };

  const removePhoto = (index: number) => {
    setPhotoUploads(photoUploads.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Salon Photos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Upload photos of your salon
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              onClick={() => document.getElementById('photo-upload')?.click()}
            >
              Choose Files
            </Button>
            <input
              id="photo-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {photoUploads.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photoUploads.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonPostPhotoUpload;
