import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, UserPlus, Mail, Phone, Star, Crown, 
  Settings, Trash2, Edit, Send, Copy, Gift,
  Award, TrendingUp, Calendar, DollarSign
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TeamMember {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  role: 'owner' | 'manager' | 'artist';
  status: 'active' | 'pending' | 'inactive';
  invitation_sent_at?: string;
  accepted_at?: string;
  performance?: {
    bookings: number;
    revenue: number;
    rating: number;
    monthlyGrowth: number;
  };
}

interface SalonTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  salonId?: string;
}

const SalonTeamModal: React.FC<SalonTeamModalProps> = ({ 
  isOpen, 
  onClose, 
  salonId 
}) => {
  const { userProfile } = useAuth();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: '',
    full_name: '',
    role: 'artist' as 'owner' | 'manager' | 'artist'
  });

  useEffect(() => {
    if (isOpen && salonId) {
      fetchTeamMembers();
    }
  }, [isOpen, salonId]);

  const fetchTeamMembers = async () => {
    if (!salonId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('salon_staff')
        .select(`
          *,
          user:users(full_name, avatar_url, phone)
        `)
        .eq('salon_id', salonId);

      if (error) throw error;

      // Add mock performance data for demonstration
      const membersWithPerformance = data?.map(member => ({
        ...member,
        full_name: member.user?.full_name || member.full_name,
        phone: member.phone || '',
        role: member.role as 'owner' | 'manager' | 'artist',
        performance: {
          bookings: Math.floor(Math.random() * 50) + 10,
          revenue: Math.floor(Math.random() * 3000) + 1000,
          rating: 4.2 + Math.random() * 0.8,
          monthlyGrowth: Math.floor(Math.random() * 40) - 10
        }
      })) || [];

      setTeamMembers(membersWithPerformance);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const inviteTeamMember = async () => {
    if (!salonId || !inviteForm.email || !inviteForm.full_name) {
      toast.error('Please fill in all required fields');
      return;
    }

    setInviting(true);
    try {
      const { data, error } = await supabase.rpc('send_team_invite', {
        p_salon_id: salonId,
        p_email: inviteForm.email,
        p_role: inviteForm.role,
        p_full_name: inviteForm.full_name
      });

      if (error) throw error;

      toast.success('Invitation sent successfully!');
      setInviteForm({ email: '', full_name: '', role: 'artist' });
      await fetchTeamMembers();
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast.error('Failed to send invitation');
    } finally {
      setInviting(false);
    }
  };

  const updateMemberRole = async (memberId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('salon_staff')
        .update({ role: newRole })
        .eq('id', memberId);

      if (error) throw error;

      setTeamMembers(prev => prev.map(member => 
        member.id === memberId ? { ...member, role: newRole as any } : member
      ));
      toast.success('Role updated successfully!');
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role');
    }
  };

  const removeMember = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('salon_staff')
        .update({ status: 'inactive' })
        .eq('id', memberId);

      if (error) throw error;

      setTeamMembers(prev => prev.filter(member => member.id !== memberId));
      toast.success('Team member removed successfully!');
    } catch (error) {
      console.error('Error removing member:', error);
      toast.error('Failed to remove team member');
    }
  };

  const generateInviteLink = () => {
    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const inviteLink = `${window.location.origin}/join/${inviteCode}`;
    navigator.clipboard.writeText(inviteLink);
    toast.success('Invite link copied to clipboard!');
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'manager': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'artist': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-3">Loading team members...</span>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <Users className="h-6 w-6 text-blue-600" />
              Team Management
              <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                {teamMembers.filter(m => m.status === 'active').length} active members
              </Badge>
            </DialogTitle>
            <Button
              onClick={generateInviteLink}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Gift className="h-4 w-4 mr-2" />
              Quick Invite Link
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="team" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="team">Team Members</TabsTrigger>
            <TabsTrigger value="invite">Invite New Member</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="team" className="space-y-4">
            {teamMembers.length > 0 ? (
              <div className="grid gap-4">
                {teamMembers.map((member) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group"
                  >
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {member.full_name?.charAt(0) || member.email.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{member.full_name || 'Unnamed'}</h3>
                              <p className="text-gray-600">{member.email}</p>
                              {member.phone && (
                                <p className="text-sm text-gray-500">{member.phone}</p>
                              )}
                              <div className="flex gap-2 mt-2">
                                <Badge className={getRoleColor(member.role)}>
                                  {member.role === 'owner' && <Crown className="h-3 w-3 mr-1" />}
                                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                                </Badge>
                                <Badge className={getStatusColor(member.status)}>
                                  {member.status}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            {member.performance && member.status === 'active' && (
                              <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                  <p className="text-2xl font-bold text-blue-600">{member.performance.bookings}</p>
                                  <p className="text-xs text-gray-500">Bookings</p>
                                </div>
                                <div>
                                  <p className="text-2xl font-bold text-green-600">${member.performance.revenue.toLocaleString()}</p>
                                  <p className="text-xs text-gray-500">Revenue</p>
                                </div>
                                <div>
                                  <div className="flex items-center justify-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span className="text-xl font-bold">{member.performance.rating.toFixed(1)}</span>
                                  </div>
                                  <p className="text-xs text-gray-500">Rating</p>
                                </div>
                              </div>
                            )}

                            <div className="flex gap-2">
                              {member.role !== 'owner' && (
                                <>
                                  <Button size="sm" variant="outline">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => removeMember(member.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              <Button size="sm" variant="outline">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {member.status === 'pending' && (
                          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-sm text-yellow-800">
                              Invitation sent on {new Date(member.invitation_sent_at || '').toLocaleDateString()}. 
                              Waiting for them to accept.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold mb-2">No Team Members Yet</h3>
                <p>Start building your dream team by inviting talented artists!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="invite" className="space-y-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-purple-600" />
                  Invite New Team Member
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      placeholder="Enter full name"
                      value={inviteForm.full_name}
                      onChange={(e) => setInviteForm({...inviteForm, full_name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={inviteForm.email}
                      onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    value={inviteForm.role}
                    onChange={(e) => setInviteForm({...inviteForm, role: e.target.value as any})}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="artist">Artist</option>
                    <option value="manager">Manager</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-1">
                    Artists can manage their bookings. Managers can access analytics and team management.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={inviteTeamMember}
                    disabled={inviting || !inviteForm.email || !inviteForm.full_name}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    {inviting ? 'Sending...' : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Invitation
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={generateInviteLink}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Quick Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Referral Rewards */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-gold-50 to-yellow-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-yellow-500 rounded-lg">
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-yellow-900">Referral Rewards</h3>
                    <p className="text-sm text-yellow-700">Earn rewards for successful team hires!</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-yellow-800">+50</p>
                    <p className="text-xs text-yellow-600">Credits per hire</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-800">10%</p>
                    <p className="text-xs text-yellow-600">First month commission</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-800">3</p>
                    <p className="text-xs text-yellow-600">Successful hires</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-100">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-blue-500 rounded-lg inline-block mb-3">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-blue-900 mb-1">Team Bookings</h3>
                  <p className="text-3xl font-bold text-blue-800">
                    {teamMembers.reduce((total, member) => total + (member.performance?.bookings || 0), 0)}
                  </p>
                  <p className="text-sm text-blue-600">This month</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-100">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-green-500 rounded-lg inline-block mb-3">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-green-900 mb-1">Team Revenue</h3>
                  <p className="text-3xl font-bold text-green-800">
                    ${teamMembers.reduce((total, member) => total + (member.performance?.revenue || 0), 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">This month</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-100">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-yellow-500 rounded-lg inline-block mb-3">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-yellow-900 mb-1">Avg Rating</h3>
                  <p className="text-3xl font-bold text-yellow-800">
                    {teamMembers.length > 0 
                      ? (teamMembers.reduce((total, member) => total + (member.performance?.rating || 0), 0) / teamMembers.length).toFixed(1)
                      : '0.0'
                    }
                  </p>
                  <p className="text-sm text-yellow-600">Team average</p>
                </CardContent>
              </Card>
            </div>

            {/* Top Performers */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  Top Performers This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamMembers
                    .filter(m => m.status === 'active' && m.performance)
                    .sort((a, b) => (b.performance?.revenue || 0) - (a.performance?.revenue || 0))
                    .slice(0, 3)
                    .map((member, index) => (
                      <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold">{member.full_name}</h4>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${member.performance?.revenue.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{member.performance?.bookings} bookings</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SalonTeamModal;