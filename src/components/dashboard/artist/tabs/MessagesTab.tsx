
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { MessageCenter } from "@/components/chat/MessageCenter";
import { useTestRecipient } from "@/hooks/chat/useTestRecipient";
import FallbackBoundary from "@/components/error-handling/FallbackBoundary";
import LoadingState from "../components/tabs/LoadingState";

const MessagesTab = () => {
  const { testRecipient, loading, error } = useTestRecipient();

  if (loading) {
    return <LoadingState message="Loading your messages..." />;
  }

  if (error) {
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
        <Card className="p-8 text-center text-red-500">
          <p>Something went wrong while loading your messages.</p>
          <p className="text-sm mt-2">{error.message}</p>
        </Card>
      </div>
    );
  }

  return (
    <FallbackBoundary>
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
          <FallbackBoundary
            fallback={
              <Card className="p-8 text-center">
                <MessageSquare className="h-12 w-12 mx-auto text-purple-300 mb-3" />
                <h3 className="text-lg font-medium mb-2">Chat temporarily unavailable</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We're having trouble loading this conversation. Please try again later.
                </p>
              </Card>
            }
          >
            <MessageCenter recipientId={testRecipient.id} />
          </FallbackBoundary>
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
    </FallbackBoundary>
  );
};

export default MessagesTab;
