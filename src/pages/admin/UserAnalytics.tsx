import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  Download,
  RefreshCw,
  UserPlus,
  PieChart,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

interface UserStats {
  totalUsers: number;
  totalGrowth: number;
  recentSignups: number;
  usersByRole: { role: string; count: number; percentage: number }[];
  dailySignups: { date: string; signups: number }[];
  weeklySignups: { week: string; signups: number }[];
  monthlySignups: { month: string; signups: number }[];
  latestUsers: {
    id: string;
    full_name: string;
    email: string;
    role: string;
    created_at: string;
  }[];
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const UserAnalytics = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    totalGrowth: 0,
    recentSignups: 0,
    usersByRole: [],
    dailySignups: [],
    weeklySignups: [],
    monthlySignups: [],
    latestUsers: []
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Check admin access - use same check as existing admin dashboard
  useEffect(() => {
    if (!user || user.email !== 'humbleinsider@gmail.com') {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  const fetchUserAnalytics = async () => {
    setLoading(true);
    try {
      // Get total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get users from last month for growth calculation
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      
      const { count: lastMonthUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .lt('created_at', lastMonth.toISOString());

      const totalGrowth = lastMonthUsers ? 
        Math.round(((totalUsers || 0) - lastMonthUsers) / lastMonthUsers * 100) : 0;

      // Get recent signups (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { count: recentSignups } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString());

      // Get users by role
      const { data: roleData } = await supabase
        .from('profiles')
        .select('role')
        .not('role', 'is', null);

      const roleStats = roleData?.reduce((acc: any, user) => {
        const role = user.role || 'other';
        acc[role] = (acc[role] || 0) + 1;
        return acc;
      }, {}) || {};

      const usersByRole = Object.entries(roleStats).map(([role, count]) => ({
        role,
        count: count as number,
        percentage: Math.round((count as number) / (totalUsers || 1) * 100)
      }));

      // Get daily signups (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: dailyData } = await supabase
        .from('profiles')
        .select('created_at')
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: true });

      const dailySignups = dailyData?.reduce((acc: any, user) => {
        const date = new Date(user.created_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {}) || {};

      const dailySignupsArray = Object.entries(dailySignups).map(([date, signups]) => ({
        date,
        signups: signups as number
      }));

      // Get weekly signups (last 12 weeks)
      const twelveWeeksAgo = new Date();
      twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - 84);

      const { data: weeklyData } = await supabase
        .from('profiles')
        .select('created_at')
        .gte('created_at', twelveWeeksAgo.toISOString());

      const weeklySignups = weeklyData?.reduce((acc: any, user) => {
        const week = new Date(user.created_at).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
        acc[week] = (acc[week] || 0) + 1;
        return acc;
      }, {}) || {};

      const weeklySignupsArray = Object.entries(weeklySignups).map(([week, signups]) => ({
        week,
        signups: signups as number
      }));

      // Get monthly signups (last 12 months)
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

      const { data: monthlyData } = await supabase
        .from('profiles')
        .select('created_at')
        .gte('created_at', twelveMonthsAgo.toISOString());

      const monthlySignups = monthlyData?.reduce((acc: any, user) => {
        const month = new Date(user.created_at).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short' 
        });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {}) || {};

      const monthlySignupsArray = Object.entries(monthlySignups).map(([month, signups]) => ({
        month,
        signups: signups as number
      }));

      // Get latest 20 users
      const { data: latestUsers } = await supabase
        .from('profiles')
        .select('id, full_name, email, role, created_at')
        .order('created_at', { ascending: false })
        .limit(20);

      setStats({
        totalUsers: totalUsers || 0,
        totalGrowth,
        recentSignups: recentSignups || 0,
        usersByRole,
        dailySignups: dailySignupsArray,
        weeklySignups: weeklySignupsArray,
        monthlySignups: monthlySignupsArray,
        latestUsers: latestUsers || []
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to fetch analytics data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user && user.email === 'humbleinsider@gmail.com') {
      fetchUserAnalytics();
    }
  }, [user]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUserAnalytics();
  };

  const exportToCsv = () => {
    const csvData = [
      ['Username', 'Email', 'Role', 'Signup Date'],
      ...stats.latestUsers.map(user => [
        user.full_name || 'N/A',
        user.email,
        user.role || 'N/A',
        new Date(user.created_at).toLocaleDateString()
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `user-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPdf = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('User Analytics Report', 20, 20);
    
    // Date
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);
    
    // Stats
    doc.setFontSize(14);
    doc.text('Key Metrics:', 20, 50);
    doc.setFontSize(10);
    doc.text(`Total Users: ${stats.totalUsers}`, 20, 60);
    doc.text(`Growth: ${stats.totalGrowth}%`, 20, 70);
    doc.text(`Recent Signups (7d): ${stats.recentSignups}`, 20, 80);
    
    // Role breakdown
    doc.setFontSize(14);
    doc.text('Users by Role:', 20, 100);
    doc.setFontSize(10);
    stats.usersByRole.forEach((role, index) => {
      doc.text(`${role.role}: ${role.count} (${role.percentage}%)`, 20, 110 + index * 10);
    });
    
    // Latest users table
    doc.setFontSize(14);
    doc.text('Latest 20 Users:', 20, 160);
    doc.setFontSize(8);
    stats.latestUsers.slice(0, 15).forEach((user, index) => {
      const y = 170 + index * 8;
      doc.text(`${user.full_name || 'N/A'}`, 20, y);
      doc.text(`${user.email}`, 70, y);
      doc.text(`${user.role || 'N/A'}`, 120, y);
      doc.text(`${new Date(user.created_at).toLocaleDateString()}`, 160, y);
    });
    
    doc.save(`user-analytics-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Analytics Dashboard</h1>
          <p className="text-muted-foreground">Live user data and growth metrics</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportToCsv}>
            <Download className="h-4 w-4 mr-2" />
            CSV
          </Button>
          <Button variant="outline" size="sm" onClick={exportToPdf}>
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalGrowth > 0 ? '+' : ''}{stats.totalGrowth}% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Signups</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentSignups}</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalGrowth > 0 ? '+' : ''}{stats.totalGrowth}%
            </div>
            <p className="text-xs text-muted-foreground">Monthly growth rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Growth Trends</TabsTrigger>
          <TabsTrigger value="users">Latest Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Users by Role
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={stats.usersByRole}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ role, percentage }) => `${role}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {stats.usersByRole.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Role Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.usersByRole}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="role" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Signups (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stats.dailySignups}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="signups" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Signups (Last 12 Weeks)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.weeklySignups}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="signups" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Signups (Last 12 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stats.monthlySignups}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="signups" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Latest 20 User Signups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">Email</th>
                      <th className="text-left py-2">Role</th>
                      <th className="text-left py-2">Signup Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.latestUsers.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="py-2">{user.full_name || 'N/A'}</td>
                        <td className="py-2">{user.email}</td>
                        <td className="py-2">
                          <span className="px-2 py-1 bg-muted rounded-md text-xs">
                            {user.role || 'N/A'}
                          </span>
                        </td>
                        <td className="py-2">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserAnalytics;