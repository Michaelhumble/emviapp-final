import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { SalonMessage } from "@/types/SalonMessage";

export interface ConversationPreview {
  id: string;
  userId: string;
  name: string;
  avatarUrl?: string;
  lastMessage: string;
  lastMessageAt: string;
  unread?: boolean;
}

export function useCustomerConversations() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<ConversationPreview[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchConversations = async () => {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("messages")
        .select(
          `
            id,
            sender_id,
            recipient_id,
            created_at,
            message_body,
            sender:sender_id(full_name, avatar_url, role),
            recipient:recipient_id(full_name, avatar_url, role)
          `
        )
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order("created_at", { ascending: false })
        .limit(100);

      if (err) {
        setError("Error loading messages");
        setLoading(false);
        return;
      }

      if (!data) {
        setLoading(false);
        return;
      }

      const map = new Map<string, ConversationPreview>();

      data.forEach((msg: any) => {
        const isCustomerSender = msg.sender_id === user.id;
        const otherParty = isCustomerSender ? msg.recipient : msg.sender;
        const otherId = isCustomerSender ? msg.recipient_id : msg.sender_id;

        if (!otherParty?.role || !["artist", "owner", "salon"].includes(otherParty.role)) return;

        if (!map.has(otherId)) {
          map.set(otherId, {
            id: otherId,
            userId: otherId,
            name: otherParty.full_name || "Salon/Artist",
            avatarUrl: otherParty.avatar_url || undefined,
            lastMessage: msg.message_body,
            lastMessageAt: msg.created_at
          });
        }
      });

      const values = Array.from(map.values());
      if (values.length > 0) {
        values[0].unread = true;
      }
      setConversations(values);
      setLoading(false);
    };

    fetchConversations();
  }, [user?.id]);

  return { conversations, loading, error };
}
