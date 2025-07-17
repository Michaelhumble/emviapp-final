import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Coins, Users, TrendingUp, AlertTriangle, Download, RefreshCw, 
  Plus, Minus, Award, Flag, Eye, Calendar, Search, Filter 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { creditsManager, type CreditTransaction, type UserUnlock } from '@/lib/credits';

interface AdminStats {
  totalUsers: number;
  totalCredits: number;
  totalTransactions: number;
  suspiciousActivity: number;
}

interface UserCreditSummary {
  user_id: string;
  full_name: string;
  email: string;
  total_credits: number;
  total_earned: number;
  total_spent: number;
  last_activity: string;
  suspicious_flags: number;
}

const AdminCredits = () => {
  const [stats, setStats] = useState<AdminStats>({ totalUsers: 0, totalCredits: 0, totalTransactions: 0, suspiciousActivity: 0 });
  const [users, setUsers] = useState<UserCreditSummary[]>([]);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [adjustDialogOpen, setAdjustDialogOpen] = useState(false);
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustReason, setAdjustReason] = useState('');
  const [adjustType, setAdjustType] = useState<'add' | 'deduct'>('add');
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadStats(),
        loadUsers(),
        loadTransactions()
      ]);
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    // Get overall statistics
    const { data: creditsData } = await supabase
      .from('credits_ledger')
      .select('credits_amount, user_id');

    const { data: usersData } = await supabase
      .from('profiles')
      .select('id')
      .not('id', 'is', null);

    const totalCredits = creditsData?.reduce((sum, t) => sum + t.credits_amount, 0) || 0;
    const totalUsers = usersData?.length || 0;
    const totalTransactions = creditsData?.length || 0;

    // Check for suspicious activity (placeholder)
    const suspiciousActivity = creditsData?.filter(t => t.credits_amount > 1000).length || 0;

    setStats({
      totalUsers,
      totalCredits,
      totalTransactions,
      suspiciousActivity
    });
  };

  const loadUsers = async () => {
    const { data: usersData } = await supabase
      .from('profiles')
      .select(`
        id,
        email,
        full_name,
        created_at
      `)
      .limit(100);

    if (!usersData) return;

    // Get credit summaries for each user
    const userSummaries: UserCreditSummary[] = [];

    for (const user of usersData) {
      const { data: transactions } = await supabase
        .from('credits_ledger')
        .select('*')
        .eq('user_id', user.id);

      if (transactions) {
        const totalCredits = transactions.reduce((sum, t) => sum + t.credits_amount, 0);
        const totalEarned = transactions.filter(t => t.credits_amount > 0).reduce((sum, t) => sum + t.credits_amount, 0);
        const totalSpent = Math.abs(transactions.filter(t => t.credits_amount < 0).reduce((sum, t) => sum + t.credits_amount, 0));
        const lastActivity = transactions.length > 0 ? transactions[0].created_at : user.created_at;

        userSummaries.push({
          user_id: user.id,
          full_name: user.full_name || 'Unknown',
          email: user.email || '',
          total_credits: totalCredits,
          total_earned: totalEarned,
          total_spent: totalSpent,
          last_activity: lastActivity,
          suspicious_flags: 0 // Placeholder
        });
      }
    }

    setUsers(userSummaries.sort((a, b) => b.total_credits - a.total_credits));
  };

  const loadTransactions = async () => {
    const { data } = await supabase
      .from('credits_ledger')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (data) {
      setTransactions(data);
    }
  };

  const handleAdjustCredits = async () => {
    if (!selectedUser || !adjustAmount || !adjustReason) return;

    try {
      const amount = parseInt(adjustAmount);
      const finalAmount = adjustType === 'deduct' ? -amount : amount;

      const { error } = await supabase
        .from('credits_ledger')
        .insert({
          user_id: selectedUser,
          action_type: 'admin_adjust',
          credits_amount: finalAmount,
          reason: 'admin_adjustment',
          admin_reason: adjustReason
        });

      if (error) throw error;

      // Log admin action
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        await supabase
          .from('admin_actions')
          .insert({
            admin_user_id: currentUser.id,
            target_user_id: selectedUser,
            action_type: 'credit_adjust',
            details: { amount: finalAmount, reason: adjustReason },
            reason: adjustReason
          });
      }

      toast({
        title: "Credits Adjusted",
        description: `Successfully ${adjustType === 'add' ? 'added' : 'deducted'} ${amount} credits`,
      });

      setAdjustDialogOpen(false);
      setAdjustAmount('');
      setAdjustReason('');
      setSelectedUser(null);
      loadData();
    } catch (error) {
      console.error('Error adjusting credits:', error);
      toast({
        title: "Error",
        description: "Failed to adjust credits",
        variant: "destructive"
      });
    }
  };

  const exportCSV = () => {
    const headers = ['User ID', 'Name', 'Email', 'Total Credits', 'Total Earned', 'Total Spent', 'Last Activity'];
    const csvData = users.map(user => [
      user.user_id,
      user.full_name,
      user.email,
      user.total_credits,
      user.total_earned,
      user.total_spent,
      new Date(user.last_activity).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `credits_report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === 'suspicious') return matchesSearch && user.suspicious_flags > 0;
    if (filterType === 'high_credits') return matchesSearch && user.total_credits > 1000;
    if (filterType === 'negative') return matchesSearch && user.total_credits < 0;
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Credits Administration</h1>
            <p className="text-gray-600">Manage user credits, monitor activity, and audit transactions</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={exportCSV} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={loadData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Credits</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCredits.toLocaleString()}</p>
                </div>
                <Coins className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Transactions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTransactions.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Suspicious Activity</p>
                  <p className="text-2xl font-bold text-red-600">{stats.suspiciousActivity}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="transactions">Transaction Log</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Label htmlFor="search">Search Users</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="filter">Filter</Label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="suspicious">Suspicious</SelectItem>
                        <SelectItem value="high_credits">High Credits</SelectItem>
                        <SelectItem value="negative">Negative Balance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>User Credits Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Total Credits</TableHead>
                        <TableHead>Earned</TableHead>
                        <TableHead>Spent</TableHead>
                        <TableHead>Last Activity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.user_id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user.full_name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Coins className="h-4 w-4 text-yellow-500" />
                              <span className={user.total_credits < 0 ? 'text-red-600' : 'text-green-600'}>
                                {user.total_credits.toLocaleString()}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-green-600">
                            +{user.total_earned.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-red-600">
                            -{user.total_spent.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {new Date(user.last_activity).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {user.suspicious_flags > 0 ? (
                              <Badge variant="destructive">
                                <Flag className="h-3 w-3 mr-1" />
                                Flagged
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Normal</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => setSelectedUser(user.user_id)}
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>User Credit Details</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Name</Label>
                                        <p className="font-medium">{user.full_name}</p>
                                      </div>
                                      <div>
                                        <Label>Email</Label>
                                        <p className="font-medium">{user.email}</p>
                                      </div>
                                    </div>
                                    {/* Add more detailed user info here */}
                                  </div>
                                </DialogContent>
                              </Dialog>
                              
                              <Dialog open={adjustDialogOpen && selectedUser === user.user_id} onOpenChange={setAdjustDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button 
                                    size="sm"
                                    onClick={() => {
                                      setSelectedUser(user.user_id);
                                      setAdjustDialogOpen(true);
                                    }}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Adjust Credits</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Action Type</Label>
                                      <Select value={adjustType} onValueChange={(value: 'add' | 'deduct') => setAdjustType(value)}>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="add">Add Credits</SelectItem>
                                          <SelectItem value="deduct">Deduct Credits</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div>
                                      <Label>Amount</Label>
                                      <Input
                                        type="number"
                                        value={adjustAmount}
                                        onChange={(e) => setAdjustAmount(e.target.value)}
                                        placeholder="Enter amount..."
                                      />
                                    </div>
                                    <div>
                                      <Label>Reason (Required)</Label>
                                      <Textarea
                                        value={adjustReason}
                                        onChange={(e) => setAdjustReason(e.target.value)}
                                        placeholder="Reason for adjustment..."
                                      />
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                      <Button variant="outline" onClick={() => setAdjustDialogOpen(false)}>
                                        Cancel
                                      </Button>
                                      <Button onClick={handleAdjustCredits}>
                                        Confirm {adjustType === 'add' ? 'Add' : 'Deduct'}
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>IP Address</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="text-sm">
                            {new Date(transaction.created_at).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-sm">
                            {transaction.user_id.slice(0, 8)}...
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              transaction.action_type === 'earn' ? 'default' :
                              transaction.action_type === 'spend' ? 'secondary' : 'destructive'
                            }>
                              {transaction.action_type}
                            </Badge>
                          </TableCell>
                          <TableCell className={transaction.credits_amount > 0 ? 'text-green-600' : 'text-red-600'}>
                            {transaction.credits_amount > 0 ? '+' : ''}{transaction.credits_amount}
                          </TableCell>
                          <TableCell className="text-sm">{transaction.reason}</TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {transaction.ip_address || 'N/A'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle>Admin Actions Log</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Admin audit trail will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminCredits;