
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from "@/components/ui/select";
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth';
import Layout from '@/components/layout/Layout';
import { CustomerProfileCompletionTracker } from '@/components/customer/CustomerProfileCompletionTracker';

const BEAUTY_PREFERENCES = [
  "Hair", "Nails", "Makeup", "Skincare", "Lashes", "Brows", 
  "Massage", "Facial", "Waxing"
];

const CustomerSetup = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: userProfile?.full_name || '',
    gender: userProfile?.gender || '',
    location: userProfile?.location || '',
    phone: userProfile?.phone || '',
    preferences: userProfile?.preferences || []
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const profileData = {
        full_name: formData.fullName,
        location: formData.location,
        phone: formData.phone,
        preferences: formData.preferences,
        // Custom fields can be stored in metadata or accepted by backend
        gender: formData.gender, // This will be handled by backend or ignored
      };
      
      const result = await updateProfile(profileData);
      
      if (result.success) {
        navigate('/dashboard/customer');
      } else {
        throw new Error(result.error?.message || "Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-3xl py-10 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Complete your profile</h1>
          <p className="text-muted-foreground">Help us personalize your experience</p>
        </div>
        
        <CustomerProfileCompletionTracker />
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center mb-8">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={userProfile?.avatar_url || undefined} />
                <AvatarFallback className="text-xl">
                  {formData.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button type="button" variant="outline" size="sm">
                Upload Photo
              </Button>
            </div>
            
            <div className="grid gap-6">
              <div>
                <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="gender">Gender (Optional)</Label>
                <Select 
                  name="gender" 
                  value={formData.gender}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                >
                  <option value="">Select gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Beauty Preferences</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {BEAUTY_PREFERENCES.map(pref => (
                    <Button
                      key={pref}
                      type="button"
                      variant={formData.preferences.includes(pref) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          preferences: prev.preferences.includes(pref)
                            ? prev.preferences.filter(p => p !== pref)
                            : [...prev.preferences, pref]
                        }));
                      }}
                    >
                      {pref}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default CustomerSetup;
