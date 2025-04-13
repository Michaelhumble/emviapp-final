
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  MoreHorizontal, 
  UserPlus, 
  Trash, 
  Clock, 
  Check 
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface WaitlistRequest {
  id: string;
  full_name: string;
  email: string;
  user_type: string;
  reason: string;
  status: string;
  created_at: string;
}

const WaitlistManager = () => {
  const [waitlistRequests, setWaitlistRequests] = useState<WaitlistRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<WaitlistRequest | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "delete">("approve");

  // Fetch waitlist requests
  const fetchWaitlistRequests = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from("waitlist_requests")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      
      setWaitlistRequests(data || []);
    } catch (error: any) {
      console.error("Error fetching waitlist requests:", error);
      toast.error("Failed to load waitlist requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWaitlistRequests();
  }, []);

  // Approve a user
  const approveUser = async (email: string) => {
    setIsApproving(true);
    
    try {
      // First check if this user exists
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .maybeSingle();
      
      if (userError) throw userError;
      
      if (userData) {
        // User exists, update invited status
        const { error: updateError } = await supabase
          .from("users")
          .update({ invited: true })
          .eq("id", userData.id);
          
        if (updateError) throw updateError;
        
        // Update waitlist request status
        const { error: requestError } = await supabase
          .from("waitlist_requests")
          .update({ status: "approved" })
          .eq("id", selectedRequest?.id);
          
        if (requestError) throw requestError;
        
        toast.success(`Approved access for ${email}`);
        fetchWaitlistRequests();
      } else {
        // User doesn't exist yet, just update the waitlist status
        const { error: requestError } = await supabase
          .from("waitlist_requests")
          .update({ status: "approved" })
          .eq("id", selectedRequest?.id);
          
        if (requestError) throw requestError;
        
        toast.info(`${email} approved but hasn't signed up yet`);
        fetchWaitlistRequests();
      }
    } catch (error: any) {
      console.error("Error approving user:", error);
      toast.error(`Failed to approve user: ${error.message}`);
    } finally {
      setIsApproving(false);
      setAlertOpen(false);
    }
  };

  // Delete a waitlist request
  const deleteRequest = async (id: string) => {
    try {
      const { error } = await supabase
        .from("waitlist_requests")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      
      toast.success("Waitlist request deleted");
      fetchWaitlistRequests();
    } catch (error: any) {
      console.error("Error deleting waitlist request:", error);
      toast.error(`Failed to delete request: ${error.message}`);
    } finally {
      setAlertOpen(false);
    }
  };

  // Handle action confirmation
  const handleActionConfirm = () => {
    if (!selectedRequest) return;
    
    if (actionType === "approve") {
      approveUser(selectedRequest.email);
    } else if (actionType === "delete") {
      deleteRequest(selectedRequest.id);
    }
  };

  // Open the confirmation dialog
  const openConfirmDialog = (request: WaitlistRequest, action: "approve" | "delete") => {
    setSelectedRequest(request);
    setActionType(action);
    setAlertOpen(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <UserPlus className="h-5 w-5 mr-2" />
          Beta Access Waitlist
        </CardTitle>
        <CardDescription>
          Manage access requests to the private beta
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center my-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : waitlistRequests.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No waitlist requests found
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
                  <TableHead>Requested</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {waitlistRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.full_name}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.user_type}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {request.status === "approved" ? (
                          <div className="flex items-center text-green-600">
                            <Check className="h-4 w-4 mr-1" />
                            <span>Approved</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-amber-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Pending</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(request.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openConfirmDialog(request, "approve")}
                            disabled={request.status === "approved"}
                            className={request.status === "approved" ? "text-gray-400" : "text-green-600"}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Approve Access
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => openConfirmDialog(request, "delete")}
                            className="text-red-600"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete Request
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        {/* Confirmation Dialog */}
        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {actionType === "approve" ? "Approve Beta Access" : "Delete Request"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {actionType === "approve" 
                  ? `Are you sure you want to grant beta access to ${selectedRequest?.email}?`
                  : `Are you sure you want to delete the request from ${selectedRequest?.email}?`
                }
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleActionConfirm}
                className={actionType === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
              >
                {isApproving && actionType === "approve" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Approving...
                  </>
                ) : (
                  actionType === "approve" ? "Approve" : "Delete"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default WaitlistManager;
