import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/auth";
import { supabaseBypass } from "@/types/supabase-bypass";
import { SalonMessage } from "@/types/SalonMessage";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ConversationThreadProps {
  currentUserId: string;
  otherUserId: string;
  otherName: string;
  otherAvatarUrl?: string;
  onBack?: () => void;
  isMobile?: boolean;
}

const smartReplies = [
  "Thanks, see you soon!",
  "Can we reschedule?",
  "I’ll be there.",
  "Sounds good!",
  "Sorry, I can’t make it.",
];

const ConversationThread = ({
  currentUserId,
  otherUserId,
  otherName,
  otherAvatarUrl,
  onBack,
  isMobile = false,
}: ConversationThreadProps) => {
  const [messages, setMessages] = useState<SalonMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const { data } = await supabaseBypass
        .from("messages")
        .select(
          `
            id,
            sender_id,
            recipient_id,
            message_body,
            created_at
          `
        )
        .or(`sender_id.eq.${currentUserId},recipient_id.eq.${currentUserId}`)
        .or(`sender_id.eq.${otherUserId},recipient_id.eq.${otherUserId}`)
        .order("created_at", { ascending: true });
      const filtered =
        data?.filter(
          (m: any) =>
            ((m.sender_id === currentUserId && m.recipient_id === otherUserId) ||
              (m.sender_id === otherUserId && m.recipient_id === currentUserId))
        ) ?? [];
      setMessages(
        filtered.map((m: any) => ({
          id: m.id,
          senderId: m.sender_id,
          senderName: m.sender_id === currentUserId ? "You" : otherName,
          message: m.message_body,
          timestamp: m.created_at,
        }))
      );
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 250);
    };
    fetchMessages();
    // eslint-disable-next-line
  }, [currentUserId, otherUserId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setSending(true);
    await supabaseBypass.from("messages").insert({
      sender_id: currentUserId,
      recipient_id: otherUserId,
      message_body: input,
      message_type: "chat",
      salon_id: otherUserId,
    } as any);
    setInput("");
    setSending(false);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const canConfirm =
    messages.length &&
    /appointment|book(ed)?|confirm/i.test(messages[messages.length - 1]?.message ?? "");
  const canCancel =
    messages.length &&
    /appointment|book(ed)?|cancel/i.test(messages[messages.length - 1]?.message ?? "");

  return (
    <div className={`flex flex-col h-full ${isMobile ? "pt-2" : ""}`}>
      {isMobile && (
        <div className="flex items-center gap-2 pb-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            ←
          </Button>
          <Avatar className="h-7 w-7">
            {otherAvatarUrl ? (
              <AvatarImage src={otherAvatarUrl} />
            ) : (
              <AvatarFallback>{otherName.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-base font-medium">{otherName}</span>
        </div>
      )}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
        {loading ? (
          <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
            Loading conversation...
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={msg.id} className={`flex ${msg.senderId === otherUserId ? "justify-start" : "justify-end"}`}>
              <div
                className={`px-3 py-2 rounded-xl max-w-[68vw] break-words leading-snug text-sm ${
                  msg.senderId === otherUserId
                    ? "bg-gray-100 text-gray-900"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {msg.message}
                {i === messages.length - 1 && msg.senderId === otherUserId && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button
                      type="button"
                      size="sm"
                      className="min-h-[44px] px-3 bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-200"
                      onClick={() => setInput("")}
                    >
                      Reply
                    </Button>
                    {canConfirm && (
                      <Button
                        type="button"
                        size="sm"
                        className="min-h-[44px] px-3 bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                        onClick={() => setInput("Confirming my appointment!")}
                      >
                        Confirm Appointment
                      </Button>
                    )}
                    {canCancel && (
                      <Button
                        type="button"
                        size="sm"
                        className="min-h-[44px] px-3 bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200"
                        onClick={() => setInput("Sorry, I need to cancel my appointment.")}
                      >
                        Cancel Appointment
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={scrollRef}></div>
      </div>
      {!loading && (
        <div className="flex flex-wrap gap-2 bg-slate-50 py-2 px-3 rounded-b-lg mb-2">
          {smartReplies.slice(0, 2).map((reply, idx) => (
            <Button
              key={idx}
              type="button"
              variant="outline"
              size="sm"
              className="min-h-[44px] bg-white border-gray-200 hover:bg-gray-100 text-gray-700"
              onClick={() => setInput(reply)}
            >
              {reply}
            </Button>
          ))}
        </div>
      )}
      <form
        className="flex gap-2 border-t pt-1 mt-0 px-2"
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          type="text"
          placeholder="Type your reply…"
          className="rounded-full px-4 py-2 border bg-white flex-1 text-sm focus:outline-none min-h-[44px]"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={sending}
          autoFocus={isMobile}
        />
        <Button size="icon" type="submit" disabled={sending || !input.trim()} variant="secondary">
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default ConversationThread;
