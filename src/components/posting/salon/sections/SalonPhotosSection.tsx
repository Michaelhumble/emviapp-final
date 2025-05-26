
import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Star, ArrowLeft, X, Crown } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { salonPhotosSchema, type SalonPhotosValues } from '../enhancedSalonFormSchema';

interface SalonPhotosSectionProps {
  data: any;
  onSubmit: (data: SalonPhotosValues) => void;
  onPrevious: () => void;
}

const SalonPhotosSection = ({ data, onSubmit, onPrevious }: SalonPhotosSectionProps) => {
  const [photos, setPhotos] = useState<File[]>(data?.photos?.photos || []);
  const [coverPhotoIndex, setCoverPhotoIndex] = useState(data?.photos?.coverPhotoIndex || 0);

  const form = useForm<SalonPhotosValues>({
    resolver: zodResolver(salonPhotosSchema),
    defaultValues: {
      photos: photos,
      coverPhotoIndex: coverPhotoIndex,
      virtualTourUrl: data?.photos?.virtualTourUrl || '',
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPhotos = [...photos, ...acceptedFiles];
    setPhotos(newPhotos);
    form.setValue('photos', newPhotos);
  }, [photos, form]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true
  });

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    form.setValue('photos', newPhotos);
    
    if (coverPhotoIndex >= newPhotos.length) {
      setCoverPhotoIndex(0);
      form.setValue('coverPhotoIndex', 0);
    }
  };

  const setCoverPhoto = (index: number) => {
    setCoverPhotoIndex(index);
    form.setValue('coverPhotoIndex', index);
  };

  const handleSubmit = (formData: SalonPhotosValues) => {
    onSubmit({ photos: { ...formData, photos, coverPhotoIndex } });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-full">
            <Camera className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Showcase Your Beautiful Space
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Photos are the #1 factor in getting buyer inquiries. Show off your salon's best features!
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Star className="w-3 h-3 mr-1" />
            Listings with 8+ photos get 3x more views
          </Badge>
        </div>
      </motion.div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Photo Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-dashed border-2 border-pink-300 bg-pink-50/50">
              <CardContent className="p-8">
                <div
                  {...getRootProps()}
                  className={`text-center cursor-pointer transition-all duration-300 ${
                    isDragActive ? 'scale-105' : ''
                  }`}
                >
                  <input {...getInputProps()} />
                  <motion.div
                    animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Upload className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {isDragActive ? 'Drop your photos here!' : 'Upload Salon Photos'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Drag & drop photos or click to browse. Minimum 3 photos required.
                  </p>
                  <Button type="button" variant="outline" className="border-pink-300">
                    Choose Photos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Photo Grid */}
          {photos.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4">
                Your Photos ({photos.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <AnimatePresence>
                  {photos.map((photo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative group"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Salon photo ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Cover Photo Badge */}
                      {index === coverPhotoIndex && (
                        <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                          <Crown className="w-3 h-3 mr-1" />
                          Cover
                        </Badge>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        {index !== coverPhotoIndex && (
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => setCoverPhoto(index)}
                          >
                            Set Cover
                          </Button>
                        )}
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => removePhoto(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Virtual Tour */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-500" />
                  Virtual Tour (Optional)
                </h3>
                <FormField
                  control={form.control}
                  name="virtualTourUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>360° Virtual Tour or Video Walkthrough URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://your-virtual-tour-link.com"
                          className="border-purple-300 focus:border-purple-500"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-sm text-purple-600">
                        Virtual tours increase buyer engagement by 200%
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Photo Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-green-900 mb-2">📸 Best Photos Include:</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Exterior storefront view</li>
                  <li>• Reception/waiting area</li>
                  <li>• Service stations/chairs</li>
                  <li>• Equipment and amenities</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Photography Tips:</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Use natural lighting</li>
                  <li>• Clean and organize space first</li>
                  <li>• Take photos during business hours</li>
                  <li>• Show different angles</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onPrevious}
              className="px-8 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 text-lg"
              disabled={photos.length < 3}
            >
              Continue to Your Story
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SalonPhotosSection;
