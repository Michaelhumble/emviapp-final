
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";

// Define access levels
export type AccessLevel = 'owner' | 'manager' | 'artist' | 'customer';

// Define permissions structure
export interface RolePermissions {
  canViewSalonRevenue: boolean;
  canManageTeam: boolean;
  canManageServices: boolean;
  canViewOtherArtists: boolean;
  canEditSalonProfile: boolean;
  canBookAppointments: boolean;
  canPostJobs: boolean;
}

// Hook to determine user's access rights
export const useRoleAccess = (salonId?: string) => {
  const { user, userProfile } = useAuth();
  const [accessLevel, setAccessLevel] = useState<AccessLevel | null>(null);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState<RolePermissions>({
    canViewSalonRevenue: false,
    canManageTeam: false,
    canManageServices: false,
    canViewOtherArtists: false,
    canEditSalonProfile: false,
    canBookAppointments: false,
    canPostJobs: false
  });

  useEffect(() => {
    const determineAccess = async () => {
      if (!user || !userProfile) {
        setLoading(false);
        return;
      }
      
      try {
        // First check if the user is the salon owner
        if (salonId) {
          const { data: salonData, error: salonError } = await supabase
            .from('salons')
            .select('owner_id')
            .eq('id', salonId)
            .single();
            
          if (!salonError && salonData && salonData.owner_id === user.id) {
            setAccessLevel('owner');
            setPermissions({
              canViewSalonRevenue: true,
              canManageTeam: true,
              canManageServices: true,
              canViewOtherArtists: true,
              canEditSalonProfile: true,
              canBookAppointments: true,
              canPostJobs: true
            });
            setLoading(false);
            return;
          }
          
          // Next check if they are a salon manager
          const { data: accessData, error: accessError } = await supabase
            .from('user_salon_access')
            .select('access_type')
            .eq('user_id', user.id)
            .eq('salon_id', salonId)
            .single();
            
          if (!accessError && accessData) {
            if (accessData.access_type === 'manager') {
              setAccessLevel('manager');
              setPermissions({
                canViewSalonRevenue: true,
                canManageTeam: true,
                canManageServices: true,
                canViewOtherArtists: true,
                canEditSalonProfile: false,
                canBookAppointments: true,
                canPostJobs: true
              });
            } else if (accessData.access_type === 'artist') {
              setAccessLevel('artist');
              setPermissions({
                canViewSalonRevenue: false,
                canManageTeam: false,
                canManageServices: false,
                canViewOtherArtists: false,
                canEditSalonProfile: false,
                canBookAppointments: true,
                canPostJobs: false
              });
            }
            setLoading(false);
            return;
          }
        }
        
        // Fallback to user role from profile
        if (userProfile.role === 'owner') {
          setAccessLevel('owner');
          setPermissions({
            canViewSalonRevenue: true,
            canManageTeam: true,
            canManageServices: true,
            canViewOtherArtists: true,
            canEditSalonProfile: true,
            canBookAppointments: true,
            canPostJobs: true
          });
        } else if (userProfile.role === 'artist') {
          setAccessLevel('artist');
          setPermissions({
            canViewSalonRevenue: false,
            canManageTeam: false,
            canManageServices: false,
            canViewOtherArtists: false,
            canEditSalonProfile: false,
            canBookAppointments: true,
            canPostJobs: false
          });
        } else {
          setAccessLevel('customer');
          setPermissions({
            canViewSalonRevenue: false,
            canManageTeam: false,
            canManageServices: false,
            canViewOtherArtists: false,
            canEditSalonProfile: false,
            canBookAppointments: true,
            canPostJobs: false
          });
        }
      } catch (err) {
        console.error("Error determining access level:", err);
      } finally {
        setLoading(false);
      }
    };
    
    determineAccess();
  }, [user, userProfile, salonId]);
  
  return { accessLevel, permissions, loading };
};
