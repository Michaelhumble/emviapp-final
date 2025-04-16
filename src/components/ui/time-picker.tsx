
import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TimePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  label,
  className,
  disabled = false,
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 15, 30, 45];

  const selectedHour = value ? value.getHours() : 9;
  const selectedMinute = value ? Math.floor(value.getMinutes() / 15) * 15 : 0;

  const handleHourChange = (hour: string) => {
    const newDate = new Date(value || new Date());
    newDate.setHours(parseInt(hour, 10));
    onChange(newDate);
  };

  const handleMinuteChange = (minute: string) => {
    const newDate = new Date(value || new Date());
    newDate.setMinutes(parseInt(minute, 10));
    onChange(newDate);
  };

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:00 ${period}`;
  };

  return (
    <div className={className}>
      {label && <Label className="mb-2 block">{label}</Label>}
      <div className="flex gap-2">
        <Select
          disabled={disabled}
          value={selectedHour.toString()}
          onValueChange={handleHourChange}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent>
            {hours.map((hour) => (
              <SelectItem key={hour} value={hour.toString()}>
                {formatHour(hour)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          disabled={disabled}
          value={selectedMinute.toString()}
          onValueChange={handleMinuteChange}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Minute" />
          </SelectTrigger>
          <SelectContent>
            {minutes.map((minute) => (
              <SelectItem key={minute} value={minute.toString()}>
                :{minute.toString().padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
