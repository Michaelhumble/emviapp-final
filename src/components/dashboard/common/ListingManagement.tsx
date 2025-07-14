import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Trash2, RefreshCw, Eye, Calendar, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Listing {
  id: string;
  title: string;
  type: 'job' | 'salon';
  status: 'active' | 'expired' | 'pending';
  created_at: string;
  expires_at?: string;
  pricing_tier?: string;
  asking_price?: number;
  salon_name?: string;
}

const ListingManagement: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserListings();
    }
  }, [user]);

  const fetchUserListings = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch job listings
      const { data: jobs, error: jobsError } = await supabase
        .from('jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Fetch salon listings
      const { data: salons, error: salonsError } = await supabase
        .from('salon_sales')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (jobsError) throw jobsError;
      if (salonsError) throw salonsError;

      // Combine and format listings
      const allListings: Listing[] = [
        ...(jobs || []).map(job => ({
          id: job.id,
          title: job.title,
          type: 'job' as const,
          status: job.status === 'active' && job.expires_at && new Date(job.expires_at) > new Date() 
            ? 'active' as const 
            : job.expires_at && new Date(job.expires_at) <= new Date() 
            ? 'expired' as const 
            : job.status as 'active' | 'expired' | 'pending',
          created_at: job.created_at,
          expires_at: job.expires_at,
          pricing_tier: job.pricing_tier,
        })),
        ...(salons || []).map(salon => ({
          id: salon.id,
          title: salon.salon_name,
          type: 'salon' as const,
          status: salon.status === 'active' && salon.expires_at && new Date(salon.expires_at) > new Date() 
            ? 'active' as const 
            : salon.expires_at && new Date(salon.expires_at) <= new Date() 
            ? 'expired' as const 
            : salon.status as 'active' | 'expired' | 'pending',
          created_at: salon.created_at,
          expires_at: salon.expires_at,
          pricing_tier: salon.selected_pricing_tier,
          asking_price: salon.asking_price,
          salon_name: salon.salon_name,
        })),
      ];

      setListings(allListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('Failed to load your listings');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (listing: Listing) => {
    if (listing.type === 'job') {
      navigate(`/jobs/edit/${listing.id}`);
    } else {
      navigate(`/posting/salon?edit=${listing.id}`);
    }
  };

  const handleDelete = async (listing: Listing) => {
    if (!confirm(`Are you sure you want to delete this ${listing.type}?`)) return;

    try {
      const table = listing.type === 'job' ? 'jobs' : 'salon_sales';
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', listing.id);

      if (error) throw error;

      toast.success(`${listing.type === 'job' ? 'Job' : 'Salon'} deleted successfully`);
      fetchUserListings();
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast.error('Failed to delete listing');
    }
  };

  const handleRenew = (listing: Listing) => {
    // Navigate to renewal/upgrade flow
    if (listing.type === 'job') {
      navigate(`/jobs/renew/${listing.id}`);
    } else {
      navigate(`/salons/renew/${listing.id}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPlanBadge = (tier?: string) => {
    if (!tier) return null;
    
    const badgeMap = {
      'free': { text: 'Free', class: 'bg-gray-100 text-gray-800' },
      'basic': { text: 'Basic', class: 'bg-blue-100 text-blue-800' },
      'gold': { text: 'Featured', class: 'bg-yellow-100 text-yellow-800' },
      'premium': { text: 'Premium', class: 'bg-purple-100 text-purple-800' },
      'annual': { text: 'Annual', class: 'bg-green-100 text-green-800' },
    };

    const badge = badgeMap[tier as keyof typeof badgeMap];
    if (!badge) return null;

    return <Badge className={`text-xs ${badge.class}`}>{badge.text}</Badge>;
  };

  const getDaysRemaining = (expiresAt?: string) => {
    if (!expiresAt) return null;
    const days = Math.ceil((new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const activeListings = listings.filter(l => l.status === 'active');
  const expiredListings = listings.filter(l => l.status === 'expired');
  const pendingListings = listings.filter(l => l.status === 'pending');

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading your listings...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Your Listings</span>
          <Button size="sm" onClick={fetchUserListings} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active ({activeListings.length})</TabsTrigger>
            <TabsTrigger value="expired">Expired ({expiredListings.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingListings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4 mt-4">
            {activeListings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No active listings found
              </div>
            ) : (
              activeListings.map(listing => (
                <div key={listing.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <h3 className="font-medium">{listing.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge variant="outline" className="text-xs">
                          {listing.type === 'job' ? 'Job' : 'Salon'}
                        </Badge>
                        {getPlanBadge(listing.pricing_tier)}
                        {getStatusBadge(listing.status)}
                      </div>
                      {listing.asking_price && (
                        <div className="flex items-center gap-1 text-sm">
                          <DollarSign className="h-3 w-3" />
                          <span>${listing.asking_price.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div>Posted {new Date(listing.created_at).toLocaleDateString()}</div>
                      {listing.expires_at && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {getDaysRemaining(listing.expires_at)} days left
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(listing)}>
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(listing)}>
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                    {listing.type === 'job' && (
                      <Button size="sm" variant="outline" onClick={() => navigate(`/jobs`)}>
                        <Eye className="h-3 w-3 mr-1" />
                        View Live
                      </Button>
                    )}
                    {listing.type === 'salon' && (
                      <Button size="sm" variant="outline" onClick={() => navigate(`/salons`)}>
                        <Eye className="h-3 w-3 mr-1" />
                        View Live
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="expired" className="space-y-4 mt-4">
            {expiredListings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No expired listings found
              </div>
            ) : (
              expiredListings.map(listing => (
                <div key={listing.id} className="border rounded-lg p-4 space-y-3 bg-red-50/50">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <h3 className="font-medium">{listing.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge variant="outline" className="text-xs">
                          {listing.type === 'job' ? 'Job' : 'Salon'}
                        </Badge>
                        {getPlanBadge(listing.pricing_tier)}
                        {getStatusBadge(listing.status)}
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div>Expired {listing.expires_at ? new Date(listing.expires_at).toLocaleDateString() : 'N/A'}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleRenew(listing)} className="bg-green-600 hover:bg-green-700">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Renew Now
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(listing)}>
                      <Edit className="h-3 w-3 mr-1" />
                      Edit & Renew
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(listing)}>
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4 mt-4">
            {pendingListings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No pending listings found
              </div>
            ) : (
              pendingListings.map(listing => (
                <div key={listing.id} className="border rounded-lg p-4 space-y-3 bg-yellow-50/50">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <h3 className="font-medium">{listing.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge variant="outline" className="text-xs">
                          {listing.type === 'job' ? 'Job' : 'Salon'}
                        </Badge>
                        {getPlanBadge(listing.pricing_tier)}
                        {getStatusBadge(listing.status)}
                      </div>
                      <div className="text-sm text-yellow-700">
                        Awaiting payment confirmation
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ListingManagement;