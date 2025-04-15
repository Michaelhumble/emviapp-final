
import { useProfileCompletion } from "@/hooks/useProfileCompletion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/auth";

export default function ArtistProfileSetupPage() {
  const { completionStatus, isLoading } = useProfileCompletion();
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Layout>
        <div className="p-4">Loading setup...</div>
      </Layout>
    );
  }

  if (completionStatus?.isComplete) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-semibold mb-4">🎉 You're all set!</h1>
          <p className="text-gray-600 mb-6">Your artist profile is complete and ready.</p>
          <Button onClick={() => navigate("/dashboard/artist")}>
            Go to Dashboard
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
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
            <li
              key={field}
              className="flex justify-between items-center border rounded p-3 bg-white"
            >
              <span className="capitalize">{field.replace("_", " ")}</span>
              {completionStatus.missingFields.includes(field) ? (
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/profile/edit?focus=${field}`)}
                >
                  Complete
                </Button>
              ) : (
                <span className="text-green-600 font-semibold">✅ Done</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
