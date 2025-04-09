
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Building2, MapPin, Clock, Phone, Mail } from "lucide-react";

const SalonOwnerProfileForm = () => {
  const { userProfile, user, refreshUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    business_name: userProfile?.business_name || "",
    address: userProfile?.address || "",
    city: userProfile?.city || "",
    state: userProfile?.state || "",
    zip: userProfile?.zip || "",
    phone: userProfile?.phone || "",
    website: userProfile?.website || "",
    hours: userProfile?.hours || "",
    description: userProfile?.description || "",
    business_type: userProfile?.business_type || "salon",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      
      toast.success("Salon profile updated successfully!");
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
        <h2 className="text-xl font-bold mb-4">Salon Business Profile</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="business_name" className="font-medium">Salon Name</Label>
            <div className="flex">
              <div className="bg-blue-50 p-2 rounded-l border border-r-0 border-gray-200">
                <Building2 className="text-blue-500 h-5 w-5" />
              </div>
              <Input
                id="business_name"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                placeholder="Your salon name"
                className="rounded-l-none"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="font-medium">Address</Label>
              <div className="flex">
                <div className="bg-blue-50 p-2 rounded-l border border-r-0 border-gray-200">
                  <MapPin className="text-blue-500 h-5 w-5" />
                </div>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street address"
                  className="rounded-l-none"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="city" className="font-medium">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state" className="font-medium">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-medium">Phone</Label>
              <div className="flex">
                <div className="bg-blue-50 p-2 rounded-l border border-r-0 border-gray-200">
                  <Phone className="text-blue-500 h-5 w-5" />
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
            
            <div className="space-y-2">
              <Label htmlFor="website" className="font-medium">Website</Label>
              <div className="flex">
                <div className="bg-blue-50 p-2 rounded-l border border-r-0 border-gray-200">
                  <Mail className="text-blue-500 h-5 w-5" />
                </div>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Your website or social media"
                  className="rounded-l-none"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hours" className="font-medium">Business Hours</Label>
            <div className="flex">
              <div className="bg-blue-50 p-2 rounded-l border border-r-0 border-gray-200">
                <Clock className="text-blue-500 h-5 w-5" />
              </div>
              <Input
                id="hours"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                placeholder="e.g., Mon-Fri 9am-7pm, Sat 10am-6pm"
                className="rounded-l-none"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="font-medium">About Your Salon</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell potential artists about your salon..."
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="business_type" className="font-medium">Business Type</Label>
            <select
              id="business_type"
              name="business_type"
              value={formData.business_type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="salon">Full Service Salon</option>
              <option value="nail_salon">Nail Salon</option>
              <option value="hair_salon">Hair Salon</option>
              <option value="spa">Spa</option>
              <option value="barbershop">Barbershop</option>
              <option value="booth_rental">Booth Rental</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SalonOwnerProfileForm;
