
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import HeroSection from "./HeroSection";
import Profile from "./pages/Profile";
import Salons from "./pages/Salons";
import Jobs from "./pages/Jobs";
import Store from "./pages/Store";
import Bookings from "./pages/Bookings";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import SupportAgent from "./components/SupportAgent";
import { useAuth } from "./context/AuthContext";
import useRewardEngine from "./hooks/rewards/useRewardEngine";
import RewardToast from "./components/rewards/RewardToast";
import { Toaster } from "react-hot-toast";
import "./index.css"; // Make sure CSS is imported

const App = () => {
  console.log("App rendering with Tailwind classes applied");
  const { user } = useAuth();
  const { rewardMessage, showToast, hideToast } = useRewardEngine(user as any);
  
  const isAdmin = user?.email === "michaelnguyen510@gmail.com";
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4">
        <Routes>
          <Route 
            path="/signin" 
            element={user ? <Navigate to="/" replace /> : <SignIn />} 
          />
          <Route 
            path="/signup" 
            element={user ? <Navigate to="/" replace /> : <SignUp />} 
          />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HeroSection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/salons"
            element={
              <ProtectedRoute>
                <Salons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/store"
            element={
              <ProtectedRoute>
                <Store />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                {isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />}
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <SupportAgent />
      
      <RewardToast 
        message={rewardMessage}
        isVisible={showToast}
        onClose={hideToast}
      />

      <Toaster position="bottom-right" />
    </div>
  );
};

export default App;
