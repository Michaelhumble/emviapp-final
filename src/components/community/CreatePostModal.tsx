import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image, Video, Smile, MapPin, AtSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<File[]>([]);

  const handleSubmit = async () => {
    if (!user || !content.trim()) return;

    setIsSubmitting(true);
    try {
      let imageUrls: string[] = [];

      // Upload images if any
      if (selectedMedia.length > 0) {
        for (const file of selectedMedia) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('community-images')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('community-images')
            .getPublicUrl(fileName);

          imageUrls.push(publicUrl);
        }
      }

      // Create post
      const { error } = await supabase
        .from('community_posts')
        .insert({
          content: content.trim(),
          user_id: user.id,
          image_urls: imageUrls,
          post_type: 'story'
        });

      if (error) throw error;

      toast.success('Post created successfully!');
      setContent('');
      setSelectedMedia([]);
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMediaSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedMedia(prev => [...prev, ...files].slice(0, 4)); // Max 4 images
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-end sm:items-center justify-center"
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
            className="w-full max-w-lg bg-gray-900 rounded-t-3xl sm:rounded-2xl border border-gray-700 max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </motion.button>
              <h2 className="text-white font-semibold text-lg">Create Post</h2>
              <Button
                onClick={handleSubmit}
                disabled={!content.trim() || isSubmitting}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium disabled:opacity-50"
              >
                {isSubmitting ? 'Posting...' : 'Share'}
              </Button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* User Profile */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">
                    {user?.email || 'Anonymous'}
                  </p>
                  <p className="text-gray-400 text-xs">Sharing with everyone</p>
                </div>
              </div>

              {/* Text Input */}
              <Textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-transparent border-none text-white placeholder-gray-400 text-lg resize-none min-h-[120px] focus:ring-0"
                autoFocus
              />

              {/* Media Preview */}
              {selectedMedia.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {selectedMedia.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="relative aspect-square rounded-lg overflow-hidden bg-gray-800"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Selected media"
                        className="w-full h-full object-cover"
                      />
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedMedia(prev => prev.filter((_, i) => i !== index))}
                        className="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white"
                      >
                        <X size={12} />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Media Options */}
              <div className="flex items-center justify-around p-4 bg-gray-800 rounded-xl">
                <label className="cursor-pointer">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col items-center space-y-1 text-green-400"
                  >
                    <Image size={24} />
                    <span className="text-xs">Photo</span>
                  </motion.div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMediaSelect}
                    className="hidden"
                  />
                </label>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center space-y-1 text-blue-400"
                >
                  <Video size={24} />
                  <span className="text-xs">Video</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center space-y-1 text-yellow-400"
                >
                  <Smile size={24} />
                  <span className="text-xs">Feeling</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center space-y-1 text-red-400"
                >
                  <MapPin size={24} />
                  <span className="text-xs">Location</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center space-y-1 text-purple-400"
                >
                  <AtSign size={24} />
                  <span className="text-xs">Tag</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};