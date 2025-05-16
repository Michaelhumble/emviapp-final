
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "@/hooks/useTranslation";

// Define a simple subscription type to avoid deep type instantiation
interface Subscription {
  id?: string;
  user_id?: string;
  status?: string;
  plan_name?: string;
  current_period_end?: string;
  stripe_subscription_id?: string;
}

const SubscriptionManagement = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchSubscription = async () => {
      setLoading(true);
      try {
        // Using a direct query instead of an RPC function that doesn't exist
        const { data, error } = await supabase
          .from('user_subscriptions')
          .select('*')
          .eq('user_id', user?.id)
          .single();

        if (error && error.message !== 'No rows found') {
          console.error("Error fetching subscription:", error);
          toast.error("Failed to load subscription details.");
        }

        setSubscription(data);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchSubscription();
    }
  }, [user?.id]);

  const cancelSubscription = async () => {
    if (!subscription?.stripe_subscription_id) {
      toast.error("No active subscription found to cancel.");
      return;
    }

    const confirmCancel = window.confirm(t("Are you sure you want to cancel your subscription?"));
    if (!confirmCancel) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('cancel-subscription', {
        body: { subscriptionId: subscription.stripe_subscription_id }
      });

      if (error) {
        console.error("Error cancelling subscription:", error);
        toast.error("Failed to cancel subscription. Please try again.");
      } else if (data?.success) {
        toast.success("Subscription cancelled successfully.");
        setSubscription(prev => prev ? ({ ...prev, status: 'cancelled' }) : null);
      } else {
        toast.error(data?.message || "Failed to cancel subscription.");
      }
    } finally {
      setLoading(false);
    }
  };

  const renewSubscription = () => {
    navigate('/pricing');
  };

  if (loading) {
    return <div>Loading subscription details...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">{t("Your subscription")}</h1>

      {subscription ? (
        <div className="bg-white shadow rounded-lg p-4">
          <p>Status: {subscription.status}</p>
          <p>Plan: {subscription.plan_name}</p>
          <p>Current Period End: {new Date(subscription.current_period_end || '').toLocaleDateString()}</p>

          {subscription.status === 'active' ? (
            <button
              onClick={cancelSubscription}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              disabled={loading}
            >
              {loading ? 'Cancelling...' : t("Cancel Subscription")}
            </button>
          ) : (
            <button
              onClick={renewSubscription}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              {t("Renew Subscription")}
            </button>
          )}
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded-md">
          <p>{t("You do not have an active subscription.")}</p>
          <button
            onClick={renewSubscription}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            {t("Explore Plans")}
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagement;
