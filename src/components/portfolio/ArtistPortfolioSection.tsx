
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Image as ImageIcon, Trash2, Pencil } from "lucide-react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

const ArtistPortfolioSection = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Query for portfolio items
  const { data: portfolioItems, isLoading } = useQuery({
    queryKey: ['portfolio', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });
  
  // Mutation for adding portfolio items
  const addPortfolioMutation = useMutation({
    mutationFn: async ({ file, title }: { file: File, title: string }) => {
      if (!user?.id) throw new Error("User not authenticated");
      setUploading(true);
      
      try {
        // 1. Upload the image to storage
        const fileExt = file.name.split('.').pop();
        const fileName = `portfolio_${user.id}_${Date.now()}.${fileExt}`;
        
        // Create portfolio bucket if it doesn't exist
        const { data: bucketExists } = await supabase.storage.getBucket('portfolio');
        
        if (!bucketExists) {
          await supabase.storage.createBucket('portfolio', {
            public: true
          });
        }
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('portfolio')
          .upload(fileName, file);
          
        if (uploadError) throw uploadError;
        
        // 2. Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('portfolio')
          .getPublicUrl(fileName);
        
        // 3. Insert record into portfolio_items table
        const { error: insertError } = await supabase
          .from('portfolio_items')
          .insert([
            { 
              user_id: user.id, 
              image_url: publicUrl,
              title: title || 'My work',
            }
          ]);
          
        if (insertError) throw insertError;
        
        // 4. Update portfolio_urls in user profile
        const updatedUrls = [...(userProfile?.portfolio_urls || []), publicUrl];
        
        const { error: updateError } = await supabase
          .from('users')
          .update({ portfolio_urls: updatedUrls })
          .eq('id', user.id);
          
        if (updateError) throw updateError;
        
        // 5. Refresh user profile
        await refreshUserProfile();
        
        return publicUrl;
      } finally {
        setUploading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio', user?.id] });
      toast.success("Portfolio item added successfully!");
      setIsDialogOpen(false);
      setUploadedFile(null);
      setImagePreview(null);
    },
    onError: (error) => {
      console.error("Error adding portfolio item:", error);
      toast.error("Failed to add portfolio item. Please try again.");
    }
  });
  
  // Mutation for deleting portfolio items
  const deletePortfolioMutation = useMutation({
    mutationFn: async (imageUrl: string) => {
      if (!user?.id) throw new Error("User not authenticated");
      
      // 1. Delete from portfolio_items table
      const { error: deleteError } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('image_url', imageUrl);
        
      if (deleteError) throw deleteError;
      
      // 2. Update portfolio_urls in user profile
      const updatedUrls = (userProfile?.portfolio_urls || []).filter(url => url !== imageUrl);
      
      const { error: updateError } = await supabase
        .from('users')
        .update({ portfolio_urls: updatedUrls })
        .eq('id', user.id);
        
      if (updateError) throw updateError;
      
      // 3. Delete file from storage (extract file name from URL)
      const fileName = imageUrl.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('portfolio')
          .remove([fileName]);
      }
      
      // 4. Refresh user profile
      await refreshUserProfile();
      
      return imageUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio', user?.id] });
      toast.success("Portfolio item deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting portfolio item:", error);
      toast.error("Failed to delete portfolio item. Please try again.");
    }
  });
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle portfolio submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadedFile) {
      toast.error("Please select an image to upload");
      return;
    }
    
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get('title') as string;
    
    addPortfolioMutation.mutate({ file: uploadedFile, title });
  };
  
  // Handle portfolio item deletion
  const handleDelete = (imageUrl: string) => {
    if (window.confirm("Are you sure you want to delete this portfolio item?")) {
      deletePortfolioMutation.mutate(imageUrl);
    }
  };
  
  // Get portfolio URLs from either the query result or user profile
  const getPortfolioUrls = () => {
    if (portfolioItems && portfolioItems.length > 0) {
      return portfolioItems.map(item => ({
        url: item.image_url,
        title: item.title || 'My work',
        id: item.id
      }));
    }
    
    if (userProfile?.portfolio_urls && userProfile.portfolio_urls.length > 0) {
      return userProfile.portfolio_urls.map((url, index) => ({
        url,
        title: `Portfolio Item ${index + 1}`,
        id: `profile-${index}`
      }));
    }
    
    return [];
  };
  
  const portfolioUrls = getPortfolioUrls();
  
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium">Your Portfolio</CardTitle>
          <CardDescription>Showcase your best work to potential clients</CardDescription>
        </div>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add Work
        </Button>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square animate-pulse bg-gray-100 rounded-md"></div>
            ))}
          </div>
        ) : portfolioUrls.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {portfolioUrls.map((item, index) => (
              <div key={item.id || index} className="group relative aspect-square rounded-md overflow-hidden">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button 
                    size="icon" 
                    variant="destructive"
                    className="h-8 w-8"
                    onClick={() => handleDelete(item.url)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <ImageIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Portfolio Items Yet</h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Add photos of your best work to showcase your skills to potential clients.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              Add Your First Portfolio Item
            </Button>
          </div>
        )}
      </CardContent>
      
      {/* Upload Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Portfolio Item</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center justify-center gap-4">
                {imagePreview ? (
                  <div className="relative w-full max-w-xs">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-64 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute bottom-2 right-2"
                      onClick={() => {
                        setUploadedFile(null);
                        setImagePreview(null);
                      }}
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Label
                      htmlFor="portfolio-image"
                      className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                    >
                      <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">
                        Click to upload an image
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        (JPEG, PNG, WebP)
                      </span>
                    </Label>
                    <Input
                      id="portfolio-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  name="title"
                  placeholder="e.g. French Tips with Art" 
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!uploadedFile || uploading}>
                {uploading ? "Uploading..." : "Add to Portfolio"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ArtistPortfolioSection;
