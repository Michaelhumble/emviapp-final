import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Loader2, Instagram, Facebook, Upload } from "lucide-react";

const SupplierSetup = () => {
  const [companyName, setCompanyName] = useState('');
  const [productType, setProductType] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [bio, setBio] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length > 5) {
        toast.error('You can only upload up to 5 images');
        return;
      }
      setImages(selectedFiles);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!user) {
        toast.error('You must be logged in to set up your profile');
        return;
      }

      const { error } = await supabase
        .from('users')
        .update({
          company_name: companyName,
          product_type: productType,
          website_url: websiteUrl,
          instagram_url: instagramUrl,
          facebook_url: facebookUrl,
          bio,
          profile_complete: true
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profile setup complete!');
      navigate('/dashboard/supplier');
    } catch (error: any) {
      toast.error(error.message || 'Error setting up profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Beauty Supplier Profile</CardTitle>
          <CardDescription>Tell us about your business and products</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input 
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your company name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="productType">What do you sell?</Label>
              <Select 
                value={productType} 
                onValueChange={setProductType}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
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
              <Label htmlFor="websiteUrl">Website / Shop URL</Label>
              <Input 
                id="websiteUrl"
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://yourstore.com"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instagramUrl" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram (optional)
                </Label>
                <Input 
                  id="instagramUrl"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  placeholder="@yourcompany"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="facebookUrl" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Facebook (optional)
                </Label>
                <Input 
                  id="facebookUrl"
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  placeholder="@yourcompany"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Short Brand Bio</Label>
              <Textarea 
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell potential clients about your products and company..."
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="images">Upload Product Image Samples (up to 5)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                <Input 
                  id="images" 
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <Label htmlFor="images" className="cursor-pointer flex flex-col items-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Click to upload up to 5 product images</span>
                  <span className="text-xs text-gray-400 mt-1">
                    {images.length > 0 ? `${images.length} image(s) selected` : 'No images selected'}
                  </span>
                </Label>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={() => navigate('/')}>Skip for now</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Complete Profile'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SupplierSetup;
