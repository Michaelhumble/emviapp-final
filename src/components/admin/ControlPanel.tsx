
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Search, 
  Plus, 
  Minus, 
  Flag, 
  Rocket, 
  Award, 
  Clock, 
  User,
  RefreshCw
} from 'lucide-react';

type UserInfo = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  credits: number;
  boosted_until: string | null;
  is_flagged?: boolean;
};

type ActivityLogEntry = {
  id: string;
  activity_type: string;
  user_id: string;
  description: string;
  metadata: any;
  created_at: string;
  user_name?: string;
};

type ActionLog = ActivityLogEntry;

const ControlPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserInfo[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [creditsAmount, setCreditsAmount] = useState<number>(10);
  const [boostDays, setBoostDays] = useState<number>(7);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // Fetch action logs
  const fetchActionLogs = async () => {
    setLoadingLogs(true);
    try {
      const { data: logsData, error: logsError } = await supabase
        .from('activity_log')
        .select('*')
        .eq('activity_type', 'admin_action')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (logsError) throw logsError;
      
      // Fetch user names for each log
      if (logsData) {
        const logsWithUserInfo: ActionLog[] = await Promise.all(
          logsData.map(async (log) => {
            let userInfo = { user_name: 'Unknown User' };
            
            if (log.user_id) {
              const { data: userData } = await supabase
                .from('users')
                .select('full_name')
                .eq('id', log.user_id)
                .single();
              
              if (userData?.full_name) {
                userInfo.user_name = userData.full_name;
              }
            }
            
            return {
              ...log,
              ...userInfo
            } as ActionLog;
          })
        );
        
        setActionLogs(logsWithUserInfo);
      }
    } catch (error) {
      console.error('Error fetching action logs:', error);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetchActionLogs();
  }, []);

  const searchUsers = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, email, role, credits, boosted_until')
        .or(`full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`)
        .limit(10);
      
      if (error) throw error;
      
      // Add the is_flagged property with a default value
      const usersWithFlag = (data || []).map(user => ({
        ...user,
        is_flagged: false // Default value
      }));
      
      setSearchResults(usersWithFlag);
    } catch (error) {
      console.error('Error searching users:', error);
      toast.error('Failed to search users');
    } finally {
      setLoading(false);
    }
  };

  // Log admin action
  const logAdminAction = async (actionType: string, details: any) => {
    try {
      await supabase
        .from('activity_log')
        .insert({
          activity_type: 'admin_action',
          user_id: selectedUser?.id,
          description: actionType,
          metadata: {
            ...details,
            target_user: selectedUser?.full_name,
            target_email: selectedUser?.email
          }
        });
      
      // Refresh logs
      fetchActionLogs();
    } catch (error) {
      console.error('Error logging admin action:', error);
    }
  };

  // Handle credits adjustment
  const handleAdjustCredits = async (operation: 'add' | 'subtract') => {
    if (!selectedUser) return;
    
    const amount = operation === 'add' ? creditsAmount : -creditsAmount;
    const newCredits = (selectedUser.credits || 0) + amount;
    
    try {
      const { error } = await supabase
        .from('users')
        .update({ credits: newCredits })
        .eq('id', selectedUser.id);
      
      if (error) throw error;
      
      // Update selected user
      setSelectedUser({
        ...selectedUser,
        credits: newCredits
      });
      
      // Log the action
      await logAdminAction('adjust_credits', {
        amount,
        previous: selectedUser.credits,
        new: newCredits
      });
      
      toast.success(`Credits ${operation === 'add' ? 'added to' : 'subtracted from'} user`);
    } catch (error) {
      console.error('Error adjusting credits:', error);
      toast.error('Failed to adjust credits');
    }
  };

  // Handle flag user
  const handleFlagUser = async () => {
    if (!selectedUser) return;
    
    const newFlagStatus = !selectedUser.is_flagged;
    
    try {
      // This is a mock implementation since the is_flagged column doesn't exist
      // In a real app, you would update the database here
      /*
      const { error } = await supabase
        .from('users')
        .update({ is_flagged: newFlagStatus })
        .eq('id', selectedUser.id);
      
      if (error) throw error;
      */
      
      // Update selected user locally only for demo purposes
      setSelectedUser({
        ...selectedUser,
        is_flagged: newFlagStatus
      });
      
      // Log the action
      await logAdminAction('flag_user', {
        flag_status: newFlagStatus
      });
      
      toast.success(`User ${newFlagStatus ? 'flagged' : 'unflagged'} successfully`);
    } catch (error) {
      console.error('Error flagging user:', error);
      toast.error('Failed to update flag status');
    }
  };

  // Handle grant boost
  const handleGrantBoost = async () => {
    if (!selectedUser) return;
    
    const today = new Date();
    const boostUntil = new Date(today.setDate(today.getDate() + boostDays));
    
    try {
      const { error } = await supabase
        .from('users')
        .update({ boosted_until: boostUntil.toISOString() })
        .eq('id', selectedUser.id);
      
      if (error) throw error;
      
      // Update selected user
      setSelectedUser({
        ...selectedUser,
        boosted_until: boostUntil.toISOString()
      });
      
      // Log the action
      await logAdminAction('grant_boost', {
        days: boostDays,
        expires: boostUntil.toISOString()
      });
      
      toast.success(`Boost granted for ${boostDays} days`);
    } catch (error) {
      console.error('Error granting boost:', error);
      toast.error('Failed to grant boost');
    }
  };

  // Handle trigger reward
  const handleTriggerReward = async () => {
    if (!selectedUser) return;
    
    try {
      // Award 50 credits to the user
      const { error } = await supabase.rpc('award_credits', {
        p_user_id: selectedUser.id,
        p_action_type: 'admin_reward',
        p_value: 50,
        p_description: 'Manual admin reward'
      });
      
      if (error) throw error;
      
      // Update selected user
      setSelectedUser({
        ...selectedUser,
        credits: (selectedUser.credits || 0) + 50
      });
      
      // Log the action
      await logAdminAction('trigger_reward', {
        reward_type: 'admin_reward',
        credits: 50
      });
      
      toast.success('Reward triggered successfully');
    } catch (error) {
      console.error('Error triggering reward:', error);
      toast.error('Failed to trigger reward');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Column - User Search */}
      <div className="md:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>User Control</CardTitle>
            <CardDescription>Search for a user to manage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by name or email..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchUsers()}
                  />
                </div>
                <Button onClick={searchUsers} disabled={loading}>
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </div>
              
              {searchResults.length > 0 && (
                <div className="border rounded-md divide-y max-h-48 overflow-y-auto">
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      className={`p-2 hover:bg-gray-50 cursor-pointer ${
                        selectedUser?.id === user.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="font-medium">{user.full_name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      <div className="flex mt-1 gap-2">
                        <Badge className="text-xs">{user.role}</Badge>
                        <Badge variant="outline" className="text-xs">
                          {user.credits || 0} credits
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {selectedUser && (
          <Card>
            <CardHeader>
              <CardTitle>Selected User</CardTitle>
              <CardDescription>Make changes to this user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-6 w-6 text-gray-400" />
                  <div>
                    <div className="font-medium">{selectedUser.full_name}</div>
                    <div className="text-sm text-gray-500">{selectedUser.email}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="text-sm font-medium">Role:</div>
                  <div className="text-sm">
                    <Badge>{selectedUser.role}</Badge>
                  </div>
                  
                  <div className="text-sm font-medium">Credits:</div>
                  <div className="text-sm">{selectedUser.credits || 0}</div>
                  
                  <div className="text-sm font-medium">Boost Status:</div>
                  <div className="text-sm">
                    {selectedUser.boosted_until && new Date(selectedUser.boosted_until) > new Date() ? (
                      <Badge className="bg-green-100 text-green-800">
                        Until {new Date(selectedUser.boosted_until).toLocaleDateString()}
                      </Badge>
                    ) : (
                      <Badge variant="outline">Not Active</Badge>
                    )}
                  </div>
                  
                  <div className="text-sm font-medium">Flag Status:</div>
                  <div className="text-sm">
                    <Badge className={selectedUser.is_flagged ? 'bg-red-100 text-red-800' : 'bg-gray-100'}>
                      {selectedUser.is_flagged ? 'Flagged' : 'Normal'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Middle Column - Control Actions */}
      <div className="md:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Control Actions</CardTitle>
            <CardDescription>Perform administrative actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Credits Management */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Credit Management
                </h4>
                
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    min="1"
                    value={creditsAmount}
                    onChange={(e) => setCreditsAmount(parseInt(e.target.value) || 0)}
                  />
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleAdjustCredits('add')}
                      disabled={!selectedUser}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleAdjustCredits('subtract')}
                      disabled={!selectedUser}
                    >
                      <Minus className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Flag User */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-1">
                  <Flag className="h-4 w-4" />
                  Flag Management
                </h4>
                <Button 
                  variant={selectedUser?.is_flagged ? "default" : "outline"}
                  className="w-full"
                  onClick={handleFlagUser}
                  disabled={!selectedUser}
                >
                  {selectedUser?.is_flagged ? 'Remove Flag' : 'Flag Account'}
                </Button>
              </div>
              
              {/* Grant Boost */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-1">
                  <Rocket className="h-4 w-4" />
                  Boost Management
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      max="90"
                      value={boostDays}
                      onChange={(e) => setBoostDays(parseInt(e.target.value) || 7)}
                    />
                    <span className="text-sm">days</span>
                  </div>
                  <Button 
                    onClick={handleGrantBoost}
                    disabled={!selectedUser}
                  >
                    Grant Boost
                  </Button>
                </div>
              </div>
              
              {/* Trigger Reward */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  Reward Management
                </h4>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleTriggerReward}
                  disabled={!selectedUser}
                >
                  <Award className="h-4 w-4 mr-1" />
                  Grant 50 Credit Reward
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <p className="text-xs text-gray-500">
              All actions are logged and cannot be undone. Use with care.
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Right Column - Activity Logs */}
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Recent Actions</CardTitle>
            <CardDescription>Admin activity log</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[500px] overflow-y-auto">
            {loadingLogs ? (
              <div className="flex justify-center py-8">
                <Clock className="h-5 w-5 animate-spin text-gray-400" />
              </div>
            ) : actionLogs.length > 0 ? (
              <div className="space-y-3">
                {actionLogs.map((log) => (
                  <div key={log.id} className="border rounded-md p-3">
                    <div className="flex justify-between">
                      <Badge>{log.description}</Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">User:</span> {log.user_name}
                    </div>
                    <div className="mt-1 text-xs text-gray-600">
                      {JSON.stringify(log.metadata)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No recent actions to display
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={fetchActionLogs}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh Logs
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ControlPanel;
