
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Upload, ShoppingBag, Globe, Instagram, TikTok } from "lucide-react";

const productCategories = [
  "Nail Products",
  "Hair Products",
  "Makeup Products",
  "Skincare Products",
  "Salon Equipment",
  "Salon Furniture",
  "Barber Supplies",
  "Tattoo Supplies",
  "Lash & Brow Products",
  "Other"
];

const SupplierSetup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [companyName, setCompanyName] = useState("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [facebook, setFacebook] = useState("");
  const [bio, setBio] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  
  if (!user) {
    navigate('/auth/signin');
    return null;
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
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

  const handleProductImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5); // Max 5 images
      setProductImages(filesArray);
      
      // Create previews for all images
      const previewUrls: string[] = [];
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previewUrls.push(reader.result as string);
          setImagePreviewUrls([...previewUrls]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!user) {
      toast.error("You must be logged in to complete your profile");
      setIsSubmitting(false);
      return;
    }
    
    try {
      let logoUrl = null;
      const productImageUrls: string[] = [];
      
      // Upload logo if selected
      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `supplier-${user.id}-logo-${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('avatars')
          .upload(fileName, logoFile);
        
        if (uploadError) throw uploadError;
        
        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName);
          
          logoUrl = publicUrl;
        }
      }
      
      // Upload product images
      for (let i = 0; i < productImages.length; i++) {
        const file = productImages[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `supplier-${user.id}-product-${i}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('products')
          .upload(fileName, file);
        
        if (uploadError) continue; // Skip this file on error
        
        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(fileName);
          
          productImageUrls.push(publicUrl);
        }
      }
      
      // Update user profile
      const { error } = await supabase
        .from('users')
        .update({
          company_name: companyName,
          product_category: productCategory,
          website: websiteUrl,
          instagram,
          tiktok,
          facebook,
          bio,
          avatar_url: logoUrl,
          product_images: productImageUrls,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast.success("Supplier profile setup complete!");
      navigate('/dashboard/supplier');
    } catch (error) {
      console.error("Error setting up profile:", error);
      toast.error("Failed to set up your supplier profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        <Card className="border border-border/50 shadow-md bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-3xl font-serif">Complete Your Supplier Profile</CardTitle>
            <CardDescription>
              Help beauty professionals discover your products
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Logo Upload */}
              <div className="flex flex-col items-center space-y-4">
                <div className="h-32 w-32 rounded-md border-2 border-primary flex items-center justify-center overflow-hidden bg-muted">
                  {logoPreview ? (
                    <img 
                      src={logoPreview} 
                      alt="Company logo preview" 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                  )}
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
                    className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Upload Company Logo
                  </Label>
                </div>
              </div>
              
              {/* Basic Info */}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input 
                    id="companyName" 
                    placeholder="Your company name" 
                    value={companyName} 
                    onChange={(e) => setCompanyName(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="productCategory">What do you sell?</Label>
                  <Select 
                    value={productCategory} 
                    onValueChange={setProductCategory}
                    required
                  >
                    <SelectTrigger id="productCategory">
                      <SelectValue placeholder="Select product category" />
                    </SelectTrigger>
                    <SelectContent>
                      {productCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="websiteUrl" className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" /> Website / Shop URL
                  </Label>
                  <Input 
                    id="websiteUrl" 
                    placeholder="https://yourwebsite.com" 
                    value={websiteUrl} 
                    onChange={(e) => setWebsiteUrl(e.target.value)} 
                  />
                </div>
                
                <div className="grid gap-4">
                  <Label>Social Media (optional)</Label>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Instagram className="h-5 w-5 mr-2 text-primary" />
                      <Input
                        id="instagram"
                        placeholder="Instagram username (without @)"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <TikTok className="h-5 w-5 mr-2 text-primary" />
                      <Input
                        id="tiktok"
                        placeholder="TikTok username"
                        value={tiktok}
                        onChange={(e) => setTiktok(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-primary mr-2 font-semibold">f</span>
                      <Input
                        id="facebook"
                        placeholder="Facebook page URL or name"
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="bio">Short Brand Description</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell beauty professionals about your products and what makes them special" 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    rows={3}
                    required
                  />
                </div>
              </div>
              
              {/* Product Images */}
              <div className="space-y-3">
                <Label htmlFor="productImages" className="block">
                  Upload Product Images (up to 5)
                </Label>
                <div className="grid grid-cols-5 gap-2">
                  {imagePreviewUrls.map((url, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-md border border-border overflow-hidden bg-muted"
                    >
                      <img 
                        src={url} 
                        alt={`Product ${index + 1}`} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ))}
                  {Array.from({ length: 5 - imagePreviewUrls.length }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="aspect-square rounded-md border border-dashed border-border bg-muted flex items-center justify-center"
                    >
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <Input
                    id="productImages"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleProductImagesChange}
                    className="hidden"
                  />
                  <Label 
                    htmlFor="productImages" 
                    className="cursor-pointer inline-flex bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Select Images
                  </Label>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Saving Profile...
                  </>
                ) : (
                  "Complete Setup & Continue"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SupplierSetup;
