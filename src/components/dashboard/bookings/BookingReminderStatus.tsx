
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format, parseISO } from "date-fns";
import { Bell } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface BookingReminderStatusProps {
  reminderSent: boolean;
  reminderSentAt?: string | null;
}

const BookingReminderStatus = ({ reminderSent, reminderSentAt }: BookingReminderStatusProps) => {
  const { t } = useTranslation();

  if (!reminderSent) {
    return (
      <Badge variant="outline" className="text-gray-500 border-gray-300">
        {t({
          english: "No reminder sent",
          vietnamese: "Chưa gửi nhắc nhở"
        })}
      </Badge>
    );
  }

  const formattedDate = reminderSentAt 
    ? format(parseISO(reminderSentAt), "MMM dd, yyyy HH:mm")
    : "";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-0 flex items-center gap-1">
            <Bell className="h-3 w-3" />
            {t({
              english: "Reminder sent",
              vietnamese: "Đã gửi nhắc nhở"
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
