
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, CreditCard } from "lucide-react";
import CreditCheckModal from "@/components/posting/CreditCheckModal";
import { CREDIT_COSTS, deductCredits, checkCredits } from "@/utils/credits";

const compensationTypes = [
  "Hourly",
  "Salary",
  "Commission",
  "Booth Rental",
  "Hybrid",
  "Other"
];

const PostJob = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [compensationType, setCompensationType] = useState("");
  const [compensationDetails, setCompensationDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCreditCheck, setShowCreditCheck] = useState(false);
  const [userCredits, setUserCredits] = useState(0);

  useEffect(() => {
    // If user is not logged in, redirect to sign in
    if (!user) {
      navigate('/auth/signin');
      return;
    }
    
    // Get initial credit balance
    if (userProfile) {
      setUserCredits(userProfile.credits || 0);
    } else {
      const fetchCredits = async () => {
        const credits = await checkCredits(user.id);
        setUserCredits(credits);
      };
      fetchCredits();
    }
  }, [user, userProfile]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user has enough credits first
    if (userCredits < CREDIT_COSTS.JOB_POST) {
      setShowCreditCheck(true);
      return;
    }
    
    // Proceed with submission if they have enough credits
    await submitJob();
  };
  
  const submitJob = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      // First deduct credits
      const deductionResult = await deductCredits({
        userId: user.id,
        amount: CREDIT_COSTS.JOB_POST,
        reason: "Posted new job listing"
      });
      
      if (!deductionResult) {
        toast.error("Failed to deduct credits");
        return;
      }
      
      // Now post the job
      const { error } = await supabase
        .from('jobs')
        .insert({
          salon_id: user.id,
          title,
          description,
          requirements,
          compensation_type: compensationType,
          compensation_details: compensationDetails
        });
      
      if (error) throw error;
      
      // Refresh user profile to get updated credit balance
      refreshUserProfile();
      
      toast.success("Job posted successfully!", {
        description: `${CREDIT_COSTS.JOB_POST} credits have been deducted from your account.`
      });
      
      navigate('/dashboard/salon');
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-serif mb-2">Post a New Job</h1>
              <p className="text-gray-600 mb-8">Find the perfect artists for your salon</p>
            </div>
            
            <div className="bg-amber-50 px-4 py-2 rounded-md border border-amber-200 flex items-center">
              <CreditCard className="text-amber-500 h-4 w-4 mr-2" />
              <div>
                <span className="text-xs text-gray-500">Cost:</span>
                <p className="font-medium">{CREDIT_COSTS.JOB_POST} Credits</p>
              </div>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., Nail Technician, Hair Stylist" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the role, responsibilities, and what makes your salon special"
                    className="min-h-[120px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea 
                    id="requirements" 
                    placeholder="List qualifications, experience, certifications needed"
                    className="min-h-[100px]"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="compensationType">Compensation Type</Label>
                  <Select 
                    value={compensationType} 
                    onValueChange={setCompensationType}
                    required
                  >
                    <SelectTrigger id="compensationType">
                      <SelectValue placeholder="Select compensation type" />
                    </SelectTrigger>
                    <SelectContent>
                      {compensationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="compensationDetails">Compensation Details</Label>
                  <Input 
                    id="compensationDetails" 
                    placeholder="e.g., $25-30/hr, 60% commission" 
                    value={compensationDetails} 
                    onChange={(e) => setCompensationDetails(e.target.value)}
                  />
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-center text-sm text-muted-foreground">
                    Your job will be posted as {userProfile?.salon_name || "your salon"} and will be visible to all artists for 30 days
                  </p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Posting...
                    </>
                  ) : `Post Job (${CREDIT_COSTS.JOB_POST} Credits)`}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <div className="mt-6 bg-primary/5 p-6 rounded-lg border border-primary/10">
            <h3 className="font-medium text-lg mb-2">Great salons deserve great artists</h3>
            <p className="text-muted-foreground">Let's help you build the dream team.</p>
          </div>
        </div>
      </div>
      
      {/* Credit check modal */}
      <CreditCheckModal 
        isOpen={showCreditCheck}
        onClose={() => setShowCreditCheck(false)}
        currentCredits={userCredits}
        requiredCredits={CREDIT_COSTS.JOB_POST}
      />
    </Layout>
  );
};

export default PostJob;
