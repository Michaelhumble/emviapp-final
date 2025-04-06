
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Calendar, BarChart } from "lucide-react";

const SalonQuickStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <Building2 className="h-8 w-8 text-blue-500 mb-2" />
          <div className="text-2xl font-bold">1</div>
          <div className="text-sm text-gray-500">Location</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <Users className="h-8 w-8 text-blue-500 mb-2" />
          <div className="text-2xl font-bold">{Math.floor(Math.random() * 10) + 3}</div>
          <div className="text-sm text-gray-500">Team Members</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <Calendar className="h-8 w-8 text-blue-500 mb-2" />
          <div className="text-2xl font-bold">{Math.floor(Math.random() * 20) + 10}</div>
          <div className="text-sm text-gray-500">Appointments</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <BarChart className="h-8 w-8 text-blue-500 mb-2" />
          <div className="text-2xl font-bold">+{Math.floor(Math.random() * 15) + 5}%</div>
          <div className="text-sm text-gray-500">Growth</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonQuickStats;
