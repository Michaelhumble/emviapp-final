import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/context/auth';
import { usePortfolio } from '@/hooks/use-portfolio';
import UniversalPortfolioUploader from '@/components/portfolio/UniversalPortfolioUploader';
import { 
  Camera, 
  Upload, 
  Heart, 
  Eye, 
  Share2, 
  Star, 
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Tag,
  Award,
  Instagram
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { useDropzone } from 'react-dropzone';
import MobilePortfolioNav from '../components/MobilePortfolioNav';

const ArtistInstagramPortfolio = () => {
  const { userProfile } = useAuth();
  const { portfolioItems, uploadMultipleImages, deletePortfolioImage, isLoading, refreshPortfolio } = usePortfolio();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showUploader, setShowUploader] = useState(false);

  // Mock engagement data - replace with real data
  const mockEngagement = portfolioItems?.map((item, index) => ({
    ...item,
    likes: Math.floor(Math.random() * 100) + 20,
    views: Math.floor(Math.random() * 500) + 100,
    featured: index < 2
  })) || [];

  const handleUploadComplete = async (urls: string[]) => {
    try {
      await uploadMultipleImages(urls);
      await refreshPortfolio();
      setShowUploader(false);
    } catch (error) {
      console.error('Error completing upload:', error);
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const newIndex = direction === 'next' 
      ? (selectedImage + 1) % mockEngagement.length
      : (selectedImage - 1 + mockEngagement.length) % mockEngagement.length;
    
    setSelectedImage(newIndex);
  };

  const handleShare = async (item: any) => {
    const shareData = {
      title: `Check out this amazing work: ${item.title}`,
      text: `Beautiful nail art by a talented artist! 💅✨`,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(`${shareData.title} - ${shareData.url}`);
        // You could show a toast here
        console.log('Link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy link', error);
      }
    }
  };

  const EmptyState = () => (
    <motion.div 
      className="col-span-full text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative mb-8">
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
          <Camera className="w-16 h-16 text-purple-400" />
        </div>
        <motion.div
          className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Star className="w-4 h-4 text-white fill-current" />
        </motion.div>
      </div>
      
      <h3 className="text-2xl font-playfair font-bold mb-4">Ready to Showcase Your Art?</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Upload your first masterpiece and start building your portfolio that attracts clients
      </p>
      
      <Button 
        size="lg" 
        className="btn-luxury bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4"
        onClick={() => setShowUploader(true)}
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Your First Masterpiece
      </Button>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Mobile Navigation */}
      <MobilePortfolioNav 
        onBack={() => {
          const overviewTab = document.querySelector('[value="overview"]') as HTMLElement;
          overviewTab?.click();
        }}
        onUpload={() => (document.querySelector('[data-upload-trigger]') as HTMLElement)?.click()}
        onShare={() => toast.info("Share functionality available in overview tab")}
      />
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-playfair font-bold mb-2">Portfolio Gallery</h2>
          <p className="text-gray-600">Instagram-level showcase of your best work</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              // Import from Instagram placeholder - show info toast
              toast.info("Instagram import coming soon! For now, upload your best photos manually.");
            }}
          >
            <Instagram className="w-4 h-4" />
            Import from IG
          </Button>
          
          <Button 
            className="btn-luxury bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            data-upload-trigger
            onClick={() => setShowUploader(true)}
          >
            <Upload className="w-4 w-4 mr-2" />
            Upload Photos
          </Button>
        </div>
      </div>

      {/* Universal Portfolio Uploader Modal */}
      <AnimatePresence>
        {showUploader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowUploader(false);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <UniversalPortfolioUploader
                onUploadComplete={handleUploadComplete}
                onClose={() => setShowUploader(false)}
                existingCount={mockEngagement.length}
                maxFiles={12}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portfolio Grid */}
      {mockEngagement.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockEngagement.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer card-luxury"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white font-semibold mb-2 truncate">{item.title}</h4>
                  <div className="flex items-center justify-between text-white/80 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {item.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {item.views}
                      </span>
                    </div>
                    <Share2 
                      className="w-4 h-4 hover:text-white transition-colors cursor-pointer" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(item);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Featured Badge */}
              {item.featured && (
                <motion.div
                  className="absolute top-3 left-3"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                    <Award className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </motion.div>
              )}

              {/* Delete Button */}
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-3 right-3 w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  deletePortfolioImage(item.id);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Image Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0">
          {selectedImage !== null && mockEngagement[selectedImage] && (
            <div className="relative">
              <img
                src={mockEngagement[selectedImage].image_url}
                alt={mockEngagement[selectedImage].title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              {/* Navigation */}
              <Button
                size="sm"
                variant="ghost"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={() => navigateImage('next')}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
              
              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {mockEngagement[selectedImage].title}
                </h3>
                <div className="flex items-center justify-between text-white/80">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {mockEngagement[selectedImage].likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {mockEngagement[selectedImage].views}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(mockEngagement[selectedImage]);
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtistInstagramPortfolio;