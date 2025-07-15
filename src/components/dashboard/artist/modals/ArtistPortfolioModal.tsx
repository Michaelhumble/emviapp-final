import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Camera, Upload, Save, Trash2, Edit, Plus, 
  Grid, List, Filter, Search, Star, Eye,
  Heart, Share2, Download, MoreHorizontal
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  tags: string[];
  likes_count: number;
  views_count: number;
  created_at: string;
  is_featured: boolean;
}

interface ArtistPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArtistPortfolioModal: React.FC<ArtistPortfolioModalProps> = ({ isOpen, onClose }) => {
  const { userProfile } = useAuth();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: 'nail-art',
    tags: [] as string[],
    is_featured: false
  });

  const [newTag, setNewTag] = useState('');

  const categories = [
    { value: 'all', label: 'All Work' },
    { value: 'nail-art', label: 'Nail Art' },
    { value: 'manicure', label: 'Manicure' },
    { value: 'pedicure', label: 'Pedicure' },
    { value: 'gel', label: 'Gel Nails' },
    { value: 'acrylic', label: 'Acrylic' },
    { value: 'extensions', label: 'Extensions' },
    { value: 'special-occasions', label: 'Special Occasions' }
  ];

  useEffect(() => {
    if (isOpen) {
      fetchPortfolioItems();
    }
  }, [isOpen]);

  const fetchPortfolioItems = async () => {
    if (!userProfile?.id) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('user_id', userProfile.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match our interface
      const items: PortfolioItem[] = data?.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image_url: item.image_url,
        category: 'nail-art', // Default category
        tags: [],
        likes_count: 0,
        views_count: 0,
        created_at: item.created_at,
        is_featured: false
      })) || [];

      setPortfolioItems(items);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      toast.error('Failed to load portfolio items');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadPromises = Array.from(files).map(async (file) => {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userProfile?.id}/portfolio/${Date.now()}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from('portfolio')
          .upload(fileName, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('portfolio')
          .getPublicUrl(fileName);

        return publicUrl;
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      
      // Create portfolio items for each uploaded image
      const newItems = uploadedUrls.map((url, index) => ({
        user_id: userProfile?.id,
        title: uploadForm.title || `Untitled ${portfolioItems.length + index + 1}`,
        description: uploadForm.description,
        image_url: url,
        order: portfolioItems.length + index
      }));

      const { data, error } = await supabase
        .from('portfolio_items')
        .insert(newItems)
        .select();

      if (error) throw error;

      toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
      setUploadForm({ title: '', description: '', category: 'nail-art', tags: [], is_featured: false });
      await fetchPortfolioItems();
    } catch (error) {
      console.error('Error saving portfolio items:', error);
      toast.error('Failed to save portfolio items');
    } finally {
      setUploading(false);
    }
  };

  const deletePortfolioItem = async (item: PortfolioItem) => {
    try {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', item.id);

      if (error) throw error;

      // Also delete from storage
      const fileName = item.image_url.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('portfolio')
          .remove([`${userProfile?.id}/portfolio/${fileName}`]);
      }

      setPortfolioItems(prev => prev.filter(p => p.id !== item.id));
      toast.success('Portfolio item deleted');
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      toast.error('Failed to delete item');
    }
  };

  const addTag = () => {
    if (newTag.trim() && !uploadForm.tags.includes(newTag.trim())) {
      setUploadForm(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setUploadForm(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const filteredItems = portfolioItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-6xl max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-labelledby="portfolio-modal-title"
      >
        <DialogHeader>
          <DialogTitle id="portfolio-modal-title" className="flex items-center gap-3 text-2xl">
            <Camera className="h-6 w-6 text-purple-600" />
            Portfolio Manager
            <Badge className="bg-purple-100 text-purple-800 border-purple-300">
              {portfolioItems.length} items
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="gallery" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search portfolio..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Portfolio Grid/List */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <span className="ml-3">Loading portfolio...</span>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Camera className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold mb-2">No Portfolio Items</h3>
                <p>Start building your portfolio by uploading your best work!</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 
                'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 
                'space-y-4'
              }>
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={viewMode === 'grid' ? 
                      'group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300' :
                      'group bg-white rounded-lg shadow-lg p-4 flex gap-4 hover:shadow-xl transition-all duration-300'
                    }
                  >
                    <div className={viewMode === 'grid' ? 'relative' : 'relative w-32 h-32 flex-shrink-0'}>
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className={viewMode === 'grid' ? 
                          'w-full h-48 object-cover' : 
                          'w-full h-full object-cover rounded-lg'
                        }
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="sm" className="bg-white/90 text-gray-800">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => deletePortfolioItem(item)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {item.is_featured && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-amber-500 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className={viewMode === 'grid' ? 'p-4' : 'flex-1'}>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      {item.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex gap-4">
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {item.likes_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {item.views_count}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Area */}
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Your Work</h3>
                  <p className="text-gray-600 mb-4">
                    Drag and drop images here, or click to select files
                  </p>
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    {uploading ? 'Uploading...' : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Images
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    JPG, PNG up to 10MB each
                  </p>
                </div>
              </div>

              {/* Upload Form */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="upload_title">Title</Label>
                  <Input
                    id="upload_title"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Give your work a title"
                  />
                </div>

                <div>
                  <Label htmlFor="upload_description">Description</Label>
                  <Textarea
                    id="upload_description"
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your technique, inspiration, or story behind this work..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="upload_category">Category</Label>
                  <select
                    id="upload_category"
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    {categories.slice(1).map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button onClick={addTag} disabled={!newTag.trim()}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {uploadForm.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <button onClick={() => removeTag(tag)}>
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={uploadForm.is_featured}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, is_featured: e.target.checked }))}
                  />
                  <Label htmlFor="is_featured">Feature this work</Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ArtistPortfolioModal;