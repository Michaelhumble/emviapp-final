
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users, ShoppingBag, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const SalonOwnerDashboardContent = () => {
  const { userProfile } = useAuth();

  return (
    <div className="space-y-8">
      {/* Quick stats section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Profile Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userProfile?.profile_views || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Jobs Posted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              0
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active listings
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Available Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userProfile?.credits || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              For promotion & visibility
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userProfile?.referral_count || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total referrals
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Action buttons section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/post/job">
          <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
            <Briefcase className="h-6 w-6" />
            <span>Post a Job</span>
          </Button>
        </Link>
        
        <Link to="/artists">
          <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
            <Users className="h-6 w-6" />
            <span>Find Artists</span>
          </Button>
        </Link>
        
        <Link to="/sell-salon">
          <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            <span>Sell Salon</span>
          </Button>
        </Link>
        
        <Link to="/post/job">
          <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
            <PlusCircle className="h-6 w-6" />
            <span>More Actions</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SalonOwnerDashboardContent;
