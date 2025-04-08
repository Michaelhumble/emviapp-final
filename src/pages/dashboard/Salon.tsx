
import { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from 'lucide-react';
import SalonOwnerDashboardContent from '@/components/dashboard/salon/SalonOwnerDashboardContent';
import DashboardRouteProtection from '@/components/dashboard/DashboardRouteProtection';
import { Link } from 'react-router-dom';
import { adaptUserProfile } from '@/utils/profileAdapter';

const SalonDashboard = () => {
  const { userProfile, userRole } = useAuth();
  const adaptedProfile = adaptUserProfile(userProfile);
  const navigate = useNavigate();

  // Salon name for display
  const salonName = adaptedProfile?.salon_name || 'Your Salon';

  useEffect(() => {
    // Set page title
    document.title = "Salon Owner Dashboard | EmviApp";
    
    // Debug check to validate correct routing
    if (userRole) {
      console.log(`[Salon Dashboard] Current role: ${userRole}`);
    }
  }, [userRole]);

  return (
    <DashboardRouteProtection allowedRoles={['salon_owner']} dashboardType="Salon">
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">
                    <Home className="h-4 w-4 mr-1" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              
              <BreadcrumbItem>
                <BreadcrumbPage>Salon</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-3xl font-serif mb-8">
            {salonName} Dashboard
          </h1>
          
          {/* Salon Dashboard Content */}
          <SalonOwnerDashboardContent />
        </div>
      </Layout>
    </DashboardRouteProtection>
  );
};

export default SalonDashboard;
