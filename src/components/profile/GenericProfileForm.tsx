
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { User, MapPin, Phone, Mail, Calendar } from "lucide-react";

const GenericProfileForm = () => {
  const { userProfile, user, refreshUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: userProfile?.full_name || "",
    location: userProfile?.location || "",
    phone: userProfile?.phone || "",
    email: userProfile?.email || user?.email || "",
    bio: userProfile?.bio || "",
    specialty: userProfile?.specialty || "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('users')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast.success("Profile updated successfully!");
      if (refreshUserProfile) await refreshUserProfile();
      
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name" className="font-medium">Full Name</Label>
            <div className="flex">
              <div className="bg-gray-100 p-2 rounded-l border border-r-0 border-gray-200">
                <User className="text-gray-500 h-5 w-5" />
              </div>
              <Input
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Your name"
                className="rounded-l-none"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="font-medium">Location</Label>
              <div className="flex">
                <div className="bg-gray-100 p-2 rounded-l border border-r-0 border-gray-200">
                  <MapPin className="text-gray-500 h-5 w-5" />
                </div>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State"
                  className="rounded-l-none"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-medium">Phone</Label>
              <div className="flex">
                <div className="bg-gray-100 p-2 rounded-l border border-r-0 border-gray-200">
                  <Phone className="text-gray-500 h-5 w-5" />
                </div>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Contact phone"
                  className="rounded-l-none"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium">Email</Label>
            <div className="flex">
              <div className="bg-gray-100 p-2 rounded-l border border-r-0 border-gray-200">
                <Mail className="text-gray-500 h-5 w-5" />
              </div>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className="rounded-l-none"
                disabled
              />
            </div>
            <p className="text-xs text-gray-500">Email cannot be changed. Contact support if needed.</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specialty" className="font-medium">Specialty</Label>
            <div className="flex">
              <div className="bg-gray-100 p-2 rounded-l border border-r-0 border-gray-200">
                <Calendar className="text-gray-500 h-5 w-5" />
              </div>
              <Input
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                placeholder="Your area of expertise"
                className="rounded-l-none"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio" className="font-medium">Biography</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="A little about yourself..."
              rows={4}
            />
          </div>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GenericProfileForm;
