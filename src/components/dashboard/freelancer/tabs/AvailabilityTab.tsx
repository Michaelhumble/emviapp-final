
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { Calendar, Clock, Plus, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { format, isAfter, parseISO } from "date-fns";

interface TimeOff {
  id: string;
  artist_id: string;
  start_date: string;
  end_date: string;
  reason: string | null;
}

interface Availability {
  id: string;
  artist_id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Form schemas
const availabilityFormSchema = z.object({
  day_of_week: z.string(),
  start_time: z.string(),
  end_time: z.string().refine(
    (val) => true, // Simplified validation
    {
      message: "End time must be after start time",
    }
  ),
  is_available: z.boolean().default(true),
});

const timeOffFormSchema = z.object({
  start_date: z.string(),
  end_date: z.string().refine(
    (val, ctx) => {
      if (!ctx.data.start_date) return true;
      return isAfter(
        parseISO(val),
        parseISO(ctx.data.start_date)
      );
    },
    {
      message: "End date must be after start date",
    }
  ),
  reason: z.string().optional(),
});

type AvailabilityFormValues = z.infer<typeof availabilityFormSchema>;
type TimeOffFormValues = z.infer<typeof timeOffFormSchema>;

const AvailabilityTab = () => {
  const { user } = useAuth();
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [timeOff, setTimeOff] = useState<TimeOff[]>([]);
  const [loading, setLoading] = useState(true);
  const [availabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);
  const [timeOffDialogOpen, setTimeOffDialogOpen] = useState(false);
  const [editingAvailability, setEditingAvailability] = useState<Availability | null>(null);
  const [editingTimeOff, setEditingTimeOff] = useState<TimeOff | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availabilityForm = useForm<AvailabilityFormValues>({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: {
      day_of_week: "Monday",
      start_time: "09:00",
      end_time: "17:00",
      is_available: true,
    },
  });

  const timeOffForm = useForm<TimeOffFormValues>({
    resolver: zodResolver(timeOffFormSchema),
    defaultValues: {
      start_date: format(new Date(), "yyyy-MM-dd"),
      end_date: format(new Date(), "yyyy-MM-dd"),
      reason: "",
    },
  });

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        // Fetch availability settings
        const { data: availData, error: availError } = await supabase
          .from("artist_availability")
          .select("*")
          .eq("artist_id", user.id)
          .order("day_of_week", { ascending: true });

        if (availError) throw availError;

        // Fetch time off
        const { data: timeOffData, error: timeOffError } = await supabase
          .from("artist_time_off")
          .select("*")
          .eq("artist_id", user.id)
          .order("start_date", { ascending: true });

        if (timeOffError) throw timeOffError;

        setAvailability(availData || []);
        setTimeOff(timeOffData || []);
      } catch (error) {
        console.error("Error fetching availability:", error);
        toast.error("Failed to load availability settings");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [user?.id]);

  const handleAddAvailability = () => {
    setEditingAvailability(null);
    availabilityForm.reset({
      day_of_week: "Monday",
      start_time: "09:00",
      end_time: "17:00",
      is_available: true,
    });
    setAvailabilityDialogOpen(true);
  };

  const handleEditAvailability = (avail: Availability) => {
    setEditingAvailability(avail);
    availabilityForm.reset({
      day_of_week: avail.day_of_week,
      start_time: avail.start_time,
      end_time: avail.end_time,
      is_available: avail.is_available,
    });
    setAvailabilityDialogOpen(true);
  };

  const handleDeleteAvailability = async (id: string) => {
    if (!confirm("Are you sure you want to delete this availability?")) return;

    try {
      const { error } = await supabase
        .from("artist_availability")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setAvailability((prev) => prev.filter((a) => a.id !== id));
      toast.success("Availability removed");
    } catch (error) {
      console.error("Error deleting availability:", error);
      toast.error("Failed to remove availability");
    }
  };

  const handleAddTimeOff = () => {
    setEditingTimeOff(null);
    timeOffForm.reset({
      start_date: format(new Date(), "yyyy-MM-dd"),
      end_date: format(new Date(), "yyyy-MM-dd"),
      reason: "",
    });
    setTimeOffDialogOpen(true);
  };

  const handleEditTimeOff = (off: TimeOff) => {
    setEditingTimeOff(off);
    timeOffForm.reset({
      start_date: off.start_date,
      end_date: off.end_date,
      reason: off.reason || "",
    });
    setTimeOffDialogOpen(true);
  };

  const handleDeleteTimeOff = async (id: string) => {
    if (!confirm("Are you sure you want to delete this time off?")) return;

    try {
      const { error } = await supabase
        .from("artist_time_off")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setTimeOff((prev) => prev.filter((t) => t.id !== id));
      toast.success("Time off removed");
    } catch (error) {
      console.error("Error deleting time off:", error);
      toast.error("Failed to remove time off");
    }
  };

  const onAvailabilitySubmit = async (values: AvailabilityFormValues) => {
    if (!user?.id) return;

    try {
      setIsSubmitting(true);

      // Check for existing day
      const existingDay = availability.find(
        (a) => 
          a.day_of_week === values.day_of_week && 
          (!editingAvailability || a.id !== editingAvailability.id)
      );

      if (existingDay && !editingAvailability) {
        toast.error(`You already have availability set for ${values.day_of_week}`);
        return;
      }

      if (editingAvailability) {
        // Update existing availability
        const { error } = await supabase
          .from("artist_availability")
          .update({
            day_of_week: values.day_of_week,
            start_time: values.start_time,
            end_time: values.end_time,
            is_available: values.is_available,
          })
          .eq("id", editingAvailability.id);

        if (error) throw error;

        // Update local state
        setAvailability((prev) =>
          prev.map((a) =>
            a.id === editingAvailability.id
              ? {
                  ...a,
                  day_of_week: values.day_of_week,
                  start_time: values.start_time,
                  end_time: values.end_time,
                  is_available: values.is_available,
                }
              : a
          )
        );

        toast.success("Availability updated");
      } else {
        // Create new availability
        const { data, error } = await supabase
          .from("artist_availability")
          .insert({
            artist_id: user.id,
            day_of_week: values.day_of_week,
            start_time: values.start_time,
            end_time: values.end_time,
            is_available: values.is_available,
          })
          .select("*")
          .single();

        if (error) throw error;

        // Update local state
        setAvailability((prev) => [...prev, data]);
        toast.success("Availability added");
      }

      setAvailabilityDialogOpen(false);
    } catch (error) {
      console.error("Error saving availability:", error);
      toast.error("Failed to save availability");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onTimeOffSubmit = async (values: TimeOffFormValues) => {
    if (!user?.id) return;

    try {
      setIsSubmitting(true);

      if (editingTimeOff) {
        // Update existing time off
        const { error } = await supabase
          .from("artist_time_off")
          .update({
            start_date: values.start_date,
            end_date: values.end_date,
            reason: values.reason,
          })
          .eq("id", editingTimeOff.id);

        if (error) throw error;

        // Update local state
        setTimeOff((prev) =>
          prev.map((t) =>
            t.id === editingTimeOff.id
              ? {
                  ...t,
                  start_date: values.start_date,
                  end_date: values.end_date,
                  reason: values.reason || null,
                }
              : t
          )
        );

        toast.success("Time off updated");
      } else {
        // Create new time off
        const { data, error } = await supabase
          .from("artist_time_off")
          .insert({
            artist_id: user.id,
            start_date: values.start_date,
            end_date: values.end_date,
            reason: values.reason,
          })
          .select("*")
          .single();

        if (error) throw error;

        // Update local state
        setTimeOff((prev) => [...prev, data]);
        toast.success("Time off added");
      }

      setTimeOffDialogOpen(false);
    } catch (error) {
      console.error("Error saving time off:", error);
      toast.error("Failed to save time off");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Weekly Availability */}
      <Card className="shadow-sm border border-amber-100 bg-white">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Weekly Availability</CardTitle>
            <Button onClick={handleAddAvailability} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Hours
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-md" />
              ))}
            </div>
          ) : availability.length === 0 ? (
            <div className="text-center py-8 bg-muted/20 rounded-lg">
              <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <h3 className="text-lg font-medium">No availability set</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Set your weekly working hours
              </p>
              <Button onClick={handleAddAvailability}>
                <Plus className="h-4 w-4 mr-1" />
                Add Availability
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {availability.map((avail) => (
                <Card
                  key={avail.id}
                  className={`hover:shadow-md transition-shadow ${
                    avail.is_available
                      ? "border-green-100 bg-green-50/50"
                      : "border-red-100 bg-red-50/50"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{avail.day_of_week}</span>
                          {!avail.is_available && (
                            <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                              Unavailable
                            </span>
                          )}
                        </div>
                        <div className="flex mt-1 text-sm space-x-1 items-center">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {avail.start_time} - {avail.end_time}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditAvailability(avail)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteAvailability(avail.id)}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Time Off */}
      <Card className="shadow-sm border border-amber-100 bg-white">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Time Off</CardTitle>
            <Button onClick={handleAddTimeOff} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Time Off
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-md" />
              ))}
            </div>
          ) : timeOff.length === 0 ? (
            <div className="text-center py-8 bg-muted/20 rounded-lg">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <h3 className="text-lg font-medium">No time off scheduled</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Schedule vacations or days off
              </p>
              <Button onClick={handleAddTimeOff}>
                <Plus className="h-4 w-4 mr-1" />
                Schedule Time Off
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {timeOff.map((off) => (
                <Card
                  key={off.id}
                  className="hover:shadow-md transition-shadow border-amber-100 bg-amber-50/50"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">
                          {off.start_date === off.end_date
                            ? format(parseISO(off.start_date), "MMMM d, yyyy")
                            : `${format(parseISO(off.start_date), "MMM d")} - ${format(
                                parseISO(off.end_date),
                                "MMM d, yyyy"
                              )}`}
                        </div>
                        {off.reason && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {off.reason}
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditTimeOff(off)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTimeOff(off.id)}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Availability Dialog */}
      <Dialog open={availabilityDialogOpen} onOpenChange={setAvailabilityDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingAvailability ? "Edit Availability" : "Add Availability"}
            </DialogTitle>
            <DialogDescription>
              Set your working hours for a specific day of the week
            </DialogDescription>
          </DialogHeader>

          <Form {...availabilityForm}>
            <form onSubmit={availabilityForm.handleSubmit(onAvailabilitySubmit)} className="space-y-4">
              <FormField
                control={availabilityForm.control}
                name="day_of_week"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day of Week</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a day" />
                        </SelectTrigger>
                        <SelectContent>
                          {weekdays.map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={availabilityForm.control}
                  name="start_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={availabilityForm.control}
                  name="end_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={availabilityForm.control}
                name="is_available"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Available for bookings</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Uncheck this to block out this time slot
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAvailabilityDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Saving..."
                    : editingAvailability
                    ? "Update"
                    : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Time Off Dialog */}
      <Dialog open={timeOffDialogOpen} onOpenChange={setTimeOffDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingTimeOff ? "Edit Time Off" : "Schedule Time Off"}
            </DialogTitle>
            <DialogDescription>
              Block off dates when you're not available
            </DialogDescription>
          </DialogHeader>

          <Form {...timeOffForm}>
            <form onSubmit={timeOffForm.handleSubmit(onTimeOffSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={timeOffForm.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={timeOffForm.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={timeOffForm.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Vacation, Personal day"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setTimeOffDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Saving..."
                    : editingTimeOff
                    ? "Update"
                    : "Schedule"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AvailabilityTab;
