
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { MessageSender } from "@/types/MessageSender";

export const useTestRecipient = () => {
  const [testRecipient, setTestRecipient] = useState<MessageSender | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestRecipient = async () => {
      // Try to find our test support user
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, avatar_url')
        .eq('role', 'support')
        .single();

      if (error) {
        console.error('Error fetching test recipient:', error);
        return;
      }

      if (data) {
        setTestRecipient({
          id: data.id,
          name: data.full_name,
          avatarUrl: data.avatar_url
        });
      }
      
      setLoading(false);
    };

    fetchTestRecipient();
  }, []);

  return { testRecipient, loading };
};
