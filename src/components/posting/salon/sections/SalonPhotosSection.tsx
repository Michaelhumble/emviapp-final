
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Play, Star, TrendingUp, Eye } from "lucide-react";
import { motion } from "framer-motion";
import PhotoUploader from "@/components/posting/PhotoUploader";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonPhotosSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
}

const SalonPhotosSection = ({ form, photoUploads, setPhotoUploads }: SalonPhotosSectionProps) => {
  const handlePhotoChange = (files: File[]) => {
    setPhotoUploads(files);
  };

  return (
    <div className="space-y-8">
      {/* Success Statistics Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-emerald-800 text-lg">Photos = 5x More Buyers!</h3>
            <p className="text-emerald-700">Salons with photos sell 73% faster than those without</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/70 rounded-xl p-4">
            <div className="text-2xl font-bold text-emerald-600">87%</div>
            <div className="text-sm text-emerald-700">More Views</div>
          </div>
          <div className="bg-white/70 rounded-xl p-4">
            <div className="text-2xl font-bold text-emerald-600">5.2x</div>
            <div className="text-sm text-emerald-700">More Inquiries</div>
          </div>
          <div className="bg-white/70 rounded-xl p-4">
            <div className="text-2xl font-bold text-emerald-600">$12K</div>
            <div className="text-sm text-emerald-700">Higher Sale Price</div>
          </div>
        </div>
      </motion.div>

      {/* Photo Upload Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Camera className="h-6 w-6 text-purple-500" />
              Salon Photos
            </h3>
            <p className="text-gray-600 mt-1">Upload high-quality photos of your salon interior, exterior, and team</p>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            Up to 10 photos
          </Badge>
        </div>

        <PhotoUploader
          files={photoUploads}
          onChange={handlePhotoChange}
          maxFiles={10}
          accept="image/*"
          className="border-2 border-dashed border-purple-200 rounded-2xl p-8 bg-gradient-to-br from-purple-50 to-pink-50"
        />

        {/* Photo Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <Star className="h-5 w-5 text-blue-500" />
              <h4 className="font-semibold text-blue-800">Must-Have Photos</h4>
            </div>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Salon entrance & storefront</li>
              <li>• Main working area</li>
              <li>• Reception & waiting area</li>
              <li>• Equipment & stations</li>
              <li>• Team at work (optional)</li>
            </ul>
          </div>

          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-5 w-5 text-amber-500" />
              <h4 className="font-semibold text-amber-800">Pro Photography Tips</h4>
            </div>
            <ul className="space-y-2 text-sm text-amber-700">
              <li>• Use natural lighting when possible</li>
              <li>• Keep spaces clean and organized</li>
              <li>• Show off your best work</li>
              <li>• Include before/after shots</li>
              <li>• Highlight unique features</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cover Photo Selection */}
      {photoUploads.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="coverPhotoIndex"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Choose Your Cover Photo</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {photoUploads.map((file, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                        field.value === index ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200'
                      }`}
                      onClick={() => field.onChange(index)}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                      {field.value === index && (
                        <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                          <Badge className="bg-purple-500">Cover</Badge>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
      )}

      {/* Video Upload Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Play className="h-6 w-6 text-pink-500" />
          <div>
            <h3 className="text-lg font-semibold">Video Walkthrough (Optional)</h3>
            <p className="text-gray-600">Add a video tour to showcase your salon's atmosphere</p>
          </div>
          <Badge variant="outline" className="ml-auto border-pink-200 text-pink-600">
            +40% More Interest
          </Badge>
        </div>

        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Paste YouTube or Vimeo URL here..."
                  className="h-12 border-2 focus:border-pink-500"
                  {...field}
                />
              </FormControl>
              <p className="text-sm text-gray-500">
                💡 Video tours increase buyer engagement by 40% and build trust
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Success Story */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6"
      >
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">✨</span>
          </div>
          <div>
            <h4 className="font-semibold text-purple-800 mb-2">Success Story</h4>
            <p className="text-purple-700 text-sm leading-relaxed italic">
              "I uploaded 8 professional photos and a 2-minute walkthrough video. Within 3 days, I had 12 serious inquiries 
              and sold for $15K above my asking price! The visual presentation made all the difference."
            </p>
            <p className="text-purple-600 text-xs mt-2 font-medium">- Sarah M., Nail Salon Owner, Los Angeles</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SalonPhotosSection;
