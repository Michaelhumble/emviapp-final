
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/auth";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import our components
import UserAvatar from "@/components/profile/UserAvatar";
import AccountInfo from "@/components/profile/AccountInfo";
import ProfileForm from "@/components/profile/ProfileForm";
import SubscriptionProfile from "@/components/profile/SubscriptionProfile";
import SubscriptionBadge from "@/components/subscription/SubscriptionBadge";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  location: string | null;
  bio: string | null;
  phone: string | null;
  instagram: string | null;
  website: string | null;
  specialty: string | null;
  avatar_url: string | null;
  created_at: string | null;
}

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
          
        if (error) throw error;
        
        setProfile(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast({
          variant: "destructive",
          description: "Failed to load profile data"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [user]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setUpdating(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({
          full_name: formData.full_name,
          location: formData.location,
          bio: formData.bio,
          phone: formData.phone,
          instagram: formData.instagram,
          website: formData.website,
          specialty: formData.specialty
        })
        .eq("id", user.id);
        
      if (error) throw error;
      
      toast({
        description: "Profile updated successfully"
      });
      setProfile(prev => prev ? { ...prev, ...formData } : null);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        description: "Failed to update profile"
      });
    } finally {
      setUpdating(false);
    }
  };
  
  if (authLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }
  
  if (!user && !authLoading) {
    return <Navigate to="/auth/signin" replace />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Your Profile</h1>
              <div className="flex items-center gap-2">
                <SubscriptionBadge />
              </div>
            </div>
            <div className="mt-2 md:mt-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="subscription">Subscription</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <TabsContent value="profile" className="mt-0" hidden={activeTab !== "profile"}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                {profile && (
                  <>
                    <UserAvatar 
                      avatar_url={profile.avatar_url} 
                      email={profile.email} 
                      created_at={profile.created_at} 
                    />
                    <AccountInfo 
                      email={profile.email} 
                      created_at={profile.created_at} 
                    />
                  </>
                )}
              </div>
              
              <div className="md:col-span-2">
                {profile && (
                  <ProfileForm
                    formData={formData as UserProfile}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    updating={updating}
                  />
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="subscription" className="mt-0" hidden={activeTab !== "subscription"}>
            <SubscriptionProfile />
          </TabsContent>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
