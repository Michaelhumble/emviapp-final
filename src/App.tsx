
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/auth";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";
import { SubscriptionProvider } from "@/context/subscription";
import RouteLogger from "@/components/common/RouteLogger";
import MainRoutes from "./MainRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <AuthProvider>
          <ProfileCompletionProvider>
            <SubscriptionProvider>
              <RouteLogger />
              <MainRoutes />
              <Toaster />
              <Sonner />
            </SubscriptionProvider>
          </ProfileCompletionProvider>
        </AuthProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
