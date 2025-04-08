
import { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DashboardBreadcrumb from '@/components/dashboard/DashboardBreadcrumb';
import { Loader2 } from 'lucide-react';
import SalonOwnerDashboardContent from '@/components/dashboard/salon/SalonOwnerDashboardContent';
import { isRoleEquivalent } from '@/utils/roleUtils';

const SalonDashboard = () => {
  const { userProfile, userRole, loading } = useAuth();
  const navigate = useNavigate();

  // Protect this route for salon owners only
  useEffect(() => {
    if (!loading && !isRoleEquivalent(userRole, ['salon_owner', 'salon', 'owner'])) {
      toast.error('You do not have access to the salon dashboard. Redirecting to your dashboard.');
      navigate('/dashboard');
    }
  }, [userRole, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading salon dashboard...</span>
        </div>
      </Layout>
    );
  }

  if (!userProfile) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-serif mb-8">Salon Dashboard</h1>
          <div className="text-center p-12 border border-gray-200 rounded-lg">
            <p className="text-gray-600 mb-4">Please complete your profile to access your dashboard.</p>
            <button 
              onClick={() => navigate('/profile/edit')}
              className="px-4 py-2 bg-primary text-white rounded-lg"
            >
              Complete Profile
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const salonName = userProfile.salon_name || 'Your Salon';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <DashboardBreadcrumb 
          links={[
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'Salon', href: '/dashboard/salon' },
          ]} 
        />
        
        <h1 className="text-3xl font-serif mb-8">
          {salonName} Dashboard
        </h1>
        
        <SalonOwnerDashboardContent />
      </div>
    </Layout>
  );
};

export default SalonDashboard;
