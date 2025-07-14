import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Image, Trash2, Edit, Move, Plus, ChevronUp, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

const SalonPhotoManager = () => {
  const [photos, setPhotos] = useState([
    {
      id: 1,
      url: '/api/placeholder/300/200',
      title: 'Main Reception Area',
      isPrimary: true
    },
    {
      id: 2,
      url: '/api/placeholder/300/200',
      title: 'Treatment Room 1',
      isPrimary: false
    },
    {
      id: 3,
      url: '/api/placeholder/300/200',
      title: 'Luxury Spa Suite',
      isPrimary: false
    }
  ]);

  const handleUpload = () => {
    toast.success("Photo uploaded successfully!", {
      description: "Your new salon photo is now visible to potential clients."
    });
  };

  const handleDelete = (photoId: number) => {
    setPhotos(photos.filter(p => p.id !== photoId));
    toast.success("Photo deleted successfully");
  };

  const handleSetPrimary = (photoId: number) => {
    setPhotos(photos.map(p => ({
      ...p,
      isPrimary: p.id === photoId
    })));
    toast.success("Primary photo updated");
  };

  const handleMovePhoto = (photoId: number, direction: 'up' | 'down') => {
    const currentIndex = photos.findIndex(p => p.id === photoId);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= photos.length) return;
    
    const newPhotos = [...photos];
    [newPhotos[currentIndex], newPhotos[newIndex]] = [newPhotos[newIndex], newPhotos[currentIndex]];
    
    setPhotos(newPhotos);
    toast.success("Photo order updated!");
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Salon Photo Gallery Manager
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload New Photos</h3>
            <p className="text-gray-500 mb-4">Drag and drop photos here, or click to browse</p>
            <Button onClick={handleUpload} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Photos
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Photo Gallery */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Current Gallery ({photos.length} photos)</span>
            <Badge variant="outline">{photos.filter(p => p.isPrimary).length} Primary</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-lg border border-gray-200">
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  
                  {/* Primary Badge */}
                  {photo.isPrimary && (
                    <Badge className="absolute top-2 left-2 bg-emerald-500 text-white">
                      Primary
                    </Badge>
                  )}
                  
                  {/* Action Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleSetPrimary(photo.id)}
                        className="text-xs"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => toast.info("Use the arrow buttons below the photo to reorder", {
                          description: "Click the up/down arrows under each photo to change the order"
                        })}
                        className="text-xs"
                      >
                        <Move className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDelete(photo.id)}
                        className="text-xs"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700">{photo.title}</p>
                  <div className="flex gap-2 mt-1 items-center justify-between">
                    <div className="flex gap-2">
                      {!photo.isPrimary && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleSetPrimary(photo.id)}
                          className="text-xs"
                        >
                          Set as Primary
                        </Button>
                      )}
                    </div>
                    
                    {/* Photo reorder controls */}
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleMovePhoto(photo.id, 'up')}
                        disabled={photos.findIndex(p => p.id === photo.id) === 0}
                        className="h-6 w-6 p-0"
                      >
                        <ChevronUp className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleMovePhoto(photo.id, 'down')}
                        disabled={photos.findIndex(p => p.id === photo.id) === photos.length - 1}
                        className="h-6 w-6 p-0"
                      >
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {photos.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Image className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No photos yet</p>
              <p className="text-sm">Upload your first salon photo to get started</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-800 mb-3">Photo Tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Use high-quality, well-lit photos of your salon spaces</li>
            <li>• Include your reception area, treatment rooms, and any special features</li>
            <li>• Set your best photo as the primary image - it appears first to clients</li>
            <li>• Update photos regularly to keep your listing fresh</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPhotoManager;