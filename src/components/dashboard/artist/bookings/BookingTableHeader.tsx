
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

const BookingTableHeader = () => {
  const { isVietnamese } = useTranslation();
  
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {isVietnamese ? "Khách hàng" : "Client"}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {isVietnamese ? "Dịch vụ" : "Service"}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {isVietnamese ? "Ngày" : "Date"}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {isVietnamese ? "Thời gian" : "Time"}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {isVietnamese ? "Trạng thái" : "Status"}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {isVietnamese ? "Hành động" : "Actions"}
        </th>
      </tr>
    </thead>
  );
};

export default BookingTableHeader;
