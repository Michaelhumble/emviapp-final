import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Camera, Upload, Trash2, Edit, Eye, Filter, 
  Grid3X3, List, Star, Heart, Share2, 
  Download, Crop, Palette, X, Plus,
  Image as ImageIcon, Sparkles
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Photo {
  id: string;
  url: string;
  title: string;
  description?: string;
  category: string;
  tags: string[];
  likes: number;
  views: number;
  uploaded_at: string;
  featured: boolean;
}

interface SalonPhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  salonId?: string;
}

const SalonPhotoGalleryModal: React.FC<SalonPhotoGalleryModalProps> = ({ 
  isOpen, 
  onClose, 
  salonId 
}) => {
  const { userProfile } = useAuth();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock photos for demonstration
  React.useEffect(() => {
    if (isOpen) {
      setPhotos([
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
          title: 'French Manicure Perfection',
          description: 'Classic French manicure with gel polish',
          category: 'manicure',
          tags: ['french', 'gel', 'classic'],
          likes: 23,
          views: 156,
          uploaded_at: '2024-01-15',
          featured: true
        },
        {
          id: '2',
          url: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400',
          title: 'Nail Art Masterpiece',
          description: 'Intricate floral nail art design',
          category: 'nail-art',
          tags: ['floral', 'artistic', 'colorful'],
          likes: 45,
          views: 234,
          uploaded_at: '2024-01-12',
          featured: false
        },
        {
          id: '3',
          url: 'https://images.unsplash.com/photo-1609977121330-82217d2f1e62?w=400',
          title: 'Relaxing Pedicure',
          description: 'Spa pedicure treatment',
          category: 'pedicure',
          tags: ['spa', 'relaxing', 'treatment'],
          likes: 18,
          views: 98,
          uploaded_at: '2024-01-10',
          featured: false
        }
      ]);
    }
  }, [isOpen]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!userProfile?.id || acceptedFiles.length === 0) return;

    setUploading(true);
    try {
      for (const file of acceptedFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userProfile.id}_${Date.now()}.${fileExt}`;
        const filePath = `salon-gallery/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('salon-photos')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('salon-photos')
          .getPublicUrl(filePath);

        const newPhoto: Photo = {
          id: Date.now().toString(),
          url: data.publicUrl,
          title: file.name.replace(/\.[^/.]+$/, ""),
          description: '',
          category: 'uncategorized',
          tags: [],
          likes: 0,
          views: 0,
          uploaded_at: new Date().toISOString(),
          featured: false
        };

        setPhotos(prev => [newPhoto, ...prev]);
      }
      
      toast.success(`${acceptedFiles.length} photo(s) uploaded successfully!`);
    } catch (error) {
      console.error('Error uploading photos:', error);
      toast.error('Failed to upload photos');
    } finally {
      setUploading(false);
    }
  }, [userProfile?.id]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: true
  });

  const deletePhoto = (photoId: string) => {
    setPhotos(prev => prev.filter(p => p.id !== photoId));
    toast.success('Photo deleted successfully!');
  };

  const toggleFeatured = (photoId: string) => {
    setPhotos(prev => prev.map(p => 
      p.id === photoId ? { ...p, featured: !p.featured } : p
    ));
  };

  const updatePhotoDetails = (photo: Photo) => {
    setPhotos(prev => prev.map(p => p.id === photo.id ? photo : p));
    setEditingPhoto(null);
    toast.success('Photo updated successfully!');
  };

  const filteredPhotos = photos.filter(photo => 
    filter === 'all' || photo.category === filter || (filter === 'featured' && photo.featured)
  );

  const categories = ['all', 'featured', 'manicure', 'pedicure', 'nail-art', 'spa', 'before-after'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <Camera className="h-6 w-6 text-purple-600" />
              Photo Gallery Manager
              <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                {photos.length} photos
              </Badge>
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
              </Button>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload Photos'}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-300 hover:border-purple-400'
            }`}
          >
            <input {...getInputProps()} />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length > 0) onDrop(files);
              }}
            />
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-purple-600 font-medium">Drop the photos here...</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">Drag & drop photos here, or click to select</p>
                <p className="text-sm text-gray-500">Support: JPG, PNG, GIF (max 5MB each)</p>
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
                className="whitespace-nowrap"
              >
                {category === 'all' && <ImageIcon className="h-4 w-4 mr-2" />}
                {category === 'featured' && <Star className="h-4 w-4 mr-2" />}
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </Button>
            ))}
          </div>

          {/* Photo Grid/List */}
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
              : "space-y-4"
          }>
            <AnimatePresence>
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  {viewMode === 'grid' ? (
                    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative">
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-full h-48 object-cover"
                          onClick={() => setSelectedPhoto(photo)}
                        />
                        {photo.featured && (
                          <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-white hover:bg-white/20"
                            onClick={() => setEditingPhoto(photo)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-white hover:bg-white/20"
                            onClick={() => deletePhoto(photo.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h4 className="font-semibold text-sm truncate">{photo.title}</h4>
                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {photo.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {photo.views}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => toggleFeatured(photo.id)}
                          >
                            <Star className={`h-3 w-3 ${photo.featured ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{photo.title}</h4>
                          <p className="text-sm text-gray-600">{photo.description}</p>
                          <div className="flex gap-1 mt-1">
                            {photo.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Camera className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">No Photos Found</h3>
              <p>Upload your first photos to get started!</p>
            </div>
          )}
        </div>

        {/* Photo Viewer Modal */}
        {selectedPhoto && (
          <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
            <DialogContent className="max-w-4xl">
              <div className="relative">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full max-h-[70vh] object-contain rounded-lg"
                />
                <Button
                  className="absolute top-2 right-2"
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedPhoto(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{selectedPhoto.title}</h3>
                <p className="text-gray-600 mb-4">{selectedPhoto.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {selectedPhoto.likes} likes
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {selectedPhoto.views} views
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Edit Photo Modal */}
        {editingPhoto && (
          <Dialog open={!!editingPhoto} onOpenChange={() => setEditingPhoto(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Photo Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={editingPhoto.title}
                    onChange={(e) => setEditingPhoto({...editingPhoto, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    value={editingPhoto.description || ''}
                    onChange={(e) => setEditingPhoto({...editingPhoto, description: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <select
                    value={editingPhoto.category}
                    onChange={(e) => setEditingPhoto({...editingPhoto, category: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="manicure">Manicure</option>
                    <option value="pedicure">Pedicure</option>
                    <option value="nail-art">Nail Art</option>
                    <option value="spa">Spa</option>
                    <option value="before-after">Before & After</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={() => updatePhotoDetails(editingPhoto)}
                    className="flex-1"
                  >
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setEditingPhoto(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SalonPhotoGalleryModal;