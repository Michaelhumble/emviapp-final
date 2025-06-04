
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from '@/context/auth/types';
import { toast } from 'sonner';

export const useRoleBasedSignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signUp = async (email: string, password: string, role: UserRole) => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return false;
    }

    setLoading(true);
    console.log("Starting role-based sign-up...", { email, role });
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role,
            user_type: role
          }
        }
      });

      console.log("Auth sign-up response:", { data, error });

      if (error) {
        console.error("Auth sign-up error:", error);
        if (error.message.includes('already')) {
          toast.error('This email is already registered. Please sign in instead.');
        } else {
          toast.error(error.message);
        }
        return false;
      }

      if (data?.user) {
        console.log("User created successfully:", data.user.id);
        
        // Try to manually ensure user exists in public.users
        try {
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email: data.user.email,
              role: role,
              full_name: '',
              created_at: new Date().toISOString()
            });

          if (insertError) {
            console.error("Manual user insert failed:", insertError);
          } else {
            console.log("User successfully inserted into public.users");
          }
        } catch (insertErr) {
          console.error("Manual insert error:", insertErr);
        }

        toast.success('Account created successfully! Redirecting...');
        
        // Role-based redirect
        switch (role) {
          case 'artist':
            navigate('/dashboard/artist');
            break;
          case 'salon':
            navigate('/dashboard/salon');
            break;
          case 'freelancer':
            navigate('/dashboard/freelancer');
            break;
          case 'customer':
          default:
            navigate('/dashboard/customer');
            break;
        }
        return true;
      }
    } catch (error) {
      console.error('Unexpected signup error:', error);
      toast.error('An unexpected error occurred. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    signUp,
    loading
  };
};
