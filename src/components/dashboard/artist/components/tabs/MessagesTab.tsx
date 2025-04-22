
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { MessageCenter } from "@/components/chat/MessageCenter";
import { useTestRecipient } from "@/hooks/chat/useTestRecipient";

const MessagesTab = () => {
  const { testRecipient, loading } = useTestRecipient();

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="border-purple-100">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-500" />
              Messages
            </CardTitle>
          </CardHeader>
        </Card>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-100">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-500" />
            Messages
          </CardTitle>
        </CardHeader>
      </Card>
      
      {testRecipient ? (
        <MessageCenter recipientId={testRecipient.id} />
      ) : (
        <Card className="p-8 text-center">
          <MessageSquare className="h-12 w-12 mx-auto text-purple-300 mb-3" />
          <h3 className="text-lg font-medium mb-2">No Messages Yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Start connecting with your clients and grow your business! Messages will appear here once you begin chatting.
          </p>
        </Card>
      )}
    </div>
  );
};

export default MessagesTab;
