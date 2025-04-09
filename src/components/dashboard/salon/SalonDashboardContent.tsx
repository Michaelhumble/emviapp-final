
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/context/auth';
import SalonDashboardBanner from './SalonDashboardBanner';
import SalonQuickStats from './SalonQuickStats';
import SalonPostedJobsSection from './SalonPostedJobsSection';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, Calendar, Settings, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { adaptUserProfile } from '@/utils/profileAdapter';
import SalonMetricsCards from './SalonMetricsCards';

const SalonDashboardContent = () => {
  const { userProfile, user } = useAuth();
  const adaptedProfile = adaptUserProfile(userProfile);
  const userId = user?.id || '';
  
  // Mock data for upcoming appointments
  const upcomingAppointments = [
    { id: '1', customer: 'Jane Smith', service: 'Nail Art', date: 'Today, 3:00 PM' },
    { id: '2', customer: 'Robert Lee', service: 'Manicure', date: 'Tomorrow, 10:30 AM' },
    { id: '3', customer: 'Maria Garcia', service: 'Full Set', date: 'May 15, 1:45 PM' },
  ];
  
  // Mock data for saved technicians
  const savedTechnicians = [
    { id: '1', name: 'Linh Nguyen', specialty: 'Nail Art', experience: '5 years' },
    { id: '2', name: 'Kim Tran', specialty: 'Acrylic', experience: '8 years' },
    { id: '3', name: 'David Park', specialty: 'Gel Extensions', experience: '3 years' },
  ];
  
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <SalonDashboardBanner userName={adaptedProfile?.salon_name} />
      
      {/* Quick Stats */}
      <SalonQuickStats />
      
      {/* Metrics Cards */}
      <SalonMetricsCards salonId={userId} />
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Appointments Section */}
        <Card className="border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg text-blue-800 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Upcoming Appointments
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600">
                <Link to="/appointments">View All</Link>
              </Button>
            </div>
            <CardDescription className="text-blue-600">
              Your scheduled client appointments
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((appt) => (
                  <div key={appt.id} className="flex items-center justify-between p-3 bg-white border border-blue-50 rounded-md hover:bg-blue-50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-800">{appt.customer}</p>
                      <p className="text-sm text-gray-600">{appt.service}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-700 font-medium">{appt.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No upcoming appointments</p>
              </div>
            )}
            <div className="mt-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Manage Appointments
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Saved Technicians Section */}
        <Card className="border-indigo-100">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg text-indigo-800 flex items-center">
                <Users className="h-5 w-5 mr-2 text-indigo-600" />
                Saved Technicians
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-indigo-600">
                <Link to="/explore/artists">Find More</Link>
              </Button>
            </div>
            <CardDescription className="text-indigo-600">
              Artists you've saved or are interested in hiring
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            {savedTechnicians.length > 0 ? (
              <div className="space-y-3">
                {savedTechnicians.map((tech) => (
                  <div key={tech.id} className="flex items-center justify-between p-3 bg-white border border-indigo-50 rounded-md hover:bg-indigo-50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-800">{tech.name}</p>
                      <p className="text-sm text-gray-600">{tech.specialty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-indigo-700 text-sm">{tech.experience}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No saved technicians</p>
              </div>
            )}
            <div className="mt-4">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                Browse Technicians
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Job Listings Section */}
      <SalonPostedJobsSection />
      
      {/* Management Actions */}
      <Card className="border-gray-200 bg-neutral-50">
        <CardHeader>
          <CardTitle className="text-lg">Manage Your Salon</CardTitle>
          <CardDescription>
            Edit your profile or view how clients see your salon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <Button variant="outline" className="flex items-center justify-center">
              <Settings className="mr-2 h-4 w-4" />
              Edit Salon Profile
            </Button>
            <Button variant="outline" className="flex items-center justify-center">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Public Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonDashboardContent;
