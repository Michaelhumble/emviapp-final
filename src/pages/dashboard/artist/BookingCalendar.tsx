
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BookingCalendar = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <Card className="w-full max-w-xl mx-auto shadow-lg rounded-2xl bg-gradient-to-br from-purple-50 via-white to-pink-50 border border-purple-100">
          <CardContent className="flex flex-col items-center justify-center p-12">
            <Calendar className="h-12 w-12 text-emvi-accent mb-6" />
            <h1 className="font-playfair text-3xl font-bold text-emvi-dark mb-2 text-center">
              Booking Calendar Coming Soon
            </h1>
            <p className="text-gray-500 mb-6 text-lg text-center max-w-md">
              This is where you'll manage all client bookings, track your schedule, and coordinate your appointments in one luxury view.
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)} 
              className="text-emvi-accent font-medium"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BookingCalendar;
