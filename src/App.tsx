
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth";
import { ProfileProvider } from "@/context/profile";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";
import { SubscriptionProvider } from "@/context/subscription";
import { NotificationProvider } from "@/context/notification";

// Pages
import Index from "@/pages/Index";
import Jobs from "@/pages/Jobs";
import NotFound from "@/pages/NotFound";
import Messages from "@/pages/messages";

// Global styles
import "@/styles/globals.css";
import "@/styles/chat.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <ProfileProvider>
            <ProfileCompletionProvider>
              <SubscriptionProvider>
                <NotificationProvider>
                  <Toaster position="top-center" richColors />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/salon-sales" element={<NotFound />} /> {/* Temporary route for salon sales */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </NotificationProvider>
              </SubscriptionProvider>
            </ProfileCompletionProvider>
          </ProfileProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
