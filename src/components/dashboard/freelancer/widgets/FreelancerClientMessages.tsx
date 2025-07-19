
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function FreelancerClientMessages() {
  const mockMessages = [
    { id: 1, client: "Sarah M.", message: "Hi! Are you available this weekend?", time: "2 hours ago", unread: true },
    { id: 2, client: "Divine Nails", message: "We'd love to have you cover shifts next week", time: "1 day ago", unread: false },
    { id: 3, client: "Emma K.", message: "Your work looks amazing! Can we book?", time: "3 days ago", unread: false }
  ];

  return (
    <Card className="mb-8 border border-purple-100 bg-white/80 overflow-hidden">
      <div className="p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-purple-600" />
          <div>
            <div className="font-bold text-gray-800">Client Messages</div>
            <div className="text-gray-500 text-sm">Recent inquiries and communications</div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-3">
          {mockMessages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-purple-700">{msg.client[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-800">{msg.client}</span>
                  {msg.unread && <div className="w-2 h-2 bg-purple-500 rounded-full"></div>}
                </div>
                <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200 text-center">
          <p className="text-sm text-purple-700">✨ Full messaging system coming soon!</p>
        </div>
      </div>
    </Card>
  );
}
