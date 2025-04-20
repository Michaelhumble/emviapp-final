import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CalendarClock, RefreshCcw, UserCheck, CheckCircle, XCircle, AlertCircle, Calendar, PlusCircle
} from "lucide-react";
import { useSalonBookingsFixed } from "./hooks/useSalonBookingsFixed";
import { format } from "date-fns";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SalonBooking } from "../types";
import { 
  Popover, PopoverContent, PopoverTrigger 
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/hooks/useTranslation";
import { createTranslation } from "../SalonTranslationHelper";
import { useSalonRolePermissions } from "@/hooks/useSalonRolePermissions";
import { ManualBookingModal } from "./ManualBookingModal";

const SalonBookingsOverview = () => {
  const { t } = useTranslation();
  const {
    bookings,
    loading,
    loadingTimedOut,
    artists,
    fetchBookings,
    updateBookingStatus,
    assignArtistToBooking
  } = useSalonBookingsFixed();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [artistFilter, setArtistFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showManualBookingModal, setShowManualBookingModal] = useState(false);
  const { userRole } = useSalonRolePermissions();

  // Handle manual refresh with loading indicator
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchBookings()
      .finally(() => {
        setTimeout(() => setIsRefreshing(false),
        1000); // Ensure we see the loading state for a moment
      });
  };

  const filteredBookings = bookings.filter(booking => {
    // Filter by status
    if (statusFilter !== "all" && booking.status !== statusFilter) {
      return false;
    }
    
    // Filter by artist
    if (artistFilter !== "all" && booking.assigned_staff_id !== artistFilter) {
      return false;
    }
    
    // Filter by date
    if (dateFilter !== "all") {
      if (!booking.date) return false;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dateFilter === "today") {
        const bookingDate = new Date(booking.date);
        bookingDate.setHours(0, 0, 0, 0);
        if (bookingDate.getTime() !== today.getTime()) return false;
      } else if (dateFilter === "upcoming") {
        const bookingDate = new Date(booking.date);
        bookingDate.setHours(0, 0, 0, 0);
        if (bookingDate.getTime() <= today.getTime()) return false;
      } else if (dateFilter === "past") {
        const bookingDate = new Date(booking.date);
        bookingDate.setHours(0, 0, 0, 0);
        if (bookingDate.getTime() >= today.getTime()) return false;
      }
    }
    
    return true;
  });

  const getInitials = (name: string): string => {
    if (!name) return "?";
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return t(createTranslation("Not scheduled", "Chưa lên lịch"));
    return format(date, "MMM d, yyyy");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">{t(createTranslation("Pending", "Đang chờ"))}</Badge>;
      case "accepted":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{t(createTranslation("Accepted", "Đã chấp nhận"))}</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{t(createTranslation("Completed", "Hoàn thành"))}</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="text-gray-500">{t(createTranslation("Cancelled", "Đã hủy"))}</Badge>;
      case "declined":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{t(createTranslation("Declined", "Từ chối"))}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "accepted":
        return <UserCheck className="h-4 w-4 text-blue-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
      case "declined":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const canCreateManualBooking = ['owner', 'manager'].includes(userRole || '');

  return (
    <Card className="border-purple-100">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-serif text-purple-900 flex items-center">
            <CalendarClock className="mr-2 h-5 w-5 text-purple-700" />
            {t(createTranslation("Bookings Overview", "Tổng quan đặt lịch"))}
          </CardTitle>
          <CardDescription>
            {t(createTranslation("View and manage all client bookings", "Xem và quản lý tất cả các lịch hẹn của khách"))}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          {canCreateManualBooking && (
            <Button 
              onClick={() => setShowManualBookingModal(true)}
              variant="outline"
              size="sm"
              className="text-purple-600"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              {t(createTranslation("Manual Booking", "Đặt lịch thủ công"))}
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm"
            className="text-purple-600"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing 
              ? t(createTranslation("Refreshing...", "Đang làm mới...")) 
              : t(createTranslation("Refresh", "Làm mới"))}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder={t(createTranslation("Filter by status", "Lọc theo trạng thái"))} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t(createTranslation("All Statuses", "Tất cả trạng thái"))}</SelectItem>
                  <SelectItem value="pending">{t(createTranslation("Pending", "Đang chờ"))}</SelectItem>
                  <SelectItem value="accepted">{t(createTranslation("Accepted", "Đã chấp nhận"))}</SelectItem>
                  <SelectItem value="completed">{t(createTranslation("Completed", "Hoàn thành"))}</SelectItem>
                  <SelectItem value="cancelled">{t(createTranslation("Cancelled", "Đã hủy"))}</SelectItem>
                  <SelectItem value="declined">{t(createTranslation("Declined", "Từ chối"))}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-auto">
              <Select value={artistFilter} onValueChange={setArtistFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder={t(createTranslation("Filter by artist", "Lọc theo nghệ sĩ"))} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t(createTranslation("All Artists", "Tất cả nghệ sĩ"))}</SelectItem>
                  {artists.map(artist => (
                    <SelectItem key={artist.id} value={artist.id}>
                      {artist.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-auto">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder={t(createTranslation("Filter by date", "Lọc theo ngày"))} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t(createTranslation("All Dates", "Tất cả ngày"))}</SelectItem>
                  <SelectItem value="today">{t(createTranslation("Today", "Hôm nay"))}</SelectItem>
                  <SelectItem value="upcoming">{t(createTranslation("Upcoming", "Sắp tới"))}</SelectItem>
                  <SelectItem value="past">{t(createTranslation("Past", "Đã qua"))}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 flex items-center">
            {filteredBookings.length} {filteredBookings.length === 1 
              ? t(createTranslation('booking', 'lịch hẹn')) 
              : t(createTranslation('bookings', 'lịch hẹn'))} {t(createTranslation('found', 'được tìm thấy'))}
          </div>
        </div>
        
        {loading && !loadingTimedOut ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
          </div>
        ) : loadingTimedOut ? (
          <div className="text-center py-10 border rounded-md bg-gray-50">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">
              {t(createTranslation("Loading bookings is taking longer than expected.", "Việc tải đặt chỗ đang mất nhiều thời gian hơn dự kiến."))}
            </p>
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              className="mt-2"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              {t(createTranslation("Try Again", "Thử lại"))}
            </Button>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-10 border rounded-md bg-gray-50">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">
              {statusFilter !== "all" || artistFilter !== "all" || dateFilter !== "all" 
                ? t(createTranslation("No bookings match your filters", "Không có lịch hẹn nào phù hợp với bộ lọc của bạn")) 
                : t(createTranslation("No bookings found", "Không tìm thấy lịch hẹn nào"))}
            </p>
            {(statusFilter !== "all" || artistFilter !== "all" || dateFilter !== "all") && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setStatusFilter("all");
                  setArtistFilter("all");
                  setDateFilter("all");
                }}
                className="mt-2"
              >
                {t(createTranslation("Clear Filters", "Xóa bộ lọc"))}
              </Button>
            )}
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-medium">{t(createTranslation("Client", "Khách hàng"))}</TableHead>
                  <TableHead className="font-medium">{t(createTranslation("Service", "Dịch vụ"))}</TableHead>
                  <TableHead className="font-medium">{t(createTranslation("Date/Time", "Ngày/Giờ"))}</TableHead>
                  <TableHead className="font-medium">{t(createTranslation("Artist", "Nghệ sĩ"))}</TableHead>
                  <TableHead className="font-medium">{t(createTranslation("Status", "Trạng thái"))}</TableHead>
                  <TableHead className="font-medium text-right">{t(createTranslation("Actions", "Hành động"))}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-purple-100 text-purple-800">
                            {getInitials(booking.client_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{booking.client_name}</div>
                          <div className="text-xs text-gray-500">
                            {booking.client_email || booking.client_phone || t(createTranslation("No contact info", "Không có thông tin liên hệ"))}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{booking.service_name}</div>
                      <div className="text-xs text-gray-500">
                        ${booking.service_price.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>{formatDate(booking.date)}</div>
                      <div className="text-xs text-gray-500">{booking.time || t(createTranslation("No time set", "Chưa đặt giờ"))}</div>
                    </TableCell>
                    <TableCell>
                      {booking.assigned_staff_name ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="bg-blue-100 text-blue-800 text-xs">
                              {getInitials(booking.assigned_staff_name)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{booking.assigned_staff_name}</span>
                        </div>
                      ) : (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm">{t(createTranslation("Assign Artist", "Phân công nghệ sĩ"))}</Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-52 p-0">
                            <div className="p-2 border-b">
                              <p className="text-sm font-medium">{t(createTranslation("Select Artist", "Chọn nghệ sĩ"))}</p>
                            </div>
                            <div className="max-h-60 overflow-auto">
                              {artists.map(artist => (
                                <Button
                                  key={artist.id}
                                  variant="ghost"
                                  className="w-full justify-start px-2"
                                  onClick={() => assignArtistToBooking(booking.id, artist.id, artist.name)}
                                >
                                  <Avatar className="h-7 w-7 mr-2">
                                    <AvatarFallback className="bg-blue-100 text-blue-800 text-xs">
                                      {getInitials(artist.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  {artist.name}
                                </Button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {getStatusIcon(booking.status)}
                        {getStatusBadge(booking.status)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            {t(createTranslation("Actions", "Hành động"))}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {booking.status === "pending" && (
                            <>
                              <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, "accepted")}>
                                <UserCheck className="h-4 w-4 mr-2 text-blue-500" />
                                {t(createTranslation("Accept Booking", "Chấp nhận lịch hẹn"))}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, "declined")}>
                                <XCircle className="h-4 w-4 mr-2 text-red-500" />
                                {t(createTranslation("Decline Booking", "Từ chối lịch hẹn"))}
                              </DropdownMenuItem>
                            </>
                          )}
                          {booking.status === "accepted" && (
                            <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, "completed")}>
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              {t(createTranslation("Mark as Completed", "Đánh dấu là hoàn thành"))}
                            </DropdownMenuItem>
                          )}
                          {booking.status !== "completed" && booking.status !== "cancelled" && booking.status !== "declined" && (
                            <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, "cancelled")}>
                              <XCircle className="h-4 w-4 mr-2 text-red-500" />
                              {t(createTranslation("Cancel Booking", "Hủy lịch hẹn"))}
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <ManualBookingModal 
        isOpen={showManualBookingModal}
        onClose={() => setShowManualBookingModal(false)}
        services={artists.map(artist => ({ id: artist.id, title: artist.name }))}
        teamMembers={artists}
        onBookingCreated={fetchBookings}
      />
    </Card>
  );
};

export default SalonBookingsOverview;
