
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, ClockIcon, Check } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface BookArtistModalProps {
  open: boolean;
  onClose: () => void;
  onBook: (data: { clientName: string; service: string; date: string; time: string; note?: string }) => void;
  services: Array<{ id: string; name: string }>;
}

const mockTimes = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"];

export const BookArtistModal: React.FC<BookArtistModalProps> = ({
  open,
  onClose,
  onBook,
  services,
}) => {
  const [clientName, setClientName] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [note, setNote] = useState("");
  const [step, setStep] = useState<"form" | "success">("form");

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    onBook({ clientName, service, date, time, note });
    setStep("success");
    setTimeout(() => {
      setStep("form");
      onClose();
      // reset fields
      setClientName(""); setService(""); setDate(""); setTime(""); setNote("");
    }, 1600);
  };

  // min date: today
  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full bg-white/95 backdrop-blur-xl border-0 rounded-xl shadow-lg p-0">
        <DialogHeader>
          <DialogTitle className="font-serif text-lg md:text-xl pt-2 mb-1 text-center">
            Book This Artist
          </DialogTitle>
        </DialogHeader>
        {step === "form" ? (
          <form className="space-y-4 p-4 pt-2" onSubmit={handleBooking}>
            <div>
              <Label htmlFor="clientName" className="mb-1 block text-gray-700">
                Your Name
              </Label>
              <Input
                id="clientName"
                placeholder="Enter your full name"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="service" className="mb-1 block text-gray-700">
                Select Service
              </Label>
              <select
                id="service"
                required
                value={service}
                onChange={e => setService(e.target.value)}
                className="block w-full rounded-md border border-gray-200 px-3 py-2 text-gray-800 bg-soft-gray focus:ring-2 focus:ring-purple-300"
                style={{ background: "#F1F0FB" }}
              >
                <option value="">Select...</option>
                {(services || []).map(s => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="date" className="mb-1 block text-gray-700">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  required
                  min={today}
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="time" className="mb-1 block text-gray-700">
                  Time
                </Label>
                <select
                  id="time"
                  required
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="block w-full rounded-md border border-gray-200 px-3 py-2 text-gray-800 bg-soft-gray focus:ring-2 focus:ring-purple-300"
                  style={{ background: "#F1F0FB" }}
                >
                  <option value="">Select...</option>
                  {mockTimes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="note" className="mb-1 block text-gray-700">
                Notes <span className="text-sm text-gray-400">(optional)</span>
              </Label>
              <Textarea
                id="note"
                placeholder="Optional details for the artist"
                value={note}
                onChange={e => setNote(e.target.value)}
                rows={2}
                className="resize-none"
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-3 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 text-white font-semibold shadow-lg hover:from-purple-700 hover:to-pink-600 text-base py-2 rounded-lg transition"
              disabled={!clientName || !service || !date || !time}
            >
              Confirm Booking
            </Button>
          </form>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center p-8 min-h-[260px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <div className="mx-auto h-14 w-14 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <p className="text-lg font-medium mb-1 text-center">Booking request sent!</p>
            <p className="text-muted-foreground text-center">
              The artist will confirm shortly.
            </p>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookArtistModal;
