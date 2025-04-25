
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const SalonProfileSetup = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [salonName, setSalonName] = useState("");
  const [location, setLocation] = useState("");
  const [salonType, setSalonType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [description, setDescription] = useState("");
  const [acceptsWalkIns, setAcceptsWalkIns] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userProfile) {
      // Use the correct field names with fallbacks
      setSalonName(userProfile.salon_name || "");
      setLocation(userProfile.location || "");
      setSalonType(userProfile.salon_type || "");
      setPhoneNumber(userProfile.phone || userProfile.phone_number || ""); // Prefer phone over phone_number
      setWebsiteUrl(userProfile.website || userProfile.website_url || ""); // Prefer website over website_url
      setInstagramUrl(userProfile.instagram || userProfile.instagram_url || ""); // Prefer instagram over instagram_url
      setDescription(userProfile.bio || userProfile.description || ""); // Prefer bio over description
      setAcceptsWalkIns(userProfile.accepts_walk_ins || userProfile.accepts_bookings || false); // Fallback to accepts_bookings
    }
  }, [userProfile]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (!salonName || !location || !salonType) {
      handleError("Salon Name, Location, and Salon Type are required.");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('users')
        .update({
          salon_name: salonName,
          location: location,
          salon_type: salonType,
          phone: phoneNumber, // Use standard field
          website: websiteUrl, // Use standard field
          instagram: instagramUrl, // Use standard field
          bio: description, // Use standard field
          accepts_bookings: acceptsWalkIns, // Use standard field
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (error) throw error;

      await refreshUserProfile();
      toast({
        title: "Success",
        description: "Salon profile updated successfully!"
      });
      navigate('/dashboard/salon');
    } catch (error: any) {
      console.error("Error updating salon profile:", error);
      handleError(error.message || "Failed to update salon profile.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update toast calls to use "error" instead of "destructive"
  const handleError = (message: string) => {
    toast({
      title: "Error",
      description: message,
      variant: "error" // Changed from "destructive"
    });
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Salon Profile Setup</CardTitle>
          <CardDescription>
            Complete your salon profile to attract more customers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="salonName">Salon Name</Label>
              <Input
                type="text"
                id="salonName"
                value={salonName}
                onChange={(e) => setSalonName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="salonType">Salon Type</Label>
              <Select value={salonType} onValueChange={setSalonType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a salon type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nail Salon">Nail Salon</SelectItem>
                  <SelectItem value="Hair Salon">Hair Salon</SelectItem>
                  <SelectItem value="Spa">Spa</SelectItem>
                  <SelectItem value="Barbershop">Barbershop</SelectItem>
                  <SelectItem value="Cosmetology Salon">Cosmetology Salon</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="websiteUrl">Website URL</Label>
              <Input
                type="url"
                id="websiteUrl"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="instagramUrl">Instagram URL</Label>
              <Input
                type="url"
                id="instagramUrl"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptsWalkIns"
                checked={acceptsWalkIns}
                onCheckedChange={(checked) => setAcceptsWalkIns(!!checked)}
              />
              <Label htmlFor="acceptsWalkIns">Accepts Walk-ins</Label>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonProfileSetup;
