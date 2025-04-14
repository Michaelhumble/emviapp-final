
import React from "react";
import PaycheckOverview from "../payroll/PaycheckOverview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, BadgeDollarSign, CheckCircle, ArrowRightCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const TeamPayrollOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Payroll guidance card */}
      <Card className="bg-blue-50/50 border-blue-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-blue-800">
            <CalendarClock className="h-5 w-5 mr-2 text-blue-700" />
            Payroll Tracker
          </CardTitle>
          <CardDescription className="text-blue-700">
            Smart tracking of earnings based on completed services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Automatic calculations
                </p>
                <p className="text-xs text-blue-700">
                  Earnings are calculated automatically when services are marked as completed
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Custom commission rates
                </p>
                <p className="text-xs text-blue-700">
                  Set custom commission rates for each team member in Team Management
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <ArrowRightCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Need to make adjustments?
                </p>
                <p className="text-xs text-blue-700 mb-2">
                  You can mark earnings as paid once you've processed payroll
                </p>
                <Button variant="outline" size="sm" className="bg-white">
                  <BadgeDollarSign className="h-4 w-4 mr-1" />
                  Commission Settings
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Main payroll overview */}
      <PaycheckOverview />
    </div>
  );
};

export default TeamPayrollOverview;
