
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
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role
          }
        }
      });

      if (error) {
        if (error.message.includes('already')) {
          toast.error('This email is already registered. Please sign in instead.');
        } else {
          toast.error(error.message);
        }
        return false;
      }

      if (data?.user) {
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
      console.error('Signup error:', error);
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
