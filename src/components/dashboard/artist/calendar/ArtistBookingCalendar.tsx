import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarDays, List, Plus, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { WeeklyCalendar } from "./WeeklyCalendar";
import MonthlyCalendarView from "./MonthlyCalendarView";
import BookingList from "./BookingList";
import BookingModal from "./BookingModal";
import { useArtistCalendar } from "@/hooks/useArtistCalendar";

const ArtistBookingCalendar = () => {
  const [calendarView, setCalendarView] = useState<'week' | 'month'>('week');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { currentDate } = useArtistCalendar();
  
  const handleCopyBookingLink = () => {
    navigator.clipboard.writeText('https://emvi.app/book/michael-artist');
    toast.success('Booking link copied to clipboard!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-7xl"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-gray-800">Booking Calendar</h1>
          <p className="text-gray-600 mt-1">Manage your appointments and schedule</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={() => setShowBookingModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md hover:shadow-lg transition-shadow"
          >
            <Plus className="mr-1 h-4 w-4" /> New Appointment
          </Button>
          
          <Button
            variant="outline"
            onClick={handleCopyBookingLink}
            className="border-purple-200 hover:border-purple-300"
          >
            <Share2 className="mr-1 h-4 w-4" /> Copy Booking Link
          </Button>
        </div>
      </div>

      <Card className="mb-8 bg-white/90 backdrop-blur-sm border-0 shadow-md rounded-xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex justify-between items-center">
            <Tabs 
              value={calendarView} 
              onValueChange={(v) => setCalendarView(v as 'week' | 'month')}
              className="w-[300px]"
            >
              <TabsList className="bg-white/50 backdrop-blur-sm">
                <TabsTrigger value="week" className="flex items-center">
                  <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                  Weekly
                </TabsTrigger>
                <TabsTrigger value="month" className="flex items-center">
                  <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center">
                  <List className="h-3.5 w-3.5 mr-1.5" />
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="text-sm text-gray-500 hidden md:block">
              {calendarView === 'week' 
                ? 'View and manage your week at a glance' 
                : calendarView === 'month'
                ? 'See your entire month\'s schedule'
                : 'List view of all appointments'}
            </div>
          </div>
        </div>
        
        <div>
          <TabsContent value="week" className="m-0 focus:outline-none">
            <WeeklyCalendar />
          </TabsContent>
          
          <TabsContent value="month" className="m-0 focus:outline-none">
            <MonthlyCalendarView />
          </TabsContent>
          
          <TabsContent value="list" className="m-0 focus:outline-none">
            <div className="p-6">
              <BookingList />
            </div>
          </TabsContent>
        </div>
      </Card>

      <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4 border border-purple-100 flex items-center justify-between mb-8">
        <div className="flex-grow">
          <h3 className="font-medium text-gray-800">Automated Client Reminders</h3>
          <p className="text-sm text-gray-600">Clients will receive automatic reminders 24h before appointments.</p>
        </div>
        <Button variant="outline" className="border-purple-200 text-purple-700">
          Configure
        </Button>
      </div>
      
      <BookingModal 
        open={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
      />
    </motion.div>
  );
};

export default ArtistBookingCalendar;
