
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Bell } from "lucide-react";

const DashboardStatusWidgets = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-serif font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <p className="text-gray-500">No appointments scheduled today</p>
              <Button variant="link" size="sm" className="mt-2" asChild>
                <a href="#calendar">Check Calendar</a>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-pink-500" />
              Unread Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="inline-flex h-8 w-8 rounded-full bg-pink-100 items-center justify-center mb-2">
                <span className="font-semibold text-pink-600">3</span>
              </div>
              <p className="text-gray-500">New message requests</p>
              <Button variant="link" size="sm" className="mt-2">
                View Inbox
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-amber-500" />
              Profile Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="inline-flex h-8 w-8 rounded-full bg-green-100 items-center justify-center mb-2">
                <span className="text-green-600 text-xs font-semibold">LIVE</span>
              </div>
              <p className="text-gray-500">Your profile is visible to clients</p>
              <Button variant="link" size="sm" className="mt-2">
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DashboardStatusWidgets;
