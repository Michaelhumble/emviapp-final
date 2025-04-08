
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, RefreshCw } from 'lucide-react';

type User = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  credits: number;
  boosted_until: string | null;
  referral_count: number;
  created_at: string;
};

const UsersOverview = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('users')
        .select('id, full_name, email, role, credits, boosted_until, created_at, referral_count')
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (roleFilter !== 'all') {
        query = query.eq('role', roleFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const filteredUsers = users.filter(user => {
    const searchTerms = searchQuery.toLowerCase();
    return (
      user.full_name?.toLowerCase().includes(searchTerms) ||
      user.email?.toLowerCase().includes(searchTerms)
    );
  });

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const getRoleBadgeColor = (role: string) => {
    const roleColors: Record<string, string> = {
      artist: 'bg-blue-100 text-blue-800',
      salon: 'bg-purple-100 text-purple-800',
      customer: 'bg-green-100 text-green-800',
      freelancer: 'bg-amber-100 text-amber-800',
      supplier: 'bg-indigo-100 text-indigo-800',
      admin: 'bg-red-100 text-red-800',
      owner: 'bg-purple-100 text-purple-800',
      'nail technician/artist': 'bg-cyan-100 text-cyan-800',
      renter: 'bg-orange-100 text-orange-800',
      other: 'bg-gray-100 text-gray-800'
    };
    
    return roleColors[role] || 'bg-gray-100 text-gray-800';
  };

  const isUserBoosted = (boostDate: string | null) => {
    if (!boostDate) return false;
    return new Date(boostDate) > new Date();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by name or email..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="artist">Artist</option>
            <option value="salon">Salon</option>
            <option value="customer">Customer</option>
            <option value="freelancer">Freelancer</option>
            <option value="supplier">Supplier</option>
            <option value="owner">Owner</option>
            <option value="renter">Renter</option>
          </select>
          
          <Button variant="outline" size="sm" onClick={fetchUsers}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[100px]">Role</TableHead>
              <TableHead className="w-[80px]">Credits</TableHead>
              <TableHead className="w-[120px]">Boost Status</TableHead>
              <TableHead className="w-[80px]">Referrals</TableHead>
              <TableHead className="w-[160px]">Date Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="flex justify-center">
                    <RefreshCw className="h-5 w-5 animate-spin text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Loading users...</p>
                </TableCell>
              </TableRow>
            ) : currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.full_name || 'Unnamed User'}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.credits || 0}</TableCell>
                  <TableCell>
                    {isUserBoosted(user.boosted_until) ? (
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell>{user.referral_count || 0}</TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <p className="text-gray-500">No users found</p>
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
            Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
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

export default UsersOverview;
