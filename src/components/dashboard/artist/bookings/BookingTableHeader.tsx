
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

const BookingTableHeader = () => {
  const { t } = useTranslation();
  
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t("Client")}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t("Service")}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t("Date")}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t("Time")}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t("Status")}
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          {t("Actions")}
        </th>
      </tr>
    </thead>
  );
};

export default BookingTableHeader;
