
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

const BookingTableHeader = () => {
  const { t } = useTranslation();
  
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t({ english: "Client", vietnamese: "Khách hàng" })}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t({ english: "Service", vietnamese: "Dịch vụ" })}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t({ english: "Date", vietnamese: "Ngày" })}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t({ english: "Time", vietnamese: "Thời gian" })}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t({ english: "Status", vietnamese: "Trạng thái" })}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t({ english: "Actions", vietnamese: "Hành động" })}
        </th>
      </tr>
    </thead>
  );
};

export default BookingTableHeader;
