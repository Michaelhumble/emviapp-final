
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, RefreshCcw } from "lucide-react";
import { useTeamMembers } from "./useTeamMembers";
import { SalonTeamMember } from "../types";
import TeamMemberForm from "./TeamMemberForm";
import SalonTeamTable from "./SalonTeamTable";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import TeamMembersList from "./TeamMembersList";

const SalonTeamManagement = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { 
    teamMembers, 
    loading, 
    error, 
    fetchTeamMembers,
    sendInvite, 
    updateTeamMember,
    removeTeamMember,
    toggleMemberStatus,
  } = useTeamMembers();

  const [activeView, setActiveView] = useState<'table' | 'cards'>('table');

  const handleAddMember = async (memberData: Partial<SalonTeamMember>) => {
    await sendInvite(memberData);
    setIsFormOpen(false);
  };

  const handleUpdateMember = async (id: string, updates: Partial<SalonTeamMember>) => {
    await updateTeamMember(id, updates);
  };

  return (
    <Card className="border-purple-100 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-xl font-serif text-purple-900">Team Management</CardTitle>
          <CardDescription>Manage your salon team members and their permissions</CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="text-purple-600"
            onClick={fetchTeamMembers}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            onClick={() => setIsFormOpen(true)}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-2">{error.message}</p>
            <Button 
              variant="outline" 
              onClick={fetchTeamMembers}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="table" value={activeView} onValueChange={(v) => setActiveView(v as 'table' | 'cards')}>
            <TabsList className="mb-4">
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="cards">Card View</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <SalonTeamTable 
                teamMembers={teamMembers}
                loading={loading}
                onRemoveTeamMember={removeTeamMember}
                onToggleStatus={toggleMemberStatus}
                onUpdateTeamMember={updateTeamMember}
              />
            </TabsContent>
            <TabsContent value="cards">
              <TeamMembersList
                teamMembers={teamMembers}
                loading={loading}
                error={error}
                onRemoveTeamMember={removeTeamMember}
                onToggleMemberStatus={toggleMemberStatus}
                onEdit={(member) => {
                  setIsFormOpen(true);
                  return member;
                }}
              />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>

      <TeamMemberForm 
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddMember}
        initialData={null}
      />
    </Card>
  );
};

export default SalonTeamManagement;
