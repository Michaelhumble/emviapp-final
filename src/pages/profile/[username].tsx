
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { UserProfile } from "@/types/profile";
import { 
  ProfileHeader, 
  ProfileContent, 
  ProfileLoading, 
  ProfileNotFound 
} from "@/components/profile/user-page";

const UserProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // First try to find by username in URL
        let { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', username)
          .single();
        
        // If not found, try searching by full_name
        if (error || !data) {
          const { data: nameData, error: nameError } = await supabase
            .from('users')
            .select('*')
            .ilike('full_name', `%${username}%`)
            .limit(1)
            .single();
          
          if (nameError) {
            setError("User profile not found");
            setLoading(false);
            return;
          }
          
          data = nameData;
        }
        
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [username]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <ProfileLoading />
        </div>
      </Layout>
    );
  }
  
  if (error || !profile) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <ProfileNotFound />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <ProfileHeader profile={profile} />
            </div>
            
            <div className="md:col-span-2">
              <ProfileContent profile={profile} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfilePage;
