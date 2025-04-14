
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSalonPayroll } from "@/hooks/useSalonPayroll";
import { format } from "date-fns";
import { toast } from "sonner";
import { Loader2, Download, BadgeDollarSign, FileText, Calendar } from "lucide-react";

const PaycheckOverview: React.FC = () => {
  const { loading, error, summary, markAsPaid, generateCsv } = useSalonPayroll();
  const [markingPaid, setMarkingPaid] = useState<string | null>(null);
  
  const handleMarkPaid = async (artistId: string) => {
    setMarkingPaid(artistId);
    try {
      const success = await markAsPaid(artistId);
      if (success) {
        toast.success("Artist payment marked as paid");
      } else {
        toast.error("Failed to mark payment as paid");
      }
    } finally {
      setMarkingPaid(null);
    }
  };
  
  const handleExportCsv = () => {
    const csv = generateCsv();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `payroll-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Payroll report downloaded");
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const currentWeekRange = `${format(new Date(), 'MMM d')} - ${format(new Date(), 'MMM d, yyyy')}`;
  
  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <BadgeDollarSign className="mr-2 h-5 w-5 text-primary" />
            Paycheck Overview
          </CardTitle>
          <CardDescription>Loading payroll data...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <BadgeDollarSign className="mr-2 h-5 w-5 text-primary" />
            Paycheck Overview
          </CardTitle>
          <CardDescription>Error loading payroll data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl flex items-center">
              <BadgeDollarSign className="mr-2 h-5 w-5 text-primary" />
              Paycheck Overview
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Calendar className="mr-1 h-3.5 w-3.5" />
              Week of {currentWeekRange}
            </CardDescription>
          </div>
          <div>
            <Button variant="outline" size="sm" className="ml-2" onClick={handleExportCsv}>
              <Download className="mr-1 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" className="ml-2" onClick={handlePrint}>
              <FileText className="mr-1 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {summary.weeklyEarnings.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <BadgeDollarSign className="mx-auto h-12 w-12 mb-4 text-muted-foreground/30" />
            <p className="text-lg font-medium">No earnings data for this week</p>
            <p className="text-sm mt-2">
              Earning data will appear here when bookings are marked as completed
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Member</TableHead>
                  <TableHead className="text-right">Bookings</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Commission</TableHead>
                  <TableHead className="text-right">Earnings</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.weeklyEarnings.map((artist) => (
                  <TableRow key={artist.artistId}>
                    <TableCell className="font-medium">{artist.artistName}</TableCell>
                    <TableCell className="text-right">{artist.bookingCount}</TableCell>
                    <TableCell className="text-right">${artist.totalRevenue.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{artist.commissionRate}%</TableCell>
                    <TableCell className="text-right font-semibold">${artist.totalEarnings.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      {artist.isPaid ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Paid
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700">
                          Unpaid
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {!artist.isPaid && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkPaid(artist.artistId)}
                          disabled={markingPaid === artist.artistId}
                        >
                          {markingPaid === artist.artistId ? (
                            <>
                              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>Mark Paid</>
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between border-t p-4">
        <div>
          <p className="text-sm text-muted-foreground">Total Bookings: <span className="font-medium">{summary.totalBookings}</span></p>
          <p className="text-sm text-muted-foreground">Total Revenue: <span className="font-medium">${summary.totalRevenue.toFixed(2)}</span></p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold">Total Commission Payable:</p>
          <p className="text-2xl font-bold text-primary">${summary.totalOwed.toFixed(2)}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PaycheckOverview;
