
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Upload, Building, MapPin, Globe, AtSign, Phone, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';
import { SalonProfile } from '@/types/profile';

type SalonFormValues = {
  salon_name: string;
  location: string;
  about: string | null;
  website: string | null;
  instagram: string | null;
  phone: string | null;
};

const SalonProfileEditor = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [salonPhotos, setSalonPhotos] = useState<Array<{ id: string; url: string; caption: string | null }>>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<SalonFormValues>({
    defaultValues: {
      salon_name: '',
      location: '',
      about: '',
      website: '',
      instagram: '',
      phone: ''
    }
  });

  // Load existing salon data
  useEffect(() => {
    const loadSalonProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('salons')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        if (data) {
          setValue('salon_name', data.salon_name || '');
          setValue('location', data.location || '');
          setValue('about', data.about || '');
          setValue('website', data.website || '');
          setValue('instagram', data.instagram || '');
          setValue('phone', data.phone || '');
          
          if (data.logo_url) {
            setLogoPreview(data.logo_url);
          }
        }
        
        // Load salon photos
        const { data: photosData, error: photosError } = await supabase
          .from('salon_photos')
          .select('*')
          .eq('salon_id', user.id)
          .order('order_number', { ascending: true });
          
        if (photosError) throw photosError;
        
        if (photosData) {
          setSalonPhotos(photosData.map(photo => ({
            id: photo.id,
            url: photo.photo_url,
            caption: photo.caption
          })));
        }
      } catch (error) {
        console.error('Error loading salon profile:', error);
        toast.error('Failed to load salon profile.');
      }
    };
    
    loadSalonProfile();
  }, [user, setValue]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setLogoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const uploadLogo = async () => {
    if (!logoFile || !user) return null;
    
    const fileExt = logoFile.name.split('.').pop();
    const filePath = `${user.id}-${Date.now()}.${fileExt}`;
    
    try {
      const { error: uploadError } = await supabase.storage
        .from('salon_photos')
        .upload(filePath, logoFile);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage
        .from('salon_photos')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error('Failed to upload logo.');
      return null;
    }
  };

  const onSubmit = async (data: SalonFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Upload logo if selected
      let logoUrl = null;
      if (logoFile) {
        logoUrl = await uploadLogo();
      }
      
      // Prepare salon data
      const salonData: any = {
        ...data,
        updated_at: new Date().toISOString()
      };
      
      // Only add logo_url if we have a new one
      if (logoUrl) {
        salonData.logo_url = logoUrl;
      }
      
      // Check if salon profile exists
      const { data: existingSalon } = await supabase
        .from('salons')
        .select('id')
        .eq('id', user.id)
        .single();
      
      let error;
      
      if (existingSalon) {
        // Update existing profile
        const { error: updateError } = await supabase
          .from('salons')
          .update(salonData)
          .eq('id', user.id);
          
        error = updateError;
      } else {
        // Insert new profile with user ID
        const { error: insertError } = await supabase
          .from('salons')
          .insert({
            id: user.id,
            ...salonData
          });
          
        error = insertError;
      }
      
      if (error) throw error;
      
      toast.success('Salon profile updated successfully!');
      
      // Refresh user profile data in context
      if (refreshUserProfile) {
        await refreshUserProfile();
      }
      
    } catch (error) {
      console.error('Error saving salon profile:', error);
      toast.error('Failed to update salon profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !user) return;
    
    setIsUploading(true);
    
    try {
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `salon-photo-${Date.now()}.${fileExt}`;
      
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('salon_photos')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data } = supabase.storage
        .from('salon_photos')
        .getPublicUrl(filePath);
      
      // Save to database
      const { data: photoData, error: insertError } = await supabase
        .from('salon_photos')
        .insert({
          salon_id: user.id,
          photo_url: data.publicUrl,
          order_number: salonPhotos.length + 1
        })
        .select()
        .single();
        
      if (insertError) throw insertError;
      
      // Update local state
      if (photoData) {
        setSalonPhotos([...salonPhotos, {
          id: photoData.id,
          url: photoData.photo_url,
          caption: photoData.caption
        }]);
      }
      
      toast.success('Photo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload photo.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('salon_photos')
        .delete()
        .eq('id', photoId)
        .eq('salon_id', user.id);
        
      if (error) throw error;
      
      // Update local state
      setSalonPhotos(salonPhotos.filter(photo => photo.id !== photoId));
      
      toast.success('Photo deleted successfully!');
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast.error('Failed to delete photo.');
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="profile">Profile Info</TabsTrigger>
          <TabsTrigger value="photos">Salon Photos</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Logo upload section */}
                <div className="flex flex-col items-center mb-8">
                  <div className="mb-4">
                    <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                      {logoPreview ? (
                        <img 
                          src={logoPreview} 
                          alt="Salon logo" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Building className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div>
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                    <Label
                      htmlFor="logo"
                      className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {logoPreview ? 'Change Logo' : 'Upload Logo'}
                    </Label>
                  </div>
                </div>
                
                {/* Salon details form */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="salon_name" className="text-base">
                      <Building className="w-4 h-4 inline-block mr-2" />
                      Salon Name
                    </Label>
                    <Input
                      id="salon_name"
                      placeholder="Enter your salon name"
                      {...register('salon_name', { required: 'Salon name is required' })}
                    />
                    {errors.salon_name && (
                      <p className="text-sm text-red-500">{errors.salon_name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-base">
                      <MapPin className="w-4 h-4 inline-block mr-2" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="City, State"
                      {...register('location', { required: 'Location is required' })}
                    />
                    {errors.location && (
                      <p className="text-sm text-red-500">{errors.location.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base">
                      <Phone className="w-4 h-4 inline-block mr-2" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="(555) 555-5555"
                      {...register('phone')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-base">
                      <Globe className="w-4 h-4 inline-block mr-2" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      placeholder="https://www.yoursalon.com"
                      {...register('website')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="text-base">
                      <AtSign className="w-4 h-4 inline-block mr-2" />
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      placeholder="@yoursalon"
                      {...register('instagram')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="about" className="text-base">
                      About Your Salon
                    </Label>
                    <Textarea
                      id="about"
                      placeholder="Tell potential employees about your salon..."
                      rows={5}
                      {...register('about')}
                    />
                  </div>
                  
                  <Button type="submit" disabled={isLoading} className="mt-6">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Profile'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="photos">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex flex-col items-center mb-6">
                  <h3 className="text-lg font-medium mb-2">Salon Photos</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Upload photos of your salon to attract potential employees
                  </p>
                  
                  <div>
                    <Input
                      id="salon-photos"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                    <Label
                      htmlFor="salon-photos"
                      className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <ImagePlus className="mr-2 h-4 w-4" />
                          Add Salon Photo
                        </>
                      )}
                    </Label>
                  </div>
                </div>
                
                {/* Photo gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {salonPhotos.map(photo => (
                    <div key={photo.id} className="relative overflow-hidden rounded-lg aspect-[4/3]">
                      <img 
                        src={photo.url} 
                        alt={photo.caption || 'Salon photo'} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeletePhoto(photo.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {salonPhotos.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">No photos uploaded yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Services Coming Soon</h3>
                <p className="text-muted-foreground">
                  You'll soon be able to list all services your salon offers
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalonProfileEditor;
