
import React, { useState, useEffect, useCallback } from 'react';
import { Calendar as CalendarIcon } from "lucide-react";
import { format, isSameDay, isBefore, addDays, subDays } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Define the ArtistAvailability type
interface ArtistAvailability {
  id: string;
  artist_id: string;
  date: string;
  start_time: number;
  end_time: number;
  is_recurring: boolean;
  notes: string;
}

// API functions for artist availability
const createArtistAvailability = async (data: any) => {
  const { data: result, error } = await supabase
    .from('artist_availability')
    .insert(data)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

const updateArtistAvailability = async (data: any) => {
  const { data: result, error } = await supabase
    .from('artist_availability')
    .update(data)
    .eq('id', data.id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
};

const deleteArtistAvailability = async (id: string) => {
  const { error } = await supabase
    .from('artist_availability')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return id;
};

interface ArtistCalendarProps {
  artistId: string;
  existingAvailability: ArtistAvailability[];
}

const ArtistCalendar: React.FC<ArtistCalendarProps> = ({ artistId, existingAvailability }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [startTime, setStartTime] = useState<number>(9);
  const [endTime, setEndTime] = useState<number>(17);
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [selectedAvailability, setSelectedAvailability] = useState<ArtistAvailability | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const createAvailabilityMutation = useMutation({
    mutationFn: createArtistAvailability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artist-availability', artistId] });
      toast.success("Availability Created", {
        description: "Your availability has been successfully created.",
      });
      resetForm();
      setIsPopoverOpen(false);
    },
    onError: (error: any) => {
      toast.error("Error", {
        description: error.message || "Failed to create availability.",
      });
    },
  });

  const updateAvailabilityMutation = useMutation({
    mutationFn: updateArtistAvailability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artist-availability', artistId] });
      toast.success("Availability Updated", {
        description: "Your availability has been successfully updated.",
      });
      resetForm();
      setIsPopoverOpen(false);
    },
    onError: (error: any) => {
      toast.error("Error", {
        description: error.message || "Failed to update availability.",
      });
    },
  });

  const deleteAvailabilityMutation = useMutation({
    mutationFn: deleteArtistAvailability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artist-availability', artistId] });
      toast.success("Availability Deleted", {
        description: "Your availability has been successfully deleted.",
      });
      resetForm();
      setIsPopoverOpen(false);
      setIsDeleteDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error("Error", {
        description: error.message || "Failed to delete availability.",
      });
      setIsDeleteDialogOpen(false);
    },
  });

  const resetForm = () => {
    setDate(undefined);
    setStartTime(9);
    setEndTime(17);
    setIsRecurring(false);
    setNotes('');
    setSelectedAvailability(null);
  };

  const handleDayClick = useCallback((day: Date) => {
    setDate(day);
    setSelectedAvailability(existingAvailability.find(availability =>
      isSameDay(new Date(availability.date), day)
    ) || null);
    setIsPopoverOpen(true);
  }, [existingAvailability]);

  useEffect(() => {
    if (selectedAvailability) {
      setDate(new Date(selectedAvailability.date));
      setStartTime(selectedAvailability.start_time);
      setEndTime(selectedAvailability.end_time);
      setIsRecurring(selectedAvailability.is_recurring);
      setNotes(selectedAvailability.notes);
    } else if (date) {
      setDate(date);
      setStartTime(9);
      setEndTime(17);
      setIsRecurring(false);
      setNotes('');
    }
  }, [selectedAvailability, date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      toast.error("Error", {
        description: "Please select a date.",
      });
      return;
    }

    const availabilityData = {
      artist_id: artistId,
      date: format(date, 'yyyy-MM-dd'),
      start_time: startTime,
      end_time: endTime,
      is_recurring: isRecurring,
      notes: notes,
      user_id: user?.id
    };

    if (selectedAvailability) {
      updateAvailabilityMutation.mutate({
        id: selectedAvailability.id,
        ...availabilityData
      });
    } else {
      createAvailabilityMutation.mutate(availabilityData);
    }
  };

  const handleDelete = async () => {
    if (selectedAvailability) {
      deleteAvailabilityMutation.mutate(selectedAvailability.id);
    }
  };

  const isDayAvailable = (day: Date) => {
    return !isBefore(day, subDays(new Date(), 1));
  };

  const isDayBooked = (day: Date) => {
    return existingAvailability.some(availability =>
      isSameDay(new Date(availability.date), day)
    );
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center" side="bottom">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={handleDayClick}
            disabled={!isDayAvailable}
            modifiers={{
              booked: isDayBooked,
            }}
            modifiersStyles={{
              booked: {
                backgroundColor: "hsl(var(--primary))",
                color: "white",
              },
            }}
            showOutsideDays
          />
        </PopoverContent>
      </Popover>

      {date && (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <Slider
              id="startTime"
              defaultValue={[startTime]}
              max={24}
              min={0}
              step={1}
              onValueChange={(value) => setStartTime(value[0])}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              {startTime}:00
            </p>
          </div>
          <div>
            <Label htmlFor="endTime">End Time</Label>
            <Slider
              id="endTime"
              defaultValue={[endTime]}
              max={24}
              min={0}
              step={1}
              onValueChange={(value) => setEndTime(value[0])}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              {endTime}:00
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
            <Label htmlFor="recurring">Recurring</Label>
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about your availability"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            {selectedAvailability && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your availability from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button type="submit" disabled={createAvailabilityMutation.isPending || updateAvailabilityMutation.isPending}>
              {selectedAvailability ? (updateAvailabilityMutation.isPending ? "Updating..." : "Update Availability") : (createAvailabilityMutation.isPending ? "Creating..." : "Create Availability")}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ArtistCalendar;
