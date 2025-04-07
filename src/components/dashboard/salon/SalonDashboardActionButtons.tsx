
import { Button } from "@/components/ui/button";
import { PlusCircle, Store, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const SalonDashboardActionButtons = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700 h-auto py-3 px-4 flex items-center gap-2 justify-center" asChild>
          <Link to="/post/job">
            <PlusCircle className="h-5 w-5" />
            <div className="flex flex-col items-start">
              <span>Post a New Job</span>
              <span className="text-xs font-normal opacity-80">Find nail techs</span>
            </div>
          </Link>
        </Button>
        
        <Button className="bg-indigo-600 hover:bg-indigo-700 h-auto py-3 px-4 flex items-center gap-2 justify-center">
          <Store className="h-5 w-5" />
          <div className="flex flex-col items-start">
            <span>List Salon for Sale</span>
            <span className="text-xs font-normal opacity-80">Marketplace listing</span>
          </div>
        </Button>
        
        <Button className="bg-purple-600 hover:bg-purple-700 h-auto py-3 px-4 flex items-center gap-2 justify-center">
          <TrendingUp className="h-5 w-5" />
          <div className="flex flex-col items-start">
            <span>Promote My Business</span>
            <span className="text-xs font-normal opacity-80">Boost visibility</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SalonDashboardActionButtons;
