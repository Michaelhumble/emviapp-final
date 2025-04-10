
import React from "react";
import { Badge } from "@/components/ui/badge";

interface BookingStatusBadgeProps {
  status: string;
}

const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
    case "accepted":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Accepted</Badge>;
    case "completed":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
    case "cancelled":
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Cancelled</Badge>;
    case "declined":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Declined</Badge>;
    default:
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">{status}</Badge>;
  }
};

export default BookingStatusBadge;
