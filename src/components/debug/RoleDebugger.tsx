
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { normalizeRole } from '@/utils/navigation';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/context/auth/types';

/**
 * A debugging component to display user role information
 * This helps diagnose role-based navigation issues
 */
const RoleDebugger = () => {
  const { user, userRole, userProfile, refreshUserProfile } = useAuth();
  const [databaseRole, setDatabaseRole] = useState<string | null>(null);
  const [cachedRole, setCachedRole] = useState<string | null>(null);
  const [normalizedRole, setNormalizedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Get the role from localStorage
    const storedRole = localStorage.getItem('emviapp_user_role');
    setCachedRole(storedRole);
    
    // Set the normalized role based on current role
    if (userRole) {
      setNormalizedRole(normalizeRole(userRole as UserRole));
    }
    
    // Fetch the role directly from the database if user exists
    if (user?.id) {
      const fetchDatabaseRole = async () => {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();
          
        if (!error && data) {
          setDatabaseRole(data.role);
        } else {
          console.error('Error fetching role from database:', error);
          setDatabaseRole('Error fetching role');
        }
      };
      
      fetchDatabaseRole();
    }
  }, [user, userRole]);
  
  const handleUpdateRole = async (newRole: UserRole) => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Update localStorage
      localStorage.setItem('emviapp_user_role', newRole);
      
      // Refresh the user profile
      await refreshUserProfile();
      
      // Update local state
      setDatabaseRole(newRole);
      setCachedRole(newRole);
      
      // Force reload to ensure all contexts are updated
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Error updating role:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const userRoles: UserRole[] = ['artist', 'salon', 'customer', 'owner'];
  
  return (
    <Card className="mb-6 border-red-300 bg-red-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-red-600 text-lg">Role Debugger</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div><strong>User ID:</strong></div>
            <div>{user?.id || 'Not signed in'}</div>
            
            <div><strong>Email:</strong></div>
            <div>{user?.email || 'N/A'}</div>
            
            <div><strong>Context Role:</strong></div>
            <div>
              {userRole ? (
                <Badge>{userRole}</Badge>
              ) : (
                'No role in context'
              )}
            </div>
            
            <div><strong>Database Role:</strong></div>
            <div>
              {databaseRole ? (
                <Badge variant="outline">{databaseRole}</Badge>
              ) : (
                'Loading...'
              )}
            </div>
            
            <div><strong>Cached Role:</strong></div>
            <div>
              {cachedRole ? (
                <Badge variant="secondary">{cachedRole}</Badge>
              ) : (
                'Not cached'
              )}
            </div>
            
            <div><strong>Normalized Role:</strong></div>
            <div>
              {normalizedRole ? (
                <Badge variant="outline" className="bg-green-100">{normalizedRole}</Badge>
              ) : (
                'N/A'
              )}
            </div>
          </div>
          
          <div className="pt-2">
            <h3 className="font-semibold mb-2">Set Role Directly:</h3>
            <div className="flex flex-wrap gap-2">
              {userRoles.map((role) => (
                <Button 
                  key={role}
                  size="sm"
                  variant="outline"
                  disabled={loading || databaseRole === role}
                  onClick={() => handleUpdateRole(role)}
                >
                  {role}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleDebugger;
