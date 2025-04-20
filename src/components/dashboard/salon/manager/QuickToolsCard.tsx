
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function QuickToolsCard() {
  const navigate = useNavigate();

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-green-50 to-white border-0">
      <CardHeader className="flex flex-row items-center pb-2 gap-2">
        <Wrench className="h-6 w-6 text-green-600" />
        <CardTitle className="text-lg sm:text-xl font-playfair">Quick Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3 mt-1">
          <Button
            className="flex-1 rounded-lg bg-green-500 text-white font-medium shadow hover:bg-green-600 min-h-[44px] transition"
            onClick={() => navigate("/dashboard/manage-team-schedule")}
          >
            Manage Team Schedule
          </Button>
          <Button
            className="flex-1 rounded-lg border border-green-500 text-green-700 bg-green-50 hover:bg-green-100 font-medium min-h-[44px] transition"
            variant="outline"
            onClick={() => navigate("/dashboard/reschedule-assist")}
          >
            <HelpCircle className="h-5 w-5 mr-2" />
            Help Artist Reschedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
