
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersOverview from '@/components/admin/UsersOverview';
import ReferralsTracker from '@/components/admin/ReferralsTracker';
import ControlPanel from '@/components/admin/ControlPanel';
import { useAuth } from '@/context/auth';
import { Cog, Shield, Brain, AlertTriangle } from 'lucide-react';

const CommandCenter = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  // Admin access check
  useEffect(() => {
    // Only allow Michael's email or role-based admin access
    const isAdmin = userProfile?.email === 'michael@emvi.app' || userProfile?.role === 'admin';
    
    if (!isAdmin) {
      navigate('/');
    }
  }, [userProfile, navigate]);

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Emvi Command Center</h1>
      </div>

      <div className="bg-white/60 backdrop-blur-md shadow-md rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold">Welcome, Administrator</h2>
        </div>

        <p className="text-gray-600 mb-4">
          This is your private command center for monitoring and controlling the Emvi platform.
          Use with care - all actions are logged.
        </p>

        <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
          <AlertTriangle className="h-5 w-5" />
          <p className="text-sm">Remember: Changes made here affect real user accounts and experiences.</p>
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Cog className="h-4 w-4" />
            <span>Users Overview</span>
          </TabsTrigger>
          <TabsTrigger value="referrals" className="flex items-center gap-2">
            <Cog className="h-4 w-4" />
            <span>Referrals Tracker</span>
          </TabsTrigger>
          <TabsTrigger value="control" className="flex items-center gap-2">
            <Cog className="h-4 w-4" />
            <span>Boost & Credits Control</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="mt-0">
          <UsersOverview />
        </TabsContent>
        
        <TabsContent value="referrals" className="mt-0">
          <ReferralsTracker />
        </TabsContent>
        
        <TabsContent value="control" className="mt-0">
          <ControlPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommandCenter;
