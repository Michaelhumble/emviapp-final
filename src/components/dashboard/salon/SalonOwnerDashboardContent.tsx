
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/context/auth';
import { Briefcase, Users, Scissors, Calendar, Clock } from 'lucide-react';

const SalonOwnerDashboardContent = () => {
  const { userProfile } = useAuth();
  
  // Placeholder data - in a real application, this would come from an API
  const statsData = [
    { title: 'Active Job Posts', value: '3', icon: Briefcase, change: '+1 from last week' },
    { title: 'Profile Views', value: '243', icon: Users, change: '+22% this month' },
    { title: 'Artist Applications', value: '12', icon: Scissors, change: '5 new this week' },
    { title: 'Upcoming Interviews', value: '4', icon: Calendar, change: 'Next: Tomorrow, 1PM' },
  ];
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Artists that recently applied to your job posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Placeholder for recent applications */}
              <p className="text-sm text-muted-foreground">
                You don't have any recent applications yet.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
            <CardDescription>Your interviews and events for the next few days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Placeholder for upcoming schedule */}
              <div className="flex items-center gap-4 rounded-md border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Interview with Jane Smith</p>
                  <p className="text-sm text-muted-foreground">Tomorrow, 1:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalonOwnerDashboardContent;
