
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format, parseISO } from "date-fns";
import { Bell } from "lucide-react";
import { useTranslation, Translation } from "@/hooks/useTranslation";

interface BookingReminderStatusProps {
  reminderSent: boolean;
  reminderSentAt?: string | null;
}

const BookingReminderStatus = ({ reminderSent, reminderSentAt }: BookingReminderStatusProps) => {
  const { t } = useTranslation();

  if (!reminderSent) {
    return (
      <Badge variant="outline" className="text-gray-500 border-gray-300 text-xs px-1.5 py-0">
        {t({
          english: "No reminder",
          vietnamese: "Chưa gửi"
        })}
      </Badge>
    );
  }

  const formattedDate = reminderSentAt 
    ? format(parseISO(reminderSentAt), "MMM dd, HH:mm")
    : "";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-0 flex items-center gap-1 text-xs px-1.5 py-0">
            <Bell className="h-2.5 w-2.5" />
            {t({
              english: "Reminded",
              vietnamese: "Đã gửi"
            })}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          {reminderSentAt ? (
            <p>
              {t({
                english: `Sent on ${formattedDate}`,
                vietnamese: `Đã gửi vào ${formattedDate}`
              })}
            </p>
          ) : (
            <p>
              {t({
                english: "Reminder has been sent",
                vietnamese: "Đã gửi nhắc nhở"
              })}
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BookingReminderStatus;
