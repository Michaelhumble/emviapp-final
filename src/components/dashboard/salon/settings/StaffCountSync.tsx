
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useSalon } from "@/context/salon/SalonContext";
import { Users, AlertCircle, ChevronRight } from "lucide-react";
import { TeamMember } from "../team/types";
import { useSalonPlan } from "./useSalonPlan";

export const StaffCountSync = () => {
  const { currentSalon } = useSalon();
  const { activePlan, staffCount, needsUpgrade } = useSalonPlan();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTeamMembers = async () => {
      if (!currentSalon?.id) return;
      
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('salon_staff')
          .select('id, full_name, email, avatar_url, role, specialty, status')
          .eq('salon_id', currentSalon.id);
          
        if (error) throw error;
        
        // Transform the data and ensure status is properly typed
        if (data) {
          const typedMembers: TeamMember[] = data.map(item => ({
            id: item.id,
            full_name: item.full_name,
            email: item.email,
            avatar_url: item.avatar_url,
            role: item.role,
            specialty: item.specialty,
            // Ensure status is only 'active' or 'inactive'
            status: (item.status === 'active' || item.status === 'inactive') 
              ? item.status 
              : 'inactive' // Default value if status is invalid
          }));
          
          setTeamMembers(typedMembers);
        } else {
          setTeamMembers([]);
        }
      } catch (err) {
        console.error("Error fetching team members:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeamMembers();
  }, [currentSalon?.id]);
  
  const activeStaff = teamMembers.filter(member => member.status === 'active');
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members
          </CardTitle>
          <CardDescription>
            {!loading
              ? `Your salon has ${activeStaff.length} active team members`
              : "Loading team information..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="py-1 px-2">
                  {activeStaff.length} Active
                </Badge>
                <Badge variant="outline" className="bg-gray-100 py-1 px-2">
                  {teamMembers.length - activeStaff.length} Inactive
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Your {activePlan?.name} plan allows for {activePlan?.staffLimit === Infinity 
                  ? "unlimited" 
                  : `up to ${activePlan?.staffLimit}`} team members.
              </p>
            </div>
            <Button variant="outline" className="gap-1" onClick={() => window.location.href = "/dashboard/salon/team"}>
              Manage Team
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {needsUpgrade && (
        <Alert variant="destructive" className="border-red-300 bg-red-50 mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Staff limit exceeded</AlertTitle>
          <AlertDescription>
            Your current plan allows for {activePlan?.staffLimit} staff members, but you have {activeStaff.length} active members.
            Please upgrade your plan to continue using all features with your entire team.
          </AlertDescription>
          <div className="mt-4">
            <Button 
              variant="destructive"
              onClick={() => window.location.href = "/dashboard/salon/settings"}
            >
              Review Plan Options
            </Button>
          </div>
        </Alert>
      )}
    </div>
  );
};
