
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

const BoothPost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    boothType: "chair",
    images: [] as File[],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const fileArray = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...fileArray] }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to post a booth");
      navigate("/auth/signin");
      return;
    }
    
    if (!formData.title || !formData.description || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert price to numeric
      const priceNumeric = formData.price ? parseFloat(formData.price) : null;
      
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            user_id: user.id,
            title: formData.title,
            content: formData.description,
            location: formData.location,
            price: priceNumeric,
            post_type: "booth",
            metadata: { boothType: formData.boothType },
            status: "active"
          }
        ])
        .select();
      
      if (error) throw error;
      
      const postId = data?.[0]?.id;
      
      if (postId && formData.images.length > 0) {
        // Upload images
        for (let i = 0; i < formData.images.length; i++) {
          const file = formData.images[i];
          const fileExt = file.name.split(".").pop();
          const filePath = `posts/${postId}/${i}-${Date.now()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from("post_images")
            .upload(filePath, file);
          
          if (uploadError) {
            console.error("Error uploading image:", uploadError);
          }
        }
      }
      
      toast.success("Booth post created successfully!");
      navigate("/dashboard"); // Redirect to dashboard or listing page
      
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create booth post");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Post a Booth/Chair for Rent</CardTitle>
            <CardDescription>
              Share details about your available booth or chair rental
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Chair for Rent in Downtown Salon"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="boothType">Rental Type</Label>
                <Select
                  value={formData.boothType}
                  onValueChange={(value) => handleSelectChange("boothType", value)}
                >
                  <SelectTrigger id="boothType">
                    <SelectValue placeholder="Select rental type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="chair">Chair</SelectItem>
                      <SelectItem value="booth">Booth/Station</SelectItem>
                      <SelectItem value="room">Private Room</SelectItem>
                      <SelectItem value="space">Retail Space</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. Los Angeles, CA"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Monthly Rent (USD)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="e.g. 500"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the booth, amenities, required skills, schedule availability, etc."
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="images">Upload Images (Optional)</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                <div className="text-xs text-muted-foreground">
                  You can upload multiple images to showcase your space
                </div>
                
                {formData.images.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index}`}
                          className="h-20 w-20 object-cover rounded border"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Posting..." : "Post Booth/Chair Rental"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BoothPost;
