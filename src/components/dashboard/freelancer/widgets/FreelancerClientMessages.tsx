
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function FreelancerClientMessages() {
  // In a real app, hook up to live chat/messages here.
  return (
    <Card className="mb-8 border border-purple-100 bg-white/80 p-6 flex items-center gap-4">
      <MessageSquare className="h-6 w-6 text-purple-600" />
      <div>
        <div className="font-bold">Client Messages</div>
        <div className="text-gray-500 text-sm">Coming soon: message clients directly here!</div>
      </div>
    </Card>
  );
}
