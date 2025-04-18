
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Users, Calendar, Share2, Briefcase, Building2, MessageSquare, Bot } from 'lucide-react';
import CommandCenterLayout from '@/components/command-center/CommandCenterLayout';

interface AdminStats {
  totalUsers: number;
  recentSignups: number;
  totalReferrals: number;
  totalJobs: number;
  totalSalons: number;
  totalMessages: number;
  aiConversations: number;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    recentSignups: 0,
    totalReferrals: 0,
    totalJobs: 0,
    totalSalons: 0,
    totalMessages: 0,
    aiConversations: 0
  });
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!user || user.email !== 'humbleinsider@gmail.com') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // Fetch total users
      const { count: totalUsers } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      // Fetch recent signups
      const { count: recentSignups } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString());

      // Fetch total referrals
      const { count: totalReferrals } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true });

      // Fetch total jobs
      const { count: totalJobs } = await supabase
        .from('jobs')
        .select('*', { count: 'exact', head: true });

      // Fetch total salons
      const { count: totalSalons } = await supabase
        .from('salons')
        .select('*', { count: 'exact', head: true });

      // Fetch total messages
      const { count: totalMessages } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true });

      // Fetch AI conversations count
      const { count: aiConversations } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('recipient_id', 'support-agent');

      setStats({
        totalUsers: totalUsers || 0,
        recentSignups: recentSignups || 0,
        totalReferrals: totalReferrals || 0,
        totalJobs: totalJobs || 0,
        totalSalons: totalSalons || 0,
        totalMessages: totalMessages || 0,
        aiConversations: aiConversations || 0
      });
    };

    fetchStats();
  }, [user, navigate]);

  const StatCard = ({ title, value, icon: Icon }: { title: string; value: number; icon: any }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <Icon className="h-5 w-5 text-blue-500" />
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  return (
    <CommandCenterLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Users" value={stats.totalUsers} icon={Users} />
          <StatCard title="Signups (7d)" value={stats.recentSignups} icon={Calendar} />
          <StatCard title="Total Referrals" value={stats.totalReferrals} icon={Share2} />
          <StatCard title="Jobs Posted" value={stats.totalJobs} icon={Briefcase} />
          <StatCard title="Salons Created" value={stats.totalSalons} icon={Building2} />
          <StatCard title="Messages Sent" value={stats.totalMessages} icon={MessageSquare} />
          <StatCard title="AI Conversations" value={stats.aiConversations} icon={Bot} />
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium mb-4">Roadmap Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add roadmap notes here..."
          />
        </div>
      </div>
    </CommandCenterLayout>
  );
};

export default AdminDashboard;
