
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lightbulb, Bug, Map, Plus, Trash2, Save, CheckCircle, XCircle, Mail } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface IdeaItem {
  id: string;
  content: string;
}

interface BugItem {
  id: string;
  content: string;
}

interface WaitlistRequest {
  id: string;
  full_name: string;
  email: string;
  user_type: string;
  reason: string;
  status: string;
  created_at: string;
}

const InternalTools = () => {
  const [roadmapContent, setRoadmapContent] = useState("");
  const [ideas, setIdeas] = useState<IdeaItem[]>([]);
  const [bugs, setBugs] = useState<BugItem[]>([]);
  const [newIdea, setNewIdea] = useState("");
  const [newBug, setNewBug] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [waitlistRequests, setWaitlistRequests] = useState<WaitlistRequest[]>([]);
  const [loadingWaitlist, setLoadingWaitlist] = useState(true);

  // Load data from localStorage for now
  // In a real implementation, this would be from the database
  useEffect(() => {
    const loadLocalData = () => {
      try {
        const savedRoadmap = localStorage.getItem("command_center_roadmap");
        if (savedRoadmap) setRoadmapContent(savedRoadmap);
        
        const savedIdeas = localStorage.getItem("command_center_ideas");
        if (savedIdeas) setIdeas(JSON.parse(savedIdeas));
        
        const savedBugs = localStorage.getItem("command_center_bugs");
        if (savedBugs) setBugs(JSON.parse(savedBugs));
      } catch (error) {
        console.error("Error loading saved data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadLocalData();
    fetchWaitlistRequests();
  }, []);

  const fetchWaitlistRequests = async () => {
    setLoadingWaitlist(true);
    try {
      const { data, error } = await supabase
        .from("waitlist_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setWaitlistRequests(data || []);
    } catch (error) {
      console.error("Error fetching waitlist requests:", error);
      toast.error("Failed to load waitlist requests");
    } finally {
      setLoadingWaitlist(false);
    }
  };

  // Save data to localStorage for now
  const saveRoadmap = () => {
    setSaving(true);
    try {
      localStorage.setItem("command_center_roadmap", roadmapContent);
      toast.success("Roadmap saved successfully");
    } catch (error) {
      console.error("Error saving roadmap:", error);
      toast.error("Failed to save roadmap");
    } finally {
      setSaving(false);
    }
  };

  const addIdea = () => {
    if (!newIdea.trim()) return;
    
    const idea = {
      id: Date.now().toString(),
      content: newIdea
    };
    
    const updatedIdeas = [...ideas, idea];
    setIdeas(updatedIdeas);
    localStorage.setItem("command_center_ideas", JSON.stringify(updatedIdeas));
    setNewIdea("");
    toast.success("New idea added");
  };

  const deleteIdea = (id: string) => {
    const updatedIdeas = ideas.filter(idea => idea.id !== id);
    setIdeas(updatedIdeas);
    localStorage.setItem("command_center_ideas", JSON.stringify(updatedIdeas));
    toast.success("Idea removed");
  };

  const addBug = () => {
    if (!newBug.trim()) return;
    
    const bug = {
      id: Date.now().toString(),
      content: newBug
    };
    
    const updatedBugs = [...bugs, bug];
    setBugs(updatedBugs);
    localStorage.setItem("command_center_bugs", JSON.stringify(updatedBugs));
    setNewBug("");
    toast.success("Bug added to tracker");
  };

  const deleteBug = (id: string) => {
    const updatedBugs = bugs.filter(bug => bug.id !== id);
    setBugs(updatedBugs);
    localStorage.setItem("command_center_bugs", JSON.stringify(updatedBugs));
    toast.success("Bug removed from tracker");
  };

  const approveWaitlistRequest = async (id: string, email: string) => {
    try {
      // Update request status
      const { error: updateError } = await supabase
        .from("waitlist_requests")
        .update({ status: "approved" })
        .eq("id", id);

      if (updateError) throw updateError;

      // Check if user already exists
      const { data: existingUser, error: userCheckError } = await supabase
        .from("users")
        .select("id, email")
        .eq("email", email)
        .single();

      if (userCheckError && userCheckError.code !== "PGRST116") {
        throw userCheckError;
      }

      // If user exists, update their invited status
      if (existingUser) {
        const { error: userUpdateError } = await supabase
          .from("users")
          .update({ invited: true })
          .eq("id", existingUser.id);

        if (userUpdateError) throw userUpdateError;
      }

      // Refresh waitlist data
      fetchWaitlistRequests();
      toast.success(`Request from ${email} has been approved`);
    } catch (error) {
      console.error("Error approving waitlist request:", error);
      toast.error("Failed to approve request");
    }
  };

  const rejectWaitlistRequest = async (id: string) => {
    try {
      const { error } = await supabase
        .from("waitlist_requests")
        .update({ status: "rejected" })
        .eq("id", id);

      if (error) throw error;

      fetchWaitlistRequests();
      toast.success("Request rejected");
    } catch (error) {
      console.error("Error rejecting waitlist request:", error);
      toast.error("Failed to reject request");
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl font-semibold">Founder Tools</h2>
      
      <Tabs defaultValue="ideas">
        <TabsList className="mb-4">
          <TabsTrigger value="ideas">Ideas & Roadmap</TabsTrigger>
          <TabsTrigger value="waitlist">Waitlist Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ideas" className="space-y-6">
          {/* Roadmap Notepad */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center">
                <Map className="h-4 w-4 mr-2 text-blue-600" />
                Roadmap Notepad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={roadmapContent} 
                onChange={(e) => setRoadmapContent(e.target.value)}
                placeholder="Enter roadmap notes, upcoming features, and milestones..."
                className="min-h-[150px] mb-3 w-full resize-y"
              />
              <Button 
                onClick={saveRoadmap} 
                disabled={saving}
                className="flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Roadmap'}
              </Button>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Upcoming Ideas */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2 text-amber-600" />
                  Upcoming Ideas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex mb-4 w-full">
                  <Input 
                    value={newIdea} 
                    onChange={(e) => setNewIdea(e.target.value)}
                    placeholder="Add a new idea..."
                    className="mr-2 flex-grow"
                  />
                  <Button onClick={addIdea} size="sm" className="shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {ideas.map(idea => (
                    <div 
                      key={idea.id} 
                      className="flex items-center justify-between p-2 bg-amber-50 rounded border border-amber-100"
                    >
                      <span className="text-sm mr-2 break-words flex-grow">{idea.content}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteIdea(idea.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700 flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {ideas.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">No ideas added yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Bug Tracker */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <Bug className="h-4 w-4 mr-2 text-red-600" />
                  Bug Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex mb-4 w-full">
                  <Input 
                    value={newBug} 
                    onChange={(e) => setNewBug(e.target.value)}
                    placeholder="Add a new bug..."
                    className="mr-2 flex-grow"
                  />
                  <Button onClick={addBug} size="sm" className="shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {bugs.map(bug => (
                    <div 
                      key={bug.id} 
                      className="flex items-center justify-between p-2 bg-red-50 rounded border border-red-100"
                    >
                      <span className="text-sm mr-2 break-words flex-grow">{bug.content}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteBug(bug.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700 flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {bugs.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">No bugs added yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="waitlist">
          <Card>
            <CardHeader>
              <CardTitle>Waitlist Management</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingWaitlist ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : (
                <>
                  {waitlistRequests.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No waitlist requests yet
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {waitlistRequests.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell className="font-medium">{request.full_name}</TableCell>
                              <TableCell>{request.email}</TableCell>
                              <TableCell>{request.user_type}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    request.status === "approved"
                                      ? "success"
                                      : request.status === "rejected"
                                      ? "destructive"
                                      : "outline"
                                  }
                                >
                                  {request.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {new Date(request.created_at).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-right">
                                {request.status === "pending" && (
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => approveWaitlistRequest(request.id, request.email)}
                                      className="h-8 px-2 text-green-600"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Approve
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => rejectWaitlistRequest(request.id)}
                                      className="h-8 px-2 text-red-600"
                                    >
                                      <XCircle className="h-4 w-4 mr-1" />
                                      Reject
                                    </Button>
                                  </div>
                                )}
                                {request.status === "approved" && (
                                  <Button variant="outline" size="sm" className="h-8 px-2">
                                    <Mail className="h-4 w-4 mr-1" />
                                    Send Invite
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InternalTools;
