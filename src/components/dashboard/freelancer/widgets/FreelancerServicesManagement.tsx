
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Briefcase } from "lucide-react";

export default function FreelancerServicesManagement() {
  const navigate = useNavigate();

  return (
    <Card className="mb-8 border border-purple-100 bg-white/80 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
      <div>
        <div className="flex items-center gap-2 mb-1 text-purple-700">
          <Briefcase className="h-5 w-5" />
          <span className="font-semibold">Services Management</span>
        </div>
        <p className="text-gray-600 text-sm mb-0.5">
          Manage and showcase your available services to clients.
        </p>
      </div>
      <div className="flex gap-3">
        <div className="text-sm text-gray-500 bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
          ✨ Coming Soon - Service management tools
        </div>
      </div>
    </Card>
  );
}
