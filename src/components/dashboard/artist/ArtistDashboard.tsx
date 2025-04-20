import React from 'react';
import { Card } from "@/components/ui/card";
import { useArtistData } from './context/ArtistDataContext';
import { BadgePlus, Users, Coins, Link, CopyCheck, TrendingUp, PackageCheck, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import IndependentBanner from "@/components/artist/IndependentBanner";
import { useAuth } from "@/context/auth";

const ArtistDashboard = () => {
  const { artistProfile, loading, handleCopyReferralLink, copied, firstName, userCredits, refreshArtistProfile } = useArtistData();
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  const handleProfileEdit = () => {
    navigate('/profile/artist/setup');
  };

  const handlePortfolioEdit = () => {
    navigate('/artist/portfolio');
  };

  const handleServicesEdit = () => {
    toast.info("Services feature coming soon!");
  };

  const handleAnalyticsView = () => {
    toast.info("Analytics feature coming soon!");
  };

  const handleCustomerManagement = () => {
    toast.info("Customer management feature coming soon!");
  };

  const handlePosAccess = () => {
    toast.info("Point of Sale (POS) feature coming soon!");
  };

  const handleEarningsView = () => {
    toast.info("Earnings tracking feature coming soon!");
  };

  const handleSubscriptionSettings = () => {
    toast.info("Subscription settings feature coming soon!");
  };

  const referralLink = `https://emviapp.com/join?ref=${artistProfile?.affiliate_code || `EMVI${Math.floor(1000 + Math.random() * 9000)}`}`;

  return (
    <div className="space-y-6">
      {userProfile?.independent && <IndependentBanner />}
      <Card className="bg-white border-0 shadow-sm">
        <div className="p-6 flex items-center space-x-4">
          {loading ? (
            <Skeleton className="h-12 w-12 rounded-full" />
          ) : (
            <Avatar>
              <AvatarImage src={artistProfile?.avatar_url} />
              <AvatarFallback>{firstName?.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <div className="space-y-1 font-medium">
            {loading ? (
              <Skeleton className="h-4 w-[200px]" />
            ) : (
              <p className="text-lg">Welcome back, {firstName}!</p>
            )}
            {loading ? (
              <Skeleton className="h-4 w-[150px]" />
            ) : (
              <p className="text-sm text-gray-500">
                {artistProfile?.specialty || 'Beauty Professional'}
              </p>
            )}
          </div>
        </div>
      </Card>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-white border-0 shadow-sm">
          <div className="p-5 space-y-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <h3 className="text-sm font-semibold">Profile Completion</h3>
            </div>
            {loading ? (
              <Skeleton className="h-4 w-full" />
            ) : (
              <p className="text-3xl font-medium">{artistProfile?.profile_completion || 0}%</p>
            )}
            <Progress value={artistProfile?.profile_completion || 0} className="h-2" />
            <Button variant="secondary" size="sm" onClick={handleProfileEdit}>
              Complete Profile
            </Button>
          </div>
        </Card>
        
        <Card className="bg-white border-0 shadow-sm">
          <div className="p-5 space-y-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-orange-500" />
              <h3 className="text-sm font-semibold">Referral Credits</h3>
            </div>
            {loading ? (
              <Skeleton className="h-4 w-full" />
            ) : (
              <p className="text-3xl font-medium">{userCredits}</p>
            )}
            <p className="text-sm text-gray-500">Share your referral link and earn credits!</p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 p-2 border rounded-md text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyReferralLink}
                disabled={copied}
              >
                {copied ? (
                  <>
                    <CopyCheck className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Link className="w-4 h-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
        
        <Card className="bg-white border-0 shadow-sm">
          <div className="p-5 space-y-3">
            <div className="flex items-center space-x-2">
              <PackageCheck className="h-4 w-4 text-green-500" />
              <h3 className="text-sm font-semibold">Subscription Status</h3>
            </div>
            {loading ? (
              <Skeleton className="h-4 w-full" />
            ) : (
              <p className="text-3xl font-medium">Free</p>
            )}
            <p className="text-sm text-gray-500">Upgrade to unlock premium features.</p>
            <Button variant="secondary" size="sm" onClick={handleSubscriptionSettings}>
              View Subscription
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-white border-0 shadow-sm">
          <div className="p-5 space-y-3">
            <div className="flex items-center space-x-2">
              <Store className="h-4 w-4 text-purple-500" />
              <h3 className="text-sm font-semibold">Manage Portfolio</h3>
            </div>
            <p className="text-sm text-gray-500">Showcase your best work.</p>
            <Button variant="secondary" size="sm" onClick={handlePortfolioEdit}>
              Edit Portfolio
            </Button>
          </div>
        </Card>
        
        <Card className="bg-white border-0 shadow-sm">
          <div className="p-5 space-y-3">
            <div className="flex items-center space-x-2">
              <Coins className="h-4 w-4 text-yellow-500" />
              <h3 className="text-sm font-semibold">Manage Services</h3>
            </div>
            <p className="text-sm text-gray-500">List the services you offer.</p>
            <Button variant="secondary" size="sm" onClick={handleServicesEdit}>
              Edit Services
            </Button>
          </div>
        </Card>
        
        <Card className="bg-white border-0 shadow-sm">
          <div className="p-5 space-y-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-indigo-500" />
              <h3 className="text-sm font-semibold">Customer Management</h3>
            </div>
            <p className="text-sm text-gray-500">Manage your customer base.</p>
            <Button variant="secondary" size="sm" onClick={handleCustomerManagement}>
              View Customers
            </Button>
          </div>
        </Card>
      </div>
      
      {userProfile?.independent && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-white border-0 shadow-sm">
            <div className="p-5 space-y-3">
              <div className="flex items-center space-x-2">
                <BadgePlus className="h-4 w-4 text-pink-500" />
                <h3 className="text-sm font-semibold">Access POS</h3>
              </div>
              <p className="text-sm text-gray-500">Manage your transactions.</p>
              <Button variant="secondary" size="sm" onClick={handlePosAccess}>
                Access POS
              </Button>
            </div>
          </Card>
          
          <Card className="bg-white border-0 shadow-sm">
            <div className="p-5 space-y-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-teal-500" />
                <h3 className="text-sm font-semibold">View Earnings</h3>
              </div>
              <p className="text-sm text-gray-500">Track your revenue.</p>
              <Button variant="secondary" size="sm" onClick={handleEarningsView}>
                View Earnings
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ArtistDashboard;
