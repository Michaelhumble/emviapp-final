
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import FallbackBoundary from "@/components/error-handling/FallbackBoundary";
import LoadingState from "../components/tabs/LoadingState";

const MessagesTab = () => {

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
      <Card className="p-8 text-center">
        <MessageSquare className="h-12 w-12 mx-auto text-purple-300 mb-3" />
        <h3 className="text-lg font-medium mb-2">Messages Coming Soon</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Messages functionality will be available soon.
        </p>
      </Card>
    </div>
  );
};

export default MessagesTab;
