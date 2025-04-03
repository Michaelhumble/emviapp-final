
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtSign, Building, Camera, Globe, Loader2, MapPin, Package, User } from "lucide-react";

const ProfileEdit = () => {
  const { user, userRole, userProfile, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  // Common fields
  const [formData, setFormData] = useState({
    // Base fields
    full_name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    instagram: '',
    website: '',
    
    // Artist/Freelancer specific fields
    specialty: '',
    
    // Salon specific fields
    salon_name: '',
    salon_type: '',
    business_address: '',
    artist_count: '',
    is_hiring: false,
    
    // Supplier specific fields
    company_name: '',
    product_type: '',
    website_url: '',
  });
  
  useEffect(() => {
    if (!user) {
      navigate('/auth/signin');
      return;
    }
    
    if (userProfile) {
      // Populate form data from user profile
      setFormData(prevData => ({
        ...prevData,
        ...userProfile,
        // Ensure all expected fields are defined to avoid controlled/uncontrolled input warnings
        full_name: userProfile.full_name || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        location: userProfile.location || '',
        bio: userProfile.bio || '',
        instagram: userProfile.instagram || '',
        website: userProfile.website || '',
        specialty: userProfile.specialty || '',
        salon_name: userProfile.salon_name || '',
        salon_type: userProfile.salon_type || '',
        business_address: userProfile.business_address || '',
        artist_count: userProfile.artist_count || '',
        is_hiring: userProfile.is_hiring || false,
        company_name: userProfile.company_name || '',
        product_type: userProfile.product_type || '',
        website_url: userProfile.website_url || '',
      }));

      // Set avatar preview if available
      if (userProfile.avatar_url) {
        setAvatarPreview(userProfile.avatar_url);
      }
      
      setLoading(false);
    }
  }, [user, userProfile, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    
    try {
      let avatarUrl = userProfile?.avatar_url;
      
      // Upload avatar if selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile);
        
        if (uploadError) throw uploadError;
        
        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName);
          
          avatarUrl = publicUrl;
        }
      }
      
      // Update user profile based on role
      const updateData: Record<string, any> = { avatar_url: avatarUrl };
      
      if (userRole === 'artist' || userRole === 'nail technician/artist' || userRole === 'freelancer') {
        Object.assign(updateData, {
          full_name: formData.full_name,
          specialty: formData.specialty,
          location: formData.location,
          bio: formData.bio,
          instagram: formData.instagram,
          website: formData.website,
          phone: formData.phone
        });
      } else if (userRole === 'salon' || userRole === 'owner') {
        Object.assign(updateData, {
          salon_name: formData.salon_name,
          salon_type: formData.salon_type,
          business_address: formData.business_address,
          artist_count: formData.artist_count,
          is_hiring: formData.is_hiring,
          phone: formData.phone,
          website: formData.website
        });
      } else if (userRole === 'vendor' || userRole === 'supplier' || userRole === 'beauty supplier') {
        Object.assign(updateData, {
          company_name: formData.company_name,
          product_type: formData.product_type,
          website_url: formData.website_url,
          phone: formData.phone,
          location: formData.location
        });
      } else {
        // Customer or other role
        Object.assign(updateData, {
          full_name: formData.full_name,
          location: formData.location,
          phone: formData.phone
        });
      }
      
      // Update the profile
      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Refresh user profile data in context
      await refreshUserProfile();
      
      toast.success('Profile updated successfully!');
      
      // Redirect to appropriate dashboard
      const dashboardPath = getDashboardPath();
      navigate(dashboardPath);
      
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(`Failed to update profile: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };
  
  const getDashboardPath = () => {
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
        return '/dashboard/artist';
      case 'salon':
      case 'owner':
        return '/dashboard/owner';
      case 'freelancer':
        return '/dashboard/freelancer';
      case 'vendor':
      case 'supplier':
      case 'beauty supplier':
        return '/dashboard/supplier';
      default:
        return '/dashboard/customer';
    }
  };
  
  const renderArtistFields = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <div className="h-32 w-32 rounded-full border-2 border-primary flex items-center justify-center overflow-hidden bg-muted mb-4">
          {avatarPreview ? (
            <img 
              src={avatarPreview} 
              alt="Profile preview" 
              className="h-full w-full object-cover" 
            />
          ) : (
            <Camera className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        
        <div>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <Label 
            htmlFor="avatar" 
            className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium"
          >
            Upload Profile Photo
          </Label>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name *</Label>
          <Input 
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="specialty">Specialty *</Label>
          <Input 
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            placeholder="e.g. Hair Colorist, Nail Art"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <div className="flex items-center">
          <MapPin className="w-5 h-5 text-gray-400 mr-2" />
          <Input 
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, State"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bio">Professional Bio *</Label>
        <Textarea 
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell clients about your experience, style, and specialties"
          rows={4}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="instagram">Instagram</Label>
          <div className="flex items-center">
            <AtSign className="w-5 h-5 text-gray-400 mr-2" />
            <Input 
              id="instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="username (without @)"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <div className="flex items-center">
            <Globe className="w-5 h-5 text-gray-400 mr-2" />
            <Input 
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input 
          id="phone"
          name="phone"
          value={formData.phone || ''}
          onChange={handleChange}
          placeholder="Your contact number"
        />
      </div>
    </div>
  );
  
  const renderSalonFields = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <div className="h-32 w-32 rounded-lg border-2 border-primary flex items-center justify-center overflow-hidden bg-muted mb-4">
          {avatarPreview ? (
            <img 
              src={avatarPreview} 
              alt="Salon logo" 
              className="h-full w-full object-cover" 
            />
          ) : (
            <Building className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        
        <div>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <Label 
            htmlFor="avatar" 
            className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium"
          >
            Upload Salon Logo
          </Label>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="salon_name">Salon Name *</Label>
          <Input 
            id="salon_name"
            name="salon_name"
            value={formData.salon_name || ''}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="salon_type">Salon Type *</Label>
          <Select 
            value={formData.salon_type || ''} 
            onValueChange={(value) => handleSelectChange('salon_type', value)}
          >
            <SelectTrigger id="salon_type">
              <SelectValue placeholder="Select salon type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nail Salon">Nail Salon</SelectItem>
              <SelectItem value="Hair Salon">Hair Salon</SelectItem>
              <SelectItem value="Barbershop">Barbershop</SelectItem>
              <SelectItem value="Mixed Service Salon">Mixed Service Salon</SelectItem>
              <SelectItem value="Spa">Spa</SelectItem>
              <SelectItem value="Tattoo Shop">Tattoo Shop</SelectItem>
              <SelectItem value="Makeup Studio">Makeup Studio</SelectItem>
              <SelectItem value="Lash & Brow Bar">Lash & Brow Bar</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="business_address">Business Address *</Label>
        <div className="flex items-center">
          <MapPin className="w-5 h-5 text-gray-400 mr-2" />
          <Input 
            id="business_address"
            name="business_address"
            value={formData.business_address || ''}
            onChange={handleChange}
            placeholder="Full street address"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="artist_count">Number of Artists</Label>
          <Select 
            value={formData.artist_count || ''} 
            onValueChange={(value) => handleSelectChange('artist_count', value)}
          >
            <SelectTrigger id="artist_count">
              <SelectValue placeholder="Select number of artists" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3">1-3</SelectItem>
              <SelectItem value="4-6">4-6</SelectItem>
              <SelectItem value="7-10">7-10</SelectItem>
              <SelectItem value="11-15">11-15</SelectItem>
              <SelectItem value="16-20">16-20</SelectItem>
              <SelectItem value="21+">21+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Contact Phone</Label>
          <Input 
            id="phone"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            placeholder="Business phone number"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="website">Business Website</Label>
        <div className="flex items-center">
          <Globe className="w-5 h-5 text-gray-400 mr-2" />
          <Input 
            id="website"
            name="website"
            value={formData.website || ''}
            onChange={handleChange}
            placeholder="https://yoursalon.com"
          />
        </div>
      </div>
    </div>
  );
  
  const renderSupplierFields = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <div className="h-32 w-32 rounded-lg border-2 border-primary flex items-center justify-center overflow-hidden bg-muted mb-4">
          {avatarPreview ? (
            <img 
              src={avatarPreview} 
              alt="Company logo" 
              className="h-full w-full object-cover" 
            />
          ) : (
            <Package className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        
        <div>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <Label 
            htmlFor="avatar" 
            className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium"
          >
            Upload Company Logo
          </Label>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="company_name">Company Name *</Label>
        <Input 
          id="company_name"
          name="company_name"
          value={formData.company_name || ''}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="product_type">Product Type *</Label>
        <Select 
          value={formData.product_type || ''} 
          onValueChange={(value) => handleSelectChange('product_type', value)}
        >
          <SelectTrigger id="product_type">
            <SelectValue placeholder="What do you sell?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nail_supplies">Nail Supplies</SelectItem>
            <SelectItem value="hair_supplies">Hair Supplies</SelectItem>
            <SelectItem value="makeup">Makeup</SelectItem>
            <SelectItem value="skincare">Skincare</SelectItem>
            <SelectItem value="salon_furniture">Salon Furniture</SelectItem>
            <SelectItem value="tools">Professional Tools</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="website_url">Website / Shop URL *</Label>
        <div className="flex items-center">
          <Globe className="w-5 h-5 text-gray-400 mr-2" />
          <Input 
            id="website_url"
            name="website_url"
            value={formData.website_url || ''}
            onChange={handleChange}
            placeholder="https://yourstore.com"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Business Phone</Label>
          <Input 
            id="phone"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            placeholder="Contact number"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-gray-400 mr-2" />
            <Input 
              id="location"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              placeholder="City, State"
            />
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderCustomerFields = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <div className="h-32 w-32 rounded-full border-2 border-primary flex items-center justify-center overflow-hidden bg-muted mb-4">
          {avatarPreview ? (
            <img 
              src={avatarPreview} 
              alt="Profile preview" 
              className="h-full w-full object-cover" 
            />
          ) : (
            <User className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        
        <div>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <Label 
            htmlFor="avatar" 
            className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium"
          >
            Upload Profile Photo
          </Label>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="full_name">Full Name *</Label>
        <Input 
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            placeholder="Your contact number"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-gray-400 mr-2" />
            <Input 
              id="location"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              placeholder="City, State"
            />
          </div>
        </div>
      </div>
    </div>
  );
  
  // Determine which fields to show based on user role
  const renderRoleSpecificFields = () => {
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
      case 'freelancer':
        return renderArtistFields();
      case 'salon':
      case 'owner':
        return renderSalonFields();
      case 'vendor':
      case 'supplier':
      case 'beauty supplier':
        return renderSupplierFields();
      default:
        return renderCustomerFields();
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center h-96">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Edit Your Profile</CardTitle>
              <CardDescription>
                Complete your profile to get the most out of your EmviApp experience
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {renderRoleSpecificFields()}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(getDashboardPath())}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileEdit;
