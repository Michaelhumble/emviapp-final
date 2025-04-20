
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/hooks/useTranslation";
import { createTranslation } from "../../SalonTranslationHelper";
import { format } from "date-fns";

interface ManualBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Array<{ id: string; title: string }>;
  teamMembers: Array<{ id: string; full_name: string }>;
  onBookingCreated: () => void;
}

const formSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  service_id: z.string().min(1, "Please select a service"),
  artist_id: z.string().min(1, "Please select an artist"),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().optional(),
});

export function ManualBookingModal({ 
  isOpen, 
  onClose,
  services,
  teamMembers,
  onBookingCreated 
}: ManualBookingModalProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      service_id: "",
      artist_id: "",
      notes: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Insert new booking
      const { data: booking, error } = await supabase
        .from('bookings')
        .insert({
          recipient_id: values.artist_id,
          service_id: values.service_id,
          date_requested: format(values.date, 'yyyy-MM-dd'),
          time_requested: values.time,
          note: values.notes || null,
          metadata: {
            source: 'manual',
            customer_name: values.full_name,
            customer_phone: values.phone || null,
          },
          status: 'accepted'
        })
        .select()
        .single();

      if (error) throw error;

      toast.success(t(createTranslation("Booking created successfully", "Đặt lịch thành công")));
      onBookingCreated();
      onClose();
      form.reset();
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error(t(createTranslation("Failed to create booking", "Không thể tạo lịch hẹn")));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {t(createTranslation("Create Manual Booking", "Tạo lịch hẹn thủ công"))}
          </DialogTitle>
          <DialogDescription>
            {t(createTranslation(
              "Create a new booking manually for walk-in clients",
              "Tạo lịch hẹn mới cho khách trực tiếp"
            ))}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t(createTranslation("Full Name", "Họ và tên"))}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t(createTranslation("Phone Number (optional)", "Số điện thoại (tùy chọn)"))}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(createTranslation("Service", "Dịch vụ"))}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t(createTranslation("Select a service", "Chọn dịch vụ"))} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.title}
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
              name="artist_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(createTranslation("Assigned Artist", "Nghệ sĩ phụ trách"))}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t(createTranslation("Select an artist", "Chọn nghệ sĩ"))} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.full_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t(createTranslation("Date", "Ngày"))}</FormLabel>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border pointer-events-auto"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t(createTranslation("Time", "Giờ"))}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t(createTranslation("Select a time", "Chọn giờ"))} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, i) => {
                          const hour = i.toString().padStart(2, '0');
                          return (
                            <SelectItem key={hour} value={`${hour}:00`}>
                              {`${hour}:00`}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t(createTranslation("Notes (optional)", "Ghi chú (tùy chọn)"))}
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                variant="outline"
                onClick={onClose}
                type="button"
              >
                {t(createTranslation("Cancel", "Hủy"))}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 
                  t(createTranslation("Creating...", "Đang tạo...")) : 
                  t(createTranslation("Create Booking", "Tạo lịch hẹn"))}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
