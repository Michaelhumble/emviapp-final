import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';

const ArtistMobileBookingButton = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  if (!isMobile) return null;

  return (
    <>
      {/* Sticky Floating Button */}
      <motion.div
        className="fixed bottom-20 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 border-0"
          size="icon"
        >
          <Calendar className="h-6 w-6 text-white" />
        </Button>
      </motion.div>

      {/* Booking Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[95vw] max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Quick Actions
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-purple-900">New Booking</h3>
                    <p className="text-sm text-purple-700">Create a manual booking</p>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-purple-500 hover:bg-purple-600"
                    onClick={() => {
                      setIsOpen(false);
                      // Navigate to bookings tab or open booking modal
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-900">Set Availability</h3>
                    <p className="text-sm text-blue-700">Update your schedule</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-blue-500 text-blue-600 hover:bg-blue-50"
                    onClick={() => {
                      setIsOpen(false);
                      // Navigate to availability settings
                    }}
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArtistMobileBookingButton;