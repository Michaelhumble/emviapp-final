
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { Notification, NotificationResponse } from '@/types/notification';
import { toast } from 'sonner';

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Fetch notifications from various sources
  const fetchNotifications = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      // Array to collect notifications from different sources
      const notificationsArray: Notification[] = [];
      
      // 1. Check for job applications
      const { data: applications, error: applicationsError } = await supabase
        .from('job_applications')
        .select('id, created_at, status, jobs!inner(title, salon_id)')
        .eq('jobs.salon_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (applicationsError) {
        console.error('Error fetching applications:', applicationsError);
      } else if (applications && applications.length > 0) {
        applications.forEach(app => {
          if (app.status === 'pending') {
            notificationsArray.push({
              id: `app-${app.id}`,
              message: `New application for job: ${(app as any).jobs?.title || 'Unknown job'}`,
              type: 'info',
              createdAt: app.created_at,
              isRead: false,
              link: `/applications/${app.id}`
            });
          }
        });
      }
      
      // 2. Check for expiring job posts
      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select('id, title, expires_at')
        .eq('user_id', user.id)
        .eq('post_type', 'job')
        .eq('status', 'active');
        
      if (postsError) {
        console.error('Error fetching posts:', postsError);
      } else if (posts && posts.length > 0) {
        const now = new Date();
        posts.forEach(post => {
          const expiryDate = new Date(post.expires_at);
          const daysUntilExpiry = Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          
          if (daysUntilExpiry <= 3 && daysUntilExpiry >= 0) {
            notificationsArray.push({
              id: `expire-${post.id}`,
              message: `Your post "${post.title}" expires in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''}`,
              type: 'warning',
              createdAt: now.toISOString(),
              isRead: false
            });
          }
        });
      }
      
      // 3. Check for referral notifications
      const referralStats = await getReferralStats();
      if (referralStats && referralStats.pending > 0) {
        notificationsArray.push({
          id: 'pending-referrals',
          message: `You have ${referralStats.pending} pending referral${referralStats.pending !== 1 ? 's' : ''}`,
          type: 'success',
          createdAt: new Date().toISOString(),
          isRead: false,
          link: '/referrals'
        });
      }
      
      // 4. Check for credit notifications
      const { data: credits, error: creditsError } = await supabase
        .from('customer_credits')
        .select('action_type, value, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);
        
      if (creditsError) {
        console.error('Error fetching credits:', creditsError);
      } else if (credits && credits.length > 0) {
        credits.forEach((credit, index) => {
          if (credit.value > 0 && index === 0) { // Only show the most recent credit
            notificationsArray.push({
              id: `credit-${index}`,
              message: `You received ${credit.value} credit${credit.value !== 1 ? 's' : ''}!`,
              type: 'success',
              createdAt: credit.created_at,
              isRead: false
            });
          }
        });
      }
      
      // Calculate unread count and set notifications
      setNotifications(notificationsArray);
      setUnreadCount(notificationsArray.filter(n => !n.isRead).length);
      
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
    
    setUnreadCount(prev => Math.max(0, prev - 1));
  };
  
  // Function to mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };
  
  // Function to get referral stats specifically
  const getReferralStats = async () => {
    if (!user?.id) return null;
    
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('status, milestone_reached')
        .eq('referrer_id', user.id);
        
      if (error) {
        console.error('Error fetching referral stats:', error);
        return null;
      }
      
      if (!data || !Array.isArray(data)) return null;
      
      const total = data.length;
      const pending = data.filter(r => r.status === 'pending').length;
      const completed = data.filter(r => r.status === 'completed').length;
      
      return { total, pending, completed };
    } catch (error) {
      console.error('Error fetching referral stats:', error);
      return null;
    }
  };
  
  // Subscribe to real-time notifications
  useEffect(() => {
    if (!user?.id) return;
    
    // Initial fetch
    fetchNotifications();
    
    // Set up subscription for applications
    const jobApplicationsChannel = supabase
      .channel('job-applications-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'job_applications',
          filter: `salon_id=eq.${user.id}`
        },
        (payload) => {
          toast.info('New application received!');
          fetchNotifications(); // Refresh notifications
        }
      )
      .subscribe();
      
    // Set up subscription for credits
    const creditsChannel = supabase
      .channel('credits-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'customer_credits',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if ((payload.new as any)?.value > 0) {
            toast.success(`You received ${(payload.new as any)?.value} credits!`);
            fetchNotifications(); // Refresh notifications
          }
        }
      )
      .subscribe();
      
    // Clean up subscriptions
    return () => {
      supabase.removeChannel(jobApplicationsChannel);
      supabase.removeChannel(creditsChannel);
    };
  }, [user?.id]);
  
  return { 
    notifications, 
    unreadCount, 
    loading, 
    fetchNotifications, 
    markAsRead, 
    markAllAsRead 
  };
};
