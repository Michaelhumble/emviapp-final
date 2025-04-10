
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useBookings } from "../bookings/hooks/useBookings";
import { format } from "date-fns";

const MonthlyReportDownload: React.FC = () => {
  const { bookings } = useBookings();
  const [selectedMonth, setSelectedMonth] = useState<string>(format(new Date(), "yyyy-MM"));
  const [generating, setGenerating] = useState(false);
  
  // Generate past 12 months for the dropdown
  const getMonthOptions = () => {
    const options = [];
    const today = new Date();
    
    for (let i = 0; i < 12; i++) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const value = format(d, "yyyy-MM");
      const label = format(d, "MMMM yyyy");
      options.push({ value, label });
    }
    
    return options;
  };
  
  const handleGenerateReport = async () => {
    setGenerating(true);
    
    try {
      // Filter bookings for the selected month
      const [year, month] = selectedMonth.split('-').map(Number);
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0); // Last day of month
      
      const monthlyBookings = bookings.filter(booking => {
        if (!booking.date) return false;
        const bookingDate = new Date(booking.date);
        return bookingDate >= startDate && bookingDate <= endDate;
      });
      
      // Generate CSV content
      let csvContent = "Date,Client,Service,Price,Status\r\n";
      
      monthlyBookings.forEach(booking => {
        const date = booking.date ? format(new Date(booking.date), "yyyy-MM-dd") : "N/A";
        const row = [
          date,
          booking.clientName,
          booking.serviceName,
          booking.servicePrice,
          booking.status
        ].join(",");
        
        csvContent += row + "\r\n";
      });
      
      // Create downloadable blob
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      
      // Create download link and trigger click
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `salon-bookings-${selectedMonth}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Monthly report downloaded");
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Failed to generate report. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Card className="border-indigo-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <FileText className="h-5 w-5 text-indigo-500 mr-2" />
          Monthly Report
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1 space-y-2">
            <label htmlFor="month-select" className="text-sm font-medium">
              Select Month
            </label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger id="month-select" className="w-full">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {getMonthOptions().map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleGenerateReport} 
            disabled={generating}
            className="w-full md:w-auto"
          >
            {generating ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </>
            )}
          </Button>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>The report will include all bookings, revenue, and service statistics for the selected month.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyReportDownload;
