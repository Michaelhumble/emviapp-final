
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { messageSquareReply, reply } from "lucide-react";
import { Link } from "react-router-dom";

const messages = [
  {
    id: 1,
    name: "Emma T.",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    message: "Hi! I'd love to book you for a nail appointment next week. Are you available on Tuesday?",
    time: "2 hours ago",
  },
  {
    id: 2,
    name: "Michael C.",
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
    message: "Thank you for the amazing service yesterday! I've already recommended you.",
    time: "1 day ago",
  }
];

export default function ArtistMessagesPreview() {
  return (
    <Card className="bg-gradient-to-br from-white via-purple-50 to-pink-50 border-0 shadow-sm rounded-2xl">
      <CardHeader className="pb-3 flex flex-row items-center justify-between bg-gradient-to-r from-white via-purple-50 to-pink-50 rounded-t-2xl">
        <CardTitle className="text-lg font-medium text-gray-900 flex items-center font-playfair">
          <span className="mr-2">
            <span className="inline-block align-middle">
              {messageSquareReply && (
                <span>
                  {/* Icon */}
                  <svg viewBox="0 0 24 24" width={20} height={20} className="text-emvi-accent align-middle mr-1.5" stroke="currentColor" fill="none" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </span>
              )}
            </span>
          </span>
          Recent Messages
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="font-medium text-emvi-accent px-2"
        >
          <Link to="/dashboard/artist/inbox" className="flex items-center">
            View All Messages
            <svg className="ml-1 h-4 w-4" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="flex gap-3 items-start rounded-xl bg-white/80 border border-gray-100 px-3 py-3 shadow-sm"
          >
            <img
              src={msg.avatar}
              alt={msg.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-100 shadow"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center gap-2 mb-0.5">
                <span className="font-semibold text-gray-900 font-playfair text-sm truncate">{msg.name}</span>
                <span className="text-xs text-gray-500 flex-shrink-0">{msg.time}</span>
              </div>
              <p className="text-gray-700 text-sm mt-0.5 line-clamp-2">{msg.message}</p>
              <div className="mt-1 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs text-emvi-accent hover:text-purple-600 font-medium inline-flex items-center"
                  asChild
                >
                  <a href="#" tabIndex={-1}>
                    <svg
                      className="h-3.5 w-3.5 mr-1"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 17v-6a1 1 0 0 1 1-1h4.5m0 0L12 7m3.5 3L12 17" />
                    </svg>
                    Reply
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
