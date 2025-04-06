
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Loader2, Calendar, ExternalLink, Link as LinkIcon, ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { Form, FormField, FormItem, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";

interface BookingSetupFormValues {
  acceptsBookings: boolean;
  bookingUrl: string;
}

const BookingSetupPage = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BookingSetupFormValues>({
    defaultValues: {
      acceptsBookings: false,
      bookingUrl: "",
    },
  });

  useEffect(() => {
    document.title = "Booking Setup | EmviApp";
    
    // Set form values from user profile when loaded
    if (userProfile) {
      form.reset({
        acceptsBookings: userProfile.accepts_bookings || false,
        bookingUrl: userProfile.booking_url || "",
      });
    }
  }, [userProfile, form]);

  const onSubmit = async (values: BookingSetupFormValues) => {
    if (!user) {
      toast.error("You must be logged in to update booking settings");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("users")
        .update({
          accepts_bookings: values.acceptsBookings,
          booking_url: values.bookingUrl || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) {
        throw error;
      }

      await refreshUserProfile();
      toast.success("Booking settings updated successfully");
    } catch (error) {
      console.error("Error updating booking settings:", error);
      toast.error("Failed to update booking settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <motion.div
        className="min-h-screen bg-gradient-to-b from-white to-purple-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <RoleDashboardLayout>
          <div className="container mx-auto px-4 pb-20">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                className="pl-0 mb-2" 
                onClick={() => navigate("/dashboard/artist")}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl md:text-3xl font-serif font-semibold">Get Ready to Accept Bookings</h1>
            </div>

            <Card className="border-purple-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Booking Settings</CardTitle>
                <CardDescription>
                  You're one step away from growing your client base. Set up your profile so customers can book you directly from EmviApp.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="acceptsBookings"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 rounded-lg border border-purple-100 bg-purple-50">
                          <div className="space-y-0.5">
                            <Label htmlFor="accept-bookings" className="text-base font-medium">
                              Accept Bookings
                            </Label>
                            <FormDescription className="text-sm text-gray-600">
                              Turn this on when you're ready to receive booking requests from clients
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              id="accept-bookings"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bookingUrl"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <Label htmlFor="booking-url" className="text-base font-medium flex items-center">
                            <LinkIcon className="h-4 w-4 mr-2 text-purple-500" />
                            Booking Link (Optional)
                          </Label>
                          <FormDescription className="text-sm text-gray-600">
                            Add your Calendly, Square, or other booking service URL
                          </FormDescription>
                          <FormControl>
                            <Input
                              id="booking-url"
                              placeholder="https://calendly.com/your-username"
                              {...field}
                              className="w-full"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <h3 className="font-medium flex items-center text-purple-800">
                        <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                        What Happens Next?
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        When enabled, a "Book Me" button will appear on your public profile. 
                        Clients can click it to schedule an appointment with you through your booking link.
                      </p>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Setup"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </RoleDashboardLayout>
      </motion.div>
    </Layout>
  );
};

export default BookingSetupPage;
