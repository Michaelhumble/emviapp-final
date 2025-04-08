
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { UserRole } from "@/context/auth/types";
import Layout from "@/components/layout/Layout";
import RoleSelectionList from "@/components/auth/roles/RoleSelectionList";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { navigateToRoleDashboard } from "@/utils/navigation";

const ChooseRole = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingRole, setIsCheckingRole] = useState(true);
  const [language, setLanguage] = useState<"en" | "vi">("en");
  const { user, refreshUserProfile, isSignedIn, loading, userRole } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is not signed in and not loading, redirect to sign-in
    if (!loading && !isSignedIn) {
      navigate("/sign-in");
      return;
    }
    
    // Get preferred language from localStorage or browser
    const storedLanguage = localStorage.getItem("preferred_language");
    if (storedLanguage === "vi") {
      setLanguage("vi");
    } else {
      setLanguage("en");
    }
    
    // Debug log
    console.log("ChooseRole page loaded, user:", user?.id);
    
    // Check if user already has a role in Supabase
    const checkExistingRole = async () => {
      if (!user?.id) return;
      
      setIsCheckingRole(true);
      
      try {
        // First, check if role exists in context
        if (userRole) {
          console.log(`[ChooseRole] User already has role ${userRole} in auth context, redirecting`);
          navigateToRoleDashboard(navigate, userRole);
          return;
        }
        
        // If not in context, check directly from database
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();
          
        if (error) {
          console.error("[ChooseRole] Error checking user role:", error);
          setIsCheckingRole(false);
          return;
        }
        
        // If role exists in database, refresh user profile and redirect
        if (data && data.role) {
          console.log(`[ChooseRole] User already has role ${data.role} in database, redirecting`);
          await refreshUserProfile();
          navigateToRoleDashboard(navigate, data.role as UserRole);
          return;
        }
        
        // If no role yet, allow selection
        console.log("[ChooseRole] No role found, showing role selection");
        setIsCheckingRole(false);
      } catch (err) {
        console.error("[ChooseRole] Unexpected error checking role:", err);
        setIsCheckingRole(false);
      }
    };
    
    checkExistingRole();
  }, [isSignedIn, loading, navigate, user, userRole, refreshUserProfile]);

  const handleRoleSelection = async () => {
    if (!user?.id || !selectedRole) return;
    
    setIsSubmitting(true);
    
    try {
      // Save role to Supabase
      const { error } = await supabase
        .from('users')
        .update({ role: selectedRole })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Refresh user profile to update role in context
      await refreshUserProfile();
      
      // Show success message
      toast.success(language === "en" 
        ? `Role selected! You're now registered as a ${selectedRole}.`
        : `Đã chọn vai trò! Bạn đã đăng ký làm ${selectedRole}.`
      );
      
      // Redirect to appropriate dashboard
      navigateToRoleDashboard(navigate, selectedRole);
    } catch (error) {
      console.error("Error setting user role:", error);
      toast.error(language === "en"
        ? "We couldn't save your role. Please try again."
        : "Chúng tôi không thể lưu vai trò của bạn. Vui lòng thử lại."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state if we're still checking for existing role
  if (isCheckingRole) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[80vh] p-4 bg-background">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-purple-500 animate-spin mb-4" />
            <p className="text-gray-600">
              {language === "en" ? "Checking your account status..." : "Đang kiểm tra trạng thái tài khoản..."}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh] p-4 bg-background">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h1 className="text-2xl font-serif mb-2 text-indigo-900">
              {language === "en" ? "Welcome to EmviApp!" : "Chào mừng đến với EmviApp!"}
            </h1>
            
            <p className="text-muted-foreground mb-2">
              {language === "en" 
                ? "Tell us how you'd like to use the platform so we can personalize your experience."
                : "Hãy cho chúng tôi biết bạn muốn sử dụng nền tảng như thế nào để chúng tôi có thể cá nhân hóa trải nghiệm của bạn."
              }
            </p>
            
            <h2 className="text-indigo-600 font-medium text-lg mt-6 mb-4">
              {language === "en" 
                ? "What do you do in the beauty industry?" 
                : "Bạn làm gì trong ngành làm đẹp?"
              }
            </h2>
            
            <RoleSelectionList 
              selectedRole={selectedRole} 
              onRoleSelect={setSelectedRole} 
            />
            
            <div className="mt-8">
              <Button 
                onClick={handleRoleSelection}
                disabled={isSubmitting}
                className="w-full sm:w-auto md:px-10 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium text-base transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {language === "en" ? "Setting up..." : "Đang thiết lập..."}
                  </>
                ) : (
                  language === "en" ? "Continue" : "Tiếp tục"
                )}
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-6">
              {language === "en" 
                ? "You can always change your role later in your profile settings."
                : "Bạn luôn có thể thay đổi vai trò của mình sau trong cài đặt hồ sơ."
              }
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChooseRole;
