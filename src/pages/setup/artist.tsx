
import { useProfileCompletion } from "@/hooks/useProfileCompletion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { CheckCircle, Circle, Loader2 } from "lucide-react";

export default function ArtistProfileSetupPage() {
  const { completionStatus, isLoading } = useProfileCompletion();
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Layout>
        <div className="p-8 max-w-3xl mx-auto">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-4 w-2/3 mb-8" />
          <Skeleton className="h-8 w-full mb-4" />
          <div className="space-y-6 mt-8">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </Layout>
    );
  }

  if (completionStatus?.isComplete) {
    return (
      <Layout>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 text-center max-w-md mx-auto"
        >
          <div className="mb-6 text-green-500">
            <CheckCircle className="h-16 w-16 mx-auto" />
          </div>
          <h1 className="text-2xl font-semibold mb-4">🎉 You're all set!</h1>
          <p className="text-gray-600 mb-6">Your artist profile is complete and ready.</p>
          <Button onClick={() => navigate("/dashboard/artist")}>
            Go to Dashboard
          </Button>
        </motion.div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl font-bold mb-4">👋 Let's finish your profile</h1>
          <p className="text-gray-500 mb-6">
            Complete the steps below to unlock your dashboard.
          </p>

          <div className="bg-gray-100 rounded p-4 mb-6">
            <p className="text-sm font-medium mb-2">
              Profile Completion: {completionStatus?.completionPercentage || 0}%
            </p>
            <Progress 
              value={completionStatus?.completionPercentage || 0} 
              className="w-full"
            />
          </div>

          <ul className="space-y-4">
            {completionStatus?.requiredFields?.map((field: string) => (
              <motion.li
                key={field}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex justify-between items-center border rounded p-3 bg-white"
              >
                <div className="flex items-center gap-3">
                  {completionStatus.missingFields.includes(field) ? (
                    <Circle className="h-5 w-5 text-gray-300" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  <span className="capitalize">{field.replace("_", " ")}</span>
                </div>
                {completionStatus.missingFields.includes(field) ? (
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`/profile/edit?focus=${field}`)}
                  >
                    Complete
                  </Button>
                ) : (
                  <span className="text-green-600 font-semibold">Done</span>
                )}
              </motion.li>
            ))}
          </ul>
          
          {completionStatus?.optionalFields?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-medium mb-4">Optional fields</h2>
              <ul className="space-y-4">
                {completionStatus.optionalFields.map((field: string) => {
                  const isCompleted = !completionStatus.missingFields.includes(field) && 
                    userProfile && 
                    userProfile[field as keyof typeof userProfile];
                  
                  return (
                    <motion.li
                      key={field}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="flex justify-between items-center border border-dashed rounded p-3 bg-white"
                    >
                      <div className="flex items-center gap-3">
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-300" />
                        )}
                        <span className="capitalize">{field.replace("_", " ")}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/profile/edit?focus=${field}`)}
                      >
                        {isCompleted ? "Edit" : "Add"}
                      </Button>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          )}
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Button 
              className="w-full" 
              onClick={() => navigate("/profile/edit")}
              size="lg"
            >
              Continue Profile Setup
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
