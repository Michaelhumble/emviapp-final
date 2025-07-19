
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";

export default function FreelancerAvailabilityEditor() {
  const navigate = useNavigate();
  return (
    <Card className="mb-8 border bg-purple-50/70 border-purple-100 flex items-center p-5 gap-4">
      <Calendar className="h-6 w-6 text-purple-600" />
      <div className="flex-1">
        <div className="font-semibold">Manage Your Availability</div>
        <div className="text-sm text-gray-500">Update the times when clients can book you.</div>
      </div>
      <div className="text-sm text-gray-500 bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
        ✨ Coming Soon
      </div>
    </Card>
  );
}
