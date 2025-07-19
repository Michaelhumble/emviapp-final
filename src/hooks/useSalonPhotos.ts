import { useState, useEffect } from 'react';
import { supabaseBypass } from '@/types/supabase-bypass';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useSalon } from '@/context/salon';
import { toast } from 'sonner';

export interface SalonPhoto {
  id: string;
  salon_id: string;
  photo_url: string;
  title?: string;
  is_primary: boolean;
  order_number?: number;
  created_at: string;
}

export const useSalonPhotos = () => {
  const [photos, setPhotos] = useState<SalonPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { uploadImage, isUploading } = useImageUpload();
  const { currentSalon } = useSalon();

  // Fetch photos
  const fetchPhotos = async () => {
    if (!currentSalon?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabaseBypass
        .from('salon_photos')
        .select('*')
        .eq('salon_id' as any, currentSalon.id)
        .order('order_number' as any, { ascending: true });

      if (error) throw error;
      setPhotos((data as any) || []);
    } catch (err) {
      console.error('Error fetching salon photos:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch photos'));
    } finally {
      setLoading(false);
    }
  };

  // Upload new photo
  const uploadPhoto = async (file: File, title?: string) => {
    if (!currentSalon?.id) {
      toast.error('No salon selected');
      return false;
    }

    try {
      const photoUrl = await uploadImage(file);
      if (!photoUrl) {
        toast.error('Failed to upload image');
        return false;
      }

      const { error } = await supabaseBypass
        .from('salon_photos')
        .insert({
          salon_id: currentSalon.id,
          photo_url: photoUrl,
          title: title || file.name,
          is_primary: photos.length === 0, // First photo is primary
          order_number: photos.length
        } as any);

      if (error) throw error;
      
      await fetchPhotos(); // Refresh the list
      toast.success('Photo uploaded successfully!');
      return true;
    } catch (err) {
      console.error('Error uploading photo:', err);
      toast.error('Failed to upload photo');
      return false;
    }
  };

  // Delete photo
  const deletePhoto = async (photoId: string) => {
    try {
      const { error } = await supabaseBypass
        .from('salon_photos')
        .delete()
        .eq('id' as any, photoId);

      if (error) throw error;
      
      await fetchPhotos(); // Refresh the list
      toast.success('Photo deleted successfully');
      return true;
    } catch (err) {
      console.error('Error deleting photo:', err);
      toast.error('Failed to delete photo');
      return false;
    }
  };

  // Set primary photo
  const setPrimaryPhoto = async (photoId: string) => {
    if (!currentSalon?.id) return false;

    try {
      // First, unset all primary photos
      await supabaseBypass
        .from('salon_photos')
        .update({ is_primary: false } as any)
        .eq('salon_id' as any, currentSalon.id);

      // Then set the selected photo as primary
      const { error } = await supabaseBypass
        .from('salon_photos')
        .update({ is_primary: true } as any)
        .eq('id' as any, photoId);

      if (error) throw error;
      
      await fetchPhotos(); // Refresh the list
      toast.success('Primary photo updated');
      return true;
    } catch (err) {
      console.error('Error setting primary photo:', err);
      toast.error('Failed to update primary photo');
      return false;
    }
  };

  // Reorder photos
  const reorderPhotos = async (photoId: string, direction: 'up' | 'down') => {
    const currentIndex = photos.findIndex(p => p.id === photoId);
    if (currentIndex === -1) return false;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= photos.length) return false;

    try {
      // Update order numbers
      const updates = [
        {
          id: photos[currentIndex].id,
          order_number: newIndex
        },
        {
          id: photos[newIndex].id,
          order_number: currentIndex
        }
      ];

      for (const update of updates) {
        const { error } = await supabaseBypass
          .from('salon_photos')
          .update({ order_number: update.order_number } as any)
          .eq('id' as any, update.id);

        if (error) throw error;
      }
      
      await fetchPhotos(); // Refresh the list
      toast.success('Photo order updated!');
      return true;
    } catch (err) {
      console.error('Error reordering photos:', err);
      toast.error('Failed to update photo order');
      return false;
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [currentSalon?.id]);

  return {
    photos,
    loading,
    error,
    isUploading,
    uploadPhoto,
    deletePhoto,
    setPrimaryPhoto,
    reorderPhotos,
    refetch: fetchPhotos
  };
};