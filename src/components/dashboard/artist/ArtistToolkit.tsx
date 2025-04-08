
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QrCode, Users, Calendar, Megaphone, Link } from "lucide-react";
import { useAuth } from "@/context/auth";

const ArtistToolkit = () => {
  const { user } = useAuth();
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  
  // Generate a unique profile link based on user ID
  const profileLink = user ? `https://emviapp.com/artist/${user.id.substring(0, 8)}` : undefined;
  
  // Tools array for easy mapping
  const tools = [
    {
      icon: <Users className="h-5 w-5 text-indigo-600" />,
      title: "Manage My Clients",
      description: "Track clients, notes, and preferences",
      action: () => window.location.href = "/clients"
    },
    {
      icon: <Megaphone className="h-5 w-5 text-purple-600" />,
      title: "Promote My Page",
      description: "Share on social media and grow",
      action: () => window.location.href = "/promote"
    },
    {
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
      title: "Track My Bookings",
      description: "View and manage appointments",
      action: () => window.location.href = "/bookings"
    },
    {
      icon: <QrCode className="h-5 w-5 text-emerald-600" />,
      title: "My QR Code",
      description: "Let clients scan to book",
      action: () => setQrDialogOpen(true)
    }
  ];
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="overflow-hidden border-gray-200">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 pb-3">
            <CardTitle className="text-lg font-semibold">
              Artist Toolkit
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                  className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={tool.action}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-2 bg-gray-50 rounded-full">
                      {tool.icon}
                    </div>
                    <h3 className="font-medium text-sm">{tool.title}</h3>
                    <p className="text-xs text-gray-500 leading-tight">{tool.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-emerald-600" />
              Your Profile QR Code
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              {/* This would be a real QR code in production */}
              <div className="w-[220px] h-[220px] bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQMAAACXljzdAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACDklEQVRYhe3YuXLcMAxAUVDyJHG6NepSekVXfsbqb2AvgOH8u0gVmSm2ISDw0JIS/f0O/gclncgY+O43GyG/pMbobJeVLm3i0NKruhbOLaJrmgU0Y1s7SvfKQo2Vt+JbiVNbazwYN+WtRSaVbedWWGZCOpeZ0GGpcmA41HLUOHAq5QGJ3s5iLX4qCRHaVazhSbr7tEfLt4YYndsY23GcVVGbHKJx1KSJYWWCGGlWyqxKFmk/3SOGlQlibOw8RpfgWNcnxl5FmA1+QSOsUhLjXi8LsQpJjMM+jcyKBDGutbII+/yIUeUQ39tUn0VYJc/4MWoZomtOjDaahHdqEoXg2DbpC0pXiW2OGHsPQxQiRPNGjFJeUTrmxJhHJcJ772WIsE1RLXoIojMh+skeUfyQIgYr08TYJfyIoirEeOxSULMaRYwx6R6l4zTEOOoQ70tRU7PNEWPv9SlH/ItURgx5nPF61T9RxR9RxKin/Ii6QlTPqBLj7KCo7JUixtiH/Ii6QhCj7VIQb+KhILZFiJHLG6pnZWrEMBF/xOFYRRgx+KXJy1XXiGvECIsGMarjjHc2Oj3Egfgj+ipRrw3jvYPSRFR/RPm7RGnZqvxdIiOGZLSrkB+xTwmOSicR44y8NdwvlRai+yP6KvG48OEXkRKi+CPaKpEfWVeIIkeWVWLt0h95xO6PcMSw5o/QH/wM/gOfKYNz3+qPyQAAAABJRU5ErkJggg==')] bg-contain"></div>
            </div>
            {profileLink && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 mb-2">Your profile link:</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-mono bg-gray-100 p-2 rounded">{profileLink}</span>
                  <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(profileLink)}>
                    <Link className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-4 text-center max-w-xs">
              Print this QR code or share it with clients for easy booking and profile access
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArtistToolkit;
