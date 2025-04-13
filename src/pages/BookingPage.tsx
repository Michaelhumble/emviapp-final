
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import AuthGuard from "@/components/auth/AuthGuard";

const BookingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    providerId: "",
    serviceType: "",
    time: "",
    notes: ""
  });
  const [providers, setProviders] = useState<{ id: string; name: string }[]>([]);
  const [serviceTypes, setServiceTypes] = useState<string[]>([
    "Manicure", "Pedicure", "Gel Polish", "Nail Art", "Full Set", "Fill-in", "Nail Repair", "Hair Styling", "Makeup"
  ]);

  // Fetch providers (artists and salons)
  useState(() => {
    const fetchProviders = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id, full_name")
        .in("role", ["artist", "owner"])
        .eq("accepts_bookings", true);

      if (!error && data) {
        setProviders(data.map(p => ({ id: p.id, name: p.full_name })));
      }
    };

    fetchProviders();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to book an appointment");
      return;
    }

    if (!formData.providerId || !formData.serviceType || !date || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert([
          {
            customer_id: user.id,
            provider_id: formData.providerId,
            service_type: formData.serviceType,
            date_requested: date.toISOString().split('T')[0],
            time_requested: formData.time,
            notes: formData.notes,
            status: "pending",
            sender_id: user.id,
            recipient_id: formData.providerId
          }
        ])
        .select();
      
      if (error) throw error;
      
      setSuccess(true);
      setFormData({
        providerId: "",
        serviceType: "",
        time: "",
        notes: ""
      });
      setDate(undefined);
      
      toast.success("Booking request submitted successfully!");
      setTimeout(() => {
        navigate("/my-bookings");
      }, 2000);
    } catch (error: any) {
      console.error("Error submitting booking:", error);
      toast.error(error.message || "Failed to submit booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <AuthGuard>
        <div className="container mx-auto py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Book an Appointment</CardTitle>
                <CardDescription>
                  Fill out the form below to request a booking with your preferred service provider.
                </CardDescription>
              </CardHeader>
              
              {success ? (
                <CardContent>
                  <Alert className="bg-green-50 border-green-100">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <AlertDescription className="text-green-700">
                      <h3 className="font-medium text-lg">Booking Request Submitted!</h3>
                      <p>We've sent your booking request to the service provider. You'll receive a notification once they confirm your appointment.</p>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              ) : (
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="provider">Select Provider</Label>
                      <Select
                        value={formData.providerId}
                        onValueChange={(value) => handleInputChange("providerId", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {providers.map((provider) => (
                            <SelectItem key={provider.id} value={provider.id}>
                              {provider.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Type</Label>
                      <Select
                        value={formData.serviceType}
                        onValueChange={(value) => handleInputChange("serviceType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Select a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleInputChange("time", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any special requests or information the service provider should know"
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                      />
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Request Booking"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              )}
            </Card>
          </div>
        </div>
      </AuthGuard>
    </Layout>
  );
};

export default BookingPage;
