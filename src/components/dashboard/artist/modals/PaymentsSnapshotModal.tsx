
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { DollarSign, ArrowUpRight, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockTransactions = [
  {
    id: 1,
    client: "Emma Thompson",
    service: "Bridal Makeup",
    amount: 250,
    date: "2025-04-20",
    status: "completed"
  },
  {
    id: 2,
    client: "Sarah Williams",
    service: "Hair Styling",
    amount: 120,
    date: "2025-04-19",
    status: "completed"
  },
  {
    id: 3,
    client: "Jessica Brown",
    service: "Full Glam Makeup",
    amount: 180,
    date: "2025-04-18",
    status: "pending"
  },
  {
    id: 4,
    client: "Olivia Davis",
    service: "Wedding Hair & Makeup",
    amount: 300,
    date: "2025-04-17",
    status: "completed"
  },
  {
    id: 5,
    client: "Sophia Miller",
    service: "Special Occasion Makeup",
    amount: 150,
    date: "2025-04-16",
    status: "pending"
  }
];

interface PaymentsSnapshotModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" /> Completed
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-amber-100 text-amber-800 border-amber-200 flex items-center gap-1">
          <Clock className="h-3 w-3" /> Pending
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 border-gray-200">
          {status}
        </Badge>
      );
  }
};

const PaymentsSnapshotModal = ({ open, onOpenChange }: PaymentsSnapshotModalProps) => {
  const totalEarned = 2450;
  const pendingPayouts = 680;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">Earnings Overview</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 p-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-0 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Earned (April)</p>
                  <p className="text-2xl font-semibold">${totalEarned}</p>
                </div>
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs text-emerald-600 font-medium">
                <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                +12.5% from last month
              </div>
            </Card>
            <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-0 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Payouts</p>
                  <p className="text-2xl font-semibold">${pendingPayouts}</p>
                </div>
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs text-amber-600 font-medium">
                Expected in 2-3 business days
              </div>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {mockTransactions.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 rounded-lg border bg-white hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{transaction.client}</p>
                    <p className="text-sm text-gray-600">{transaction.service}</p>
                    <p className="text-xs text-gray-400">
                      {format(new Date(transaction.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-semibold">${transaction.amount}</p>
                    {getStatusBadge(transaction.status)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentsSnapshotModal;
