
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/auth/AuthProvider";
import { NotificationProvider } from "@/context/notification/NotificationProvider";
import { ThemeProvider } from "@/components/theme-provider";

// Import pages directly
import Index from "./pages/Index";
import SignUp from "./pages/auth/SignUp";

const queryClient = new QueryClient();

function App() {
  console.log("App.tsx rendering - checking routes");
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider>
          <AuthProvider>
            <NotificationProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/sign-up" element={<SignUp />} />
                </Routes>
              </BrowserRouter>
            </NotificationProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
