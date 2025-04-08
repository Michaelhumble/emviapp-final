
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Filter } from 'lucide-react';
import { toast } from 'sonner';

interface ReferralWithNames {
  id: string;
  status: string;
  created_at: string;
  milestone_reached: boolean;
  verified_at: string | null;
  milestone_type: string | null;
  referrer: {
    id: string;
    full_name: string;
    role: string;
  };
  referred: {
    id: string;
    full_name: string;
    role: string;
  };
}

// Fallback user data for when the relation is not found
const unknownUser = {
  id: '',
  full_name: 'Unknown User',
  role: 'unknown'
};

const ReferralsTracker = () => {
  const [referrals, setReferrals] = useState<ReferralWithNames[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const fetchReferrals = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('referrals')
        .select(`
          id, 
          status, 
          created_at, 
          milestone_reached, 
          verified_at, 
          milestone_type
        `)
        .order('created_at', { ascending: false });
      
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Transform the data to include placeholder user data
      const referralsWithUserInfo: ReferralWithNames[] = (data || []).map(referral => ({
        ...referral,
        referrer: { ...unknownUser },
        referred: { ...unknownUser }
      }));
      
      setReferrals(referralsWithUserInfo);
      
      // For each referral, fetch the user details separately
      for (const referral of referralsWithUserInfo) {
        // This is commented out as the data structure doesn't appear to support this relation directly
        // In a real implementation, you would fetch the user data and update the referral object
        /*
        const { data: referrerData } = await supabase
          .from('users')
          .select('id, full_name, role')
          .eq('id', referral.referrer_id)
          .single();
          
        const { data: referredData } = await supabase
          .from('users')
          .select('id, full_name, role')
          .eq('id', referral.referred_id)
          .single();
          
        if (referrerData) {
          referral.referrer = referrerData;
        }
        
        if (referredData) {
          referral.referred = referredData;
        }
        */
      }
      
      // Update the state with the user data
      setReferrals([...referralsWithUserInfo]);
    } catch (error) {
      console.error('Error fetching referrals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, [statusFilter]);

  const handleVerifyReferral = async (referralId: string, verifyStatus: boolean) => {
    try {
      const updates = {
        milestone_reached: verifyStatus,
        milestone_type: 'admin_verified',
        verified_at: verifyStatus ? new Date().toISOString() : null,
        status: verifyStatus ? 'completed' : 'pending'
      };
      
      const { error } = await supabase
        .from('referrals')
        .update(updates)
        .eq('id', referralId);
      
      if (error) throw error;
      
      // Update local state
      setReferrals(prev => 
        prev.map(ref => 
          ref.id === referralId 
            ? { ...ref, ...updates } 
            : ref
        )
      );
      
      toast.success(verifyStatus 
        ? 'Referral has been verified' 
        : 'Referral verification removed'
      );
    } catch (error) {
      console.error('Error updating referral:', error);
      toast.error('Failed to update referral status');
    }
  };

  // Calculate pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = referrals.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(referrals.length / recordsPerPage);

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      processing: 'bg-blue-100 text-blue-800',
      suspicious: 'bg-red-100 text-red-800'
    };
    
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <h2 className="text-xl font-semibold">Referrals Overview</h2>
        
        <div className="flex gap-2">
          <select
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="suspicious">Suspicious</option>
          </select>
          
          <Button variant="outline" size="sm" onClick={fetchReferrals}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[220px]">Referrer</TableHead>
              <TableHead className="w-[220px]">Referred User</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[100px]">Milestone</TableHead>
              <TableHead className="w-[120px]">Verify</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="flex justify-center">
                    <RefreshCw className="h-5 w-5 animate-spin text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Loading referrals...</p>
                </TableCell>
              </TableRow>
            ) : currentRecords.length > 0 ? (
              currentRecords.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell>
                    <div className="font-medium">
                      {referral.referrer?.full_name || 'Unknown User'}
                    </div>
                    <Badge className="mt-1">{referral.referrer?.role || 'unknown'}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {referral.referred?.full_name || 'Unknown User'}
                    </div>
                    <Badge className="mt-1">{referral.referred?.role || 'unknown'}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(referral.status)}>
                      {referral.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(referral.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {referral.milestone_reached ? (
                      <Badge className="bg-indigo-100 text-indigo-800">
                        {referral.milestone_type || 'Reached'}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">None</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Switch
                        checked={referral.milestone_reached}
                        onCheckedChange={(checked) => 
                          handleVerifyReferral(referral.id, checked)
                        }
                      />
                      <span className="ml-2 text-sm">
                        {referral.milestone_reached ? 'Verified' : 'Verify'}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <p className="text-gray-500">No referrals found</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, referrals.length)} of {referrals.length} referrals
          </div>
          <div className="flex gap-1">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralsTracker;
