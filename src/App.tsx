
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/auth";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import DashboardPage from "./pages/DashboardPage";
import ArtistProfile from "./pages/ArtistProfile";
import SalonProfile from "./pages/SalonProfile";
import CustomerProfilePage from "./pages/profiles/CustomerProfilePage";
import ArtistProfilePage from "./pages/profiles/ArtistProfilePage";
import SalonProfilePage from "./pages/profiles/SalonProfilePage";
import ProfileRouter from "./components/profile/ProfileRouter";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/artist/:id" element={<ArtistProfile />} />
              <Route path="/salon/:id" element={<SalonProfile />} />
              <Route path="/profile" element={<ProfileRouter />} />
              <Route path="/profile/customer" element={<CustomerProfilePage />} />
              <Route path="/profile/artist" element={<ArtistProfilePage />} />
              <Route path="/profile/salon" element={<SalonProfilePage />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
