
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Pencil, Trash, Calendar } from "lucide-react";
import { toast } from "sonner";
import { format, parse } from "date-fns";

interface AvailabilityDay {
  id?: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

// Validation schema for the availability form
const availabilityFormSchema = z.object({
  day_of_week: z.string().min(1, { message: "Please select a day of the week" }),
  start_time: z.string().min(1, { message: "Please select a start time" }),
  end_time: z.string().min(1, { message: "Please select an end time" }),
  is_available: z.boolean().default(true),
}).refine((data) => {
  // Convert times to compare them
  const start = parse(data.start_time, "HH:mm", new Date());
  const end = parse(data.end_time, "HH:mm", new Date());
  
  // Ensure end time is after start time
  return end > start;
}, {
  message: "End time must be after start time",
  path: ["end_time"]
});

type AvailabilityFormValues = z.infer<typeof availabilityFormSchema>;

const AvailabilityTab = () => {
  const { user } = useAuth();
  const [availability, setAvailability] = useState<AvailabilityDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<AvailabilityDay | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const form = useForm<AvailabilityFormValues>({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: {
      day_of_week: "",
      start_time: "09:00",
      end_time: "17:00",
      is_available: true,
    },
  });

  useEffect(() => {
    if (user?.id) {
      fetchAvailability();
    }
  }, [user?.id]);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("artist_availability")
        .select("*")
        .eq("artist_id", user?.id)
        .order("day_of_week", { ascending: true });

      if (error) throw error;
      
      // Sort days of week in the correct order
      const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      const sortedData = data.sort((a, b) => 
        daysOrder.indexOf(a.day_of_week) - daysOrder.indexOf(b.day_of_week)
      );
      
      setAvailability(sortedData);
    } catch (error) {
      console.error("Error fetching availability:", error);
      toast.error("Failed to load availability settings");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAvailability = () => {
    form.reset({
      day_of_week: "",
      start_time: "09:00",
      end_time: "17:00",
      is_available: true,
    });
    setIsAdding(true);
    setIsEditing(false);
    setCurrentItem(null);
    setShowDialog(true);
  };

  const handleEditAvailability = (item: AvailabilityDay) => {
    form.reset({
      day_of_week: item.day_of_week,
      start_time: item.start_time,
      end_time: item.end_time,
      is_available: item.is_available,
    });
    setIsAdding(false);
    setIsEditing(true);
    setCurrentItem(item);
    setShowDialog(true);
  };

  const handleDeleteAvailability = async (id: string) => {
    if (!confirm("Are you sure you want to delete this availability setting?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("artist_availability")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Availability setting deleted");
      fetchAvailability();
    } catch (error) {
      console.error("Error deleting availability:", error);
      toast.error("Failed to delete availability setting");
    }
  };

  const onSubmit = async (values: AvailabilityFormValues) => {
    try {
      if (isAdding) {
        // Create new availability
        const { error } = await supabase
          .from("artist_availability")
          .insert({
            artist_id: user?.id,
            day_of_week: values.day_of_week,
            start_time: values.start_time,
            end_time: values.end_time,
            is_available: values.is_available,
          });

        if (error) throw error;
        toast.success("Availability added successfully");
      } else if (isEditing && currentItem?.id) {
        // Update existing availability
        const { error } = await supabase
          .from("artist_availability")
          .update({
            day_of_week: values.day_of_week,
            start_time: values.start_time,
            end_time: values.end_time,
            is_available: values.is_available,
          })
          .eq("id", currentItem.id);

        if (error) throw error;
        toast.success("Availability updated successfully");
      }

      // Close dialog and refresh
      setShowDialog(false);
      fetchAvailability();
    } catch (error) {
      console.error("Error saving availability:", error);
      toast.error("Failed to save availability settings");
    }
  };

  // Generate time slots for the select dropdowns
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourStr = hour.toString().padStart(2, "0");
        const minuteStr = minute.toString().padStart(2, "0");
        options.push(`${hourStr}:${minuteStr}`);
      }
    }
    return options;
  };

  // Format time for display
  const formatTime = (time: string) => {
    try {
      const [hours, minutes] = time.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    } catch (error) {
      return time;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border border-amber-100 bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-lg">Weekly Availability</CardTitle>
          </div>
          <Button 
            onClick={handleAddAvailability}
            size="sm" 
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Plus className="mr-1 h-4 w-4" /> Add Availability
          </Button>
        </CardHeader>
        
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : availability.length === 0 ? (
            <div className="text-center py-8 bg-muted/20 rounded-lg">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <h3 className="text-lg font-medium">No availability set</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Add your working hours to let clients know when you're available
              </p>
              <Button
                onClick={handleAddAvailability}
                className="bg-amber-600 hover:bg-amber-700"
              >
                <Plus className="mr-1 h-4 w-4" /> Set Your Availability
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availability.map((day) => (
                    <TableRow key={day.id}>
                      <TableCell className="font-medium">{day.day_of_week}</TableCell>
                      <TableCell>{formatTime(day.start_time)}</TableCell>
                      <TableCell>{formatTime(day.end_time)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                          day.is_available 
                            ? "bg-green-50 text-green-700" 
                            : "bg-amber-50 text-amber-700"
                        }`}>
                          {day.is_available ? "Available" : "Unavailable"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditAvailability(day)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => day.id && handleDeleteAvailability(day.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Availability Form Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isAdding ? "Add Availability" : "Edit Availability"}
            </DialogTitle>
            <DialogDescription>
              Set your working hours for the specified day.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="day_of_week"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day of Week</FormLabel>
                    <Select
                      disabled={isEditing}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a day" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Monday">Monday</SelectItem>
                        <SelectItem value="Tuesday">Tuesday</SelectItem>
                        <SelectItem value="Wednesday">Wednesday</SelectItem>
                        <SelectItem value="Thursday">Thursday</SelectItem>
                        <SelectItem value="Friday">Friday</SelectItem>
                        <SelectItem value="Saturday">Saturday</SelectItem>
                        <SelectItem value="Sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="start_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select start time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {generateTimeOptions().map((time) => (
                            <SelectItem key={time} value={time}>
                              {formatTime(time)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="end_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select end time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {generateTimeOptions().map((time) => (
                            <SelectItem key={time} value={time}>
                              {formatTime(time)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="is_available"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Available for bookings</FormLabel>
                      <FormDescription>
                        Uncheck if you're not available during these hours
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isAdding ? "Add" : "Update"}
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
