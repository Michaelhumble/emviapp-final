
import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, BadgeDollarSign } from "lucide-react";

const SalonQuickStats = () => {
  // Mock data - in a real app, this would come from an API
  const applicantsThisMonth = Math.floor(Math.random() * 15) + 2;
  const activeJobPosts = Math.floor(Math.random() * 3) + 1;
  const creditsRemaining = Math.floor(Math.random() * 100) + 10;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <Users className="h-8 w-8 text-blue-500 mb-2" />
          <div className="text-2xl font-bold">{applicantsThisMonth}</div>
          <div className="text-sm text-gray-500">Applicants This Month</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <Briefcase className="h-8 w-8 text-blue-500 mb-2" />
          <div className="text-2xl font-bold">{activeJobPosts}</div>
          <div className="text-sm text-gray-500">Active Job Posts</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <BadgeDollarSign className="h-8 w-8 text-blue-500 mb-2" />
          <div className="text-2xl font-bold">{creditsRemaining}</div>
          <div className="text-sm text-gray-500">Credits Remaining</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonQuickStats;
