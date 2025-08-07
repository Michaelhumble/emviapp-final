import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, Crown, Sparkles, TrendingUp, Share2, Heart,
  Award, Gift, Star, Zap, Target, MessageSquare,
  Search, Plus, Filter, Eye, RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { supabaseBypass } from '@/types/supabase-bypass';

interface NetworkUser {
  id: string;
  full_name: string;
  avatar_url: string;
  role: string;
  location: string;
  total_connections: number;
  bookings_made: number;
  bookings_received: number;
  referrals_sent: number;
  referrals_received: number;
  social_shares: number;
  network_score: number;
  last_active: string;
  growth_trend: 'rising' | 'stable' | 'declining';
  influence_level: 'micro' | 'macro' | 'mega';
}

interface NetworkConnection {
  id: string;
  from_user: NetworkUser;
  to_user: NetworkUser;
  connection_type: 'booking' | 'referral' | 'social_share' | 'story_engagement';
  value_exchanged: number;
  created_at: string;
  success_rate: number;
}

interface IncentiveProgram {
  id: string;
  name: string;
  type: 'referral_bonus' | 'viral_multiplier' | 'loyalty_reward' | 'network_seed';
  description: string;
  reward_amount: number;
  target_metric: string;
  participants: number;
  success_rate: number;
  active: boolean;
  expires_at: string;
}

interface NetworkSeedingProps {
  onNetworkAction?: (action: string, data: any) => void;
}

const NetworkSeeding: React.FC<NetworkSeedingProps> = ({ onNetworkAction }) => {
  const { user } = useAuth();
  const [networkUsers, setNetworkUsers] = useState<NetworkUser[]>([]);
  const [connections, setConnections] = useState<NetworkConnection[]>([]);
  const [incentives, setIncentives] = useState<IncentiveProgram[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'influencers' | 'active' | 'new'>('all');
  const [activeTab, setActiveTab] = useState<'network' | 'connections' | 'incentives' | 'seed'>('network');

  useEffect(() => {
    loadNetworkData();
  }, [selectedFilter]);

  const loadNetworkData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadNetworkUsers(),
        loadConnections(),
        loadIncentivePrograms()
      ]);
    } catch (error) {
      console.error('Error loading network data:', error);
      toast.error('Failed to load network data');
    } finally {
      setLoading(false);
    }
  };

  const loadNetworkUsers = async () => {
    // Mock network users data
    const mockUsers: NetworkUser[] = [
      {
        id: '1',
        full_name: 'Sarah Chen',
        avatar_url: '',
        role: 'customer',
        location: 'Los Angeles, CA',
        total_connections: 45,
        bookings_made: 23,
        bookings_received: 0,
        referrals_sent: 12,
        referrals_received: 3,
        social_shares: 67,
        network_score: 890,
        last_active: '2024-01-15T10:30:00Z',
        growth_trend: 'rising',
        influence_level: 'macro'
      },
      {
        id: '2',
        full_name: 'Maya Chen',
        avatar_url: '',
        role: 'artist',
        location: 'Beverly Hills, CA',
        total_connections: 78,
        bookings_made: 5,
        bookings_received: 156,
        referrals_sent: 8,
        referrals_received: 24,
        social_shares: 43,
        network_score: 1240,
        last_active: '2024-01-15T09:15:00Z',
        growth_trend: 'rising',
        influence_level: 'mega'
      },
      {
        id: '3',
        full_name: 'Jessica Rodriguez',
        avatar_url: '',
        role: 'customer',
        location: 'West Hollywood, CA',
        total_connections: 32,
        bookings_made: 18,
        bookings_received: 0,
        referrals_sent: 6,
        referrals_received: 2,
        social_shares: 34,
        network_score: 567,
        last_active: '2024-01-14T16:45:00Z',
        growth_trend: 'stable',
        influence_level: 'micro'
      }
    ];
    
    setNetworkUsers(mockUsers);
  };

  const loadConnections = async () => {
    // Mock network connections
    const mockConnections: NetworkConnection[] = [
      {
        id: '1',
        from_user: networkUsers[0] || {} as NetworkUser,
        to_user: networkUsers[1] || {} as NetworkUser,
        connection_type: 'booking',
        value_exchanged: 120,
        created_at: '2024-01-15T10:30:00Z',
        success_rate: 98.5
      },
      {
        id: '2',
        from_user: networkUsers[0] || {} as NetworkUser,
        to_user: networkUsers[2] || {} as NetworkUser,
        connection_type: 'referral',
        value_exchanged: 50,
        created_at: '2024-01-14T14:20:00Z',
        success_rate: 85.3
      }
    ];
    
    setConnections(mockConnections);
  };

  const loadIncentivePrograms = async () => {
    // Mock incentive programs
    const mockIncentives: IncentiveProgram[] = [
      {
        id: '1',
        name: 'Viral Share Multiplier',
        type: 'viral_multiplier',
        description: 'Double points for social media shares during peak hours',
        reward_amount: 100,
        target_metric: 'social_shares',
        participants: 1247,
        success_rate: 73.2,
        active: true,
        expires_at: '2024-02-15T23:59:59Z'
      },
      {
        id: '2',
        name: 'Golden Referral Bonus',
        type: 'referral_bonus',
        description: 'Extra $25 credit for each successful referral this month',
        reward_amount: 25,
        target_metric: 'referrals',
        participants: 567,
        success_rate: 89.6,
        active: true,
        expires_at: '2024-01-31T23:59:59Z'
      },
      {
        id: '3',
        name: 'Network Seed Fund',
        type: 'network_seed',
        description: 'Special invites and bonuses for high-influence users',
        reward_amount: 200,
        target_metric: 'network_growth',
        participants: 45,
        success_rate: 94.1,
        active: true,
        expires_at: '2024-03-01T23:59:59Z'
      }
    ];
    
    setIncentives(mockIncentives);
  };

  const inviteInfluencer = async (userId: string) => {
    try {
      await supabaseBypass
        .from('network_invitations')
        .insert({
          inviter_id: user?.id,
          invitee_id: userId,
          invitation_type: 'influencer_program',
          bonus_amount: 100,
          special_perks: ['early_access', 'exclusive_offers', 'priority_support']
        });
      
      toast.success('Influencer invitation sent! 🌟');
      onNetworkAction?.('invite_influencer', { userId });
    } catch (error) {
      console.error('Error inviting influencer:', error);
      toast.error('Failed to send invitation');
    }
  };

  const boostUser = async (userId: string, boostType: string) => {
    try {
      await supabaseBypass
        .from('user_boosts')
        .insert({
          user_id: userId,
          boost_type: boostType,
          multiplier: 2.0,
          duration_hours: 24,
          boosted_by: user?.id
        });
      
      toast.success(`User boosted with ${boostType}! 🚀`);
      onNetworkAction?.('boost_user', { userId, boostType });
    } catch (error) {
      console.error('Error boosting user:', error);
      toast.error('Failed to boost user');
    }
  };

  const createIncentive = async (incentiveData: Partial<IncentiveProgram>) => {
    try {
      await supabaseBypass
        .from('incentive_programs')
        .insert({
          ...incentiveData,
          created_by: user?.id,
          created_at: new Date().toISOString()
        });
      
      toast.success('New incentive program created! 🎁');
      loadIncentivePrograms();
    } catch (error) {
      console.error('Error creating incentive:', error);
      toast.error('Failed to create incentive');
    }
  };

  const getInfluenceBadgeColor = (level: string) => {
    switch (level) {
      case 'mega': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'macro': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'micro': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'declining': return <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  const filteredUsers = networkUsers.filter(user => {
    if (searchQuery && !user.full_name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    switch (selectedFilter) {
      case 'influencers':
        return user.influence_level === 'macro' || user.influence_level === 'mega';
      case 'active':
        return new Date(user.last_active) > new Date(Date.now() - 24 * 60 * 60 * 1000);
      case 'new':
        return new Date(user.last_active) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      {/* Network Header */}
      <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-200/30">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Users className="h-5 w-5 mr-2" />
            Network Seeding & Growth Engine
          </CardTitle>
          <p className="text-green-200 text-sm mt-1">
            Guide core users to maximize viral mechanics and network connections
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{networkUsers.length}</div>
              <div className="text-sm text-green-200">Network Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{connections.length}</div>
              <div className="text-sm text-green-200">Active Connections</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {networkUsers.reduce((sum, user) => sum + user.network_score, 0).toLocaleString()}
              </div>
              <div className="text-sm text-green-200">Total Network Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{incentives.filter(i => i.active).length}</div>
              <div className="text-sm text-green-200">Active Incentives</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'influencers', label: 'Influencers' },
              { key: 'active', label: 'Active' },
              { key: 'new', label: 'New' }
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={selectedFilter === key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedFilter(key as typeof selectedFilter)}
                className={`${
                  selectedFilter === key
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                    : 'bg-white/10 hover:bg-white/20'
                } text-white`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
        
        <Button
          onClick={loadNetworkData}
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          {loading ? (
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh Network
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2">
        {[
          { key: 'network', label: 'Network Users', icon: Users },
          { key: 'connections', label: 'Connections', icon: Share2 },
          { key: 'incentives', label: 'Incentives', icon: Gift },
          { key: 'seed', label: 'Seed Actions', icon: Sparkles }
        ].map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            variant={activeTab === key ? 'default' : 'ghost'}
            onClick={() => setActiveTab(key as typeof activeTab)}
            className={`flex items-center space-x-2 ${
              activeTab === key
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-white/10 hover:bg-white/20 border-white/20'
            } text-white`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'network' && (
          <motion.div
            key="network"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {filteredUsers.map((user) => (
              <Card key={user.id} className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                        {user.full_name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-white">{user.full_name}</h3>
                          <Badge className={getInfluenceBadgeColor(user.influence_level)}>
                            <Crown className="h-3 w-3 mr-1" />
                            {user.influence_level}
                          </Badge>
                          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                            {user.role}
                          </Badge>
                          {getTrendIcon(user.growth_trend)}
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{user.location}</p>
                        <div className="grid grid-cols-4 gap-4 text-xs text-gray-400">
                          <div>
                            <span className="text-white font-medium">{user.network_score}</span>
                            <div>Network Score</div>
                          </div>
                          <div>
                            <span className="text-white font-medium">{user.total_connections}</span>
                            <div>Connections</div>
                          </div>
                          <div>
                            <span className="text-white font-medium">{user.social_shares}</span>
                            <div>Shares</div>
                          </div>
                          <div>
                            <span className="text-white font-medium">{user.referrals_sent}</span>
                            <div>Referrals</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => inviteInfluencer(user.id)}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                      >
                        <Crown className="h-3 w-3 mr-1" />
                        Invite
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => boostUser(user.id, 'viral_multiplier')}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Boost
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {activeTab === 'incentives' && (
          <motion.div
            key="incentives"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Active Incentive Programs</h3>
              <Button
                onClick={() => createIncentive({
                  name: 'Flash Viral Boost',
                  type: 'viral_multiplier',
                  description: '3x points for next 48 hours',
                  reward_amount: 150,
                  target_metric: 'social_engagement'
                })}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Incentive
              </Button>
            </div>
            
            {incentives.map((incentive) => (
              <Card key={incentive.id} className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white">{incentive.name}</h3>
                      <p className="text-sm text-gray-300">{incentive.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${
                        incentive.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {incentive.active ? 'Active' : 'Inactive'}
                      </Badge>
                      <span className="text-lg font-bold text-white">${incentive.reward_amount}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-white">{incentive.participants}</div>
                      <div className="text-xs text-gray-400">Participants</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{incentive.success_rate}%</div>
                      <div className="text-xs text-gray-400">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{incentive.target_metric}</div>
                      <div className="text-xs text-gray-400">Target Metric</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NetworkSeeding;