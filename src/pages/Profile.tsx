
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import UserProfile from "@/components/profile/UserProfile";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

const Profile = () => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Please Sign In</h2>
              <p className="text-gray-600">You need to be signed in to view your profile.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Check if user is artist - update role check
  const isArtist = userRole === 'nail-artist' || 
                  userRole === 'hair-stylist' || 
                  userRole === 'lash-tech' || 
                  userRole === 'barber' || 
                  userRole === 'esthetician' || 
                  userRole === 'massage-therapist' || 
                  userRole === 'freelancer';

  return (
    <Layout>
      <UserProfile />
    </Layout>
  );
};

export default Profile;
