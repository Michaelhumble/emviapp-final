
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { determineUserRole, persistUserRole } from '../utils/roleManagement';
import { UserRole, UserProfile } from '../types/authTypes';
import { fetchUserProfile } from '../userProfileService';

/**
 * Hook to manage auth session and state changes
 * @param setUser Function to update user state
 * @param setSession Function to update session state
 * @param setUserProfile Function to update user profile state
 * @param setUserRole Function to update user role state
 * @param setIsNewUser Function to update new user state
 * @param setLoading Function to update loading state
 * @param setIsError Function to update error state
 */
export const useAuthSession = (
  setUser: (user: User | null) => void,
  setSession: (session: Session | null) => void,
  setUserProfile: (profile: UserProfile | null) => void,
  setUserRole: (role: UserRole) => void,
  setIsNewUser: (isNew: boolean) => void,
  setLoading: (loading: boolean) => void,
  setIsError: (isError: boolean) => void,
) => {
  useEffect(() => {
    // Check for new user status in localStorage
    const storedNewUserStatus = localStorage.getItem('emviapp_new_user') === 'true';
    if (storedNewUserStatus) {
      setIsNewUser(true);
    }

    // Set up auth state change listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          setUser(session.user);
          
          // Handle each auth event type appropriately
          switch (event) {
            case 'SIGNED_IN':
              // Check for role in user metadata and store it
              const userRole = determineUserRole(
                session.user.user_metadata,
                null,
                localStorage.getItem('emviapp_user_role')
              );
              
              if (userRole) {
                setUserRole(userRole);
                persistUserRole(userRole);
              }
              
              // Load profile asynchronously using setTimeout to prevent auth deadlock
              setTimeout(async () => {
                try {
                  const profile = await fetchUserProfile(session.user.id);
                  setUserProfile(profile);
                  
                  // Update role from profile if available
                  if (profile?.role) {
                    const profileRole = determineUserRole(
                      null,
                      profile.role,
                      userRole || null
                    );
                    
                    if (profileRole) {
                      setUserRole(profileRole);
                      persistUserRole(profileRole);
                    }
                  }
                } catch (err) {
                  console.error('Error fetching profile on sign in:', err);
                }
              }, 0);
              break;
              
            case 'SIGNED_UP':
              setIsNewUser(true);
              localStorage.setItem('emviapp_new_user', 'true');
              
              // Check for role in user metadata
              const signUpRole = determineUserRole(
                session.user.user_metadata,
                null,
                null
              );
              
              if (signUpRole) {
                setUserRole(signUpRole);
                persistUserRole(signUpRole);
              }
              break;
              
            case 'SIGNED_OUT':
              // Reset all user state
              setUserProfile(null);
              setUserRole('customer' as UserRole);
              setIsNewUser(false);
              localStorage.removeItem('emviapp_new_user');
              localStorage.removeItem('emviapp_user_role');
              break;
              
            case 'USER_UPDATED':
              // Re-determine role if user data was updated
              const updatedRole = determineUserRole(
                session.user.user_metadata,
                null,
                localStorage.getItem('emviapp_user_role')
              );
              
              if (updatedRole) {
                setUserRole(updatedRole);
                persistUserRole(updatedRole);
              }
              break;
          }
        } else {
          // No user, reset state
          setUser(null);
          setUserProfile(null);
          setUserRole('customer');
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setIsError(true);
        console.error('Error getting session:', error);
      }
      
      setSession(session);
      
      if (session?.user) {
        setUser(session.user);
        
        // Check for role in user metadata
        const existingRole = determineUserRole(
          session.user.user_metadata,
          null,
          localStorage.getItem('emviapp_user_role')
        );
        
        if (existingRole) {
          setUserRole(existingRole);
        }
        
        // Load profile asynchronously
        setTimeout(async () => {
          try {
            const profile = await fetchUserProfile(session.user.id);
            setUserProfile(profile);
            
            // Update role from profile if available
            if (profile?.role) {
              const profileRole = determineUserRole(
                null,
                profile.role,
                existingRole || null
              );
              
              if (profileRole) {
                setUserRole(profileRole);
                persistUserRole(profileRole);
              }
            }
          } catch (err) {
            console.error('Error fetching initial profile:', err);
          }
          
          setLoading(false);
        }, 0);
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const clearIsNewUser = () => {
    setIsNewUser(false);
    localStorage.removeItem('emviapp_new_user');
  };

  return { clearIsNewUser };
};
