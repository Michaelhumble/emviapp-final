
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";

// Lazy load components for better performance
const Index = lazy(() => import("@/pages/Index"));
const UserProfilePage = lazy(() => import("@/pages/profile/UserProfilePage"));
const SignIn = lazy(() => import("@/pages/auth/SignIn"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// 🚨 DEBUG COMPONENT - Logs auth state at top level
const AuthDebugger = () => {
  const { user, userRole, userProfile, loading, isSignedIn } = useAuth();
  
  useEffect(() => {
    console.log('🚨 TOP-LEVEL AUTH STATE:', {
      userId: user?.id,
      userEmail: user?.email,
      userRole,
      userRoleType: typeof userRole,
      profileRole: userProfile?.role,
      isSignedIn,
      loading,
      timestamp: new Date().toISOString()
    });
    
    // Log user metadata if available
    if (user?.user_metadata) {
      console.log('🚨 TOP-LEVEL USER METADATA:', user.user_metadata);
    }
    
    // Log localStorage role
    const cachedRole = localStorage.getItem('emviapp_user_role');
    console.log('🚨 TOP-LEVEL CACHED ROLE:', cachedRole);
  }, [user, userRole, userProfile, loading, isSignedIn]);
  
  return null; // This component only logs, doesn't render
};

function App() {
  console.log('🚨 APP COMPONENT RENDER');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <AuthProvider>
            <AuthDebugger />
            <Layout>
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/profile" element={<UserProfilePage />} />
                  <Route path="/auth/signin" element={<SignIn />} />
                  <Route path="/auth/signup" element={<SignUp />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                </Routes>
              </Suspense>
            </Layout>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
