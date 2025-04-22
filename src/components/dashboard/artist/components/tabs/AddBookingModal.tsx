
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { TimePicker } from "@/components/ui/time-picker";

interface AddBookingModalProps {
  open: boolean;
  onClose: () => void;
  onBookingAdded: () => void;
  supabase: any;
  user: any;
}

export default function AddBookingModal({
  open,
  onClose,
  onBookingAdded,
  supabase,
  user,
}: AddBookingModalProps) {
  const [clientName, setClientName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<Date | undefined>();
  const [saving, setSaving] = useState(false);

  const canSave =
    !!clientName &&
    !!serviceType &&
    !!date &&
    !!time &&
    !saving;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!canSave || !user?.id) return;
    setSaving(true);

    // Compose date_requested and appointment_time for bookings row
    const d = date!;
    const t = time!;
    // Date in yyyy-mm-dd format
    const appointment_date = d.toISOString().slice(0, 10);
    // Appointment_time as "HH:MM:SS"
    const appointment_time = t.toTimeString().slice(0, 8);

    await supabase.from("bookings").insert([
      {
        client_name: clientName,
        service_type: serviceType,
        date_requested: appointment_date,
        appointment_time: appointment_time,
        recipient_id: user.id,
        status: "confirmed",
      },
    ]);

    setClientName("");
    setServiceType("");
    setDate(undefined);
    setTime(undefined);
    setSaving(false);
    onBookingAdded();
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="font-semibold">Add Booking</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSave}>
          <Input
            type="text"
            placeholder="Client Name"
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            autoFocus
          />
          <Input
            type="text"
            placeholder="Service Type"
            value={serviceType}
            onChange={e => setServiceType(e.target.value)}
          />
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick appointment date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <TimePicker
              date={time}
              setDate={setTime}
              label=""
              className="w-full"
              granularity="30minutes"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={!canSave}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
