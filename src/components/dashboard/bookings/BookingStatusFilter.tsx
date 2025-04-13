
import { Button } from '@/components/ui/button';
import { BookingStatus } from '@/hooks/useBookingFilters';

type StatusOption = {
  value: BookingStatus;
  label: string;
};

const statusOptions: StatusOption[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'declined', label: 'Declined' },
];

interface BookingStatusFilterProps {
  value: BookingStatus;
  onChange: (value: BookingStatus) => void;
}

const BookingStatusFilter = ({ value, onChange }: BookingStatusFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {statusOptions.map((option) => (
        <Button
          key={option.value}
          variant={value === option.value ? 'default' : 'outline'}
          size="sm"
          className={value === option.value ? 'bg-primary' : ''}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default BookingStatusFilter;
