
import { useState, useEffect } from "react";
import { User } from "../types/user";
import { User2, Settings, Medal } from "lucide-react";
import WelcomeSection from "../components/profile/WelcomeSection";
import BadgesSection from "../components/profile/BadgesSection";
import PerksSection from "../components/profile/PerksSection";
import ReferralSection from "../components/profile/ReferralSection";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import ProfileInfo from "../components/profile/ProfileInfo";
import EditProfileForm from "../components/EditProfileForm";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("view");
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchUserProfile(user.id);
    }
  }, [user]);

  const fetchUserProfile = async (userId: string) => {
    try {
      setLoading(true);

      const { data, error: supabaseError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (supabaseError) {
        setError(supabaseError.message);
        console.error("Error fetching profile:", supabaseError.message);
        return;
      }

      if (data) {
        setProfile({
          id: data.id || userId,
          email: user?.email || "",
          full_name: data.full_name || "",
          avatar_url: data.avatar_url,
          phone: data.phone,
          role: data.role,
          created_at: data.created_at,
          updated_at: data.updated_at,
          specialty: data.specialty,
          location: data.location,
          bio: data.bio,
          instagram: data.instagram,
          website: data.website,
          credits: data.credits,
          badges: data.badges || [],
          preferred_language: data.preferred_language,
          referral_code: data.referral_code,
          referred_by: data.referred_by,
          status: data.status
        });
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = (updatedProfile: User) => {
    setProfile(updatedProfile);
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="container mx-auto px-4 py-8 text-center">Profile not found.</div>;
  }

  // Show error message if we have an error
  if (error) {
    console.log("Error loading profile:", error);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
      <div className="flex items-center mb-8">
        <User2 size={28} className="text-purple-400 mr-3" strokeWidth={1.5} />
        <h1 className="text-3xl font-medium bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent tracking-tight">
          My Profile
        </h1>
      </div>

      <WelcomeSection profile={profile} loading={false} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-8 mb-6 transition-all hover:shadow-lg hover:shadow-purple-900/10">
            <div className="flex items-center mb-6">
              {activeTab === "view" ? (
                <User2 size={24} className="text-purple-400 mr-3" />
              ) : (
                <Settings size={24} className="text-purple-400 mr-3" />
              )}
              <h2 className="text-xl font-medium text-white">Profile Information</h2>
            </div>

            <Tabs className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="view">View Profile</TabsTrigger>
                <TabsTrigger value="edit">Edit Profile</TabsTrigger>
              </TabsList>
              <TabsContent value="view">
                <ProfileInfo profile={profile} />
              </TabsContent>
              <TabsContent value="edit">
                <EditProfileForm profile={profile} onProfileUpdate={handleProfileUpdate} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-8 transition-all hover:shadow-lg hover:shadow-purple-900/10">
            <div className="flex items-center mb-6">
              <Medal size={24} className="text-purple-400 mr-3" />
              <h2 className="text-xl font-medium text-white">Badges & Achievements</h2>
            </div>
            <BadgesSection badges={profile.badges} />
          </div>
        </div>

        <div className="space-y-6">
          <PerksSection profile={profile} />
          <ReferralSection profile={profile} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
