
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const InquiriesCard = () => (
  <Card className="rounded-2xl bg-gradient-to-br from-orange-50 to-pink-50 border-0 shadow-md">
    <CardHeader className="flex flex-row items-center gap-2 pb-2">
      <MessageSquare className="h-6 w-6 text-amber-500" />
      <CardTitle className="text-base font-playfair">Inquiries</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center text-gray-400 py-6">
        Inquiries from salons or artists will show here.<br />
        <span className="text-xs text-gray-300">Feature coming soon!</span>
      </div>
    </CardContent>
  </Card>
);

export default InquiriesCard;
