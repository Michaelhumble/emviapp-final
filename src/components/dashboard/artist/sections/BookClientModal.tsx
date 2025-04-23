
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";

const SERVICES = [
  { id: "nail", label: "Nail" },
  { id: "hair", label: "Hair" },
  { id: "makeup", label: "Makeup" },
  { id: "facial", label: "Facial" },
  { id: "massage", label: "Massage" }
];

interface BookClientModalProps {
  open: boolean;
  onClose: () => void;
  onBook: (data: {
    clientName: string;
    service: string;
    date: string;
    time: string;
    note?: string;
  }) => void;
}

const TIME_OPTIONS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

const todayISO = format(new Date(), "yyyy-MM-dd");

const BookClientModal: React.FC<BookClientModalProps> = ({
  open,
  onClose,
  onBook,
}) => {
  const [clientName, setClientName] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState(todayISO);
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [step, setStep] = useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const reset = () => {
    setClientName("");
    setService("");
    setDate(todayISO);
    setTime("");
    setNote("");
    setStep("form");
    setIsSubmitting(false);
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast.error("You must be logged in to book a client");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert booking to Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          client_name: clientName,
          service_type: service,
          date_requested: date,
          time_requested: time,
          note: note || null,
          recipient_id: user.id,
          status: 'pending'
        });
        
      if (error) {
        throw error;
      }
      
      // Still call the local handler for UI updates
      onBook({ clientName, service, date, time, note });
      
      setStep("success");
      toast.success("Booking created successfully!");
      
      setTimeout(() => {
        onClose();
        reset();
      }, 1200);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => { onClose(); reset(); }}>
      <DialogContent className="max-w-md w-full rounded-xl border-0 shadow-xl glass bg-white/90 p-0 font-playfair">
        <DialogHeader>
          <DialogTitle className="pt-4 pb-1 text-center font-serif text-lg md:text-xl">
            + Book Client
          </DialogTitle>
        </DialogHeader>
        {step === "form" ? (
          <form onSubmit={handleBook} className="space-y-4 px-6 pb-6">
            <div>
              <label
                htmlFor="clientName"
                className="block text-gray-700 font-semibold mb-1"
              >
                Client Name
              </label>
              <Input
                id="clientName"
                value={clientName}
                placeholder="Enter client name"
                onChange={(e) => setClientName(e.target.value)}
                className="bg-soft-gray font-sans"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label
                htmlFor="service"
                className="block text-gray-700 font-semibold mb-1"
              >
                Select Service
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
                disabled={isSubmitting}
                className="block w-full rounded-md border border-gray-200 px-3 py-2 font-sans text-gray-800 bg-[#F1F0FB] focus:ring-2 focus:ring-purple-300"
              >
                <option value="">Select...</option>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.label}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1">
                <label
                  htmlFor="date"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Choose Date
                </label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  min={todayISO}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-soft-gray font-sans"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="time"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Time
                </label>
                <select
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="block w-full rounded-md border border-gray-200 px-3 py-2 font-sans text-gray-800 bg-[#F1F0FB] focus:ring-2 focus:ring-purple-300"
                >
                  <option value="">Select...</option>
                  {TIME_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="note"
                className="block text-gray-700 font-semibold mb-1"
              >
                Note <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <Textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="resize-none font-sans"
                rows={2}
                placeholder="Details for this booking..."
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="submit"
              className={cn(
                "w-full mt-3 bg-gradient-to-r from-purple-600 via-pink-500 to-emvi-accent text-white font-semibold shadow-lg hover:from-purple-700 hover:to-pink-600 text-base py-2 rounded-lg transition font-serif",
                (!clientName || !service || !date || !time || isSubmitting) && "opacity-60 cursor-not-allowed"
              )}
              disabled={!clientName || !service || !date || !time || isSubmitting}
            >
              {isSubmitting ? "Creating booking..." : "Confirm Booking"}
            </Button>
          </form>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center p-8 min-h-[200px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <div className="mx-auto h-14 w-14 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <p className="text-lg font-semibold mb-1 text-center">
              Booking created!
            </p>
            <p className="text-muted-foreground text-center">
              The appointment has been added to your calendar.
            </p>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookClientModal;
