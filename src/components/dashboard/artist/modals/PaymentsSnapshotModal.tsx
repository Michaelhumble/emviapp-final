
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
  }
];

interface PaymentsSnapshotModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentsSnapshotModal = ({ open, onOpenChange }: PaymentsSnapshotModalProps) => {
  const totalEarned = 2450;
  const pendingPayouts = 680;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white/90 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">Earnings Overview</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 p-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-0">
              <p className="text-sm text-gray-600">Total Earned (April)</p>
              <p className="text-2xl font-semibold">${totalEarned}</p>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-0">
              <p className="text-sm text-gray-600">Pending Payouts</p>
              <p className="text-2xl font-semibold">${pendingPayouts}</p>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {mockTransactions.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 rounded-lg border bg-white"
                >
                  <div>
                    <p className="font-medium">{transaction.client}</p>
                    <p className="text-sm text-gray-600">{transaction.service}</p>
                    <p className="text-xs text-gray-400">
                      {format(new Date(transaction.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${transaction.amount}</p>
                    <p className={`text-xs ${
                      transaction.status === 'completed' 
                        ? 'text-green-600' 
                        : 'text-amber-600'
                    }`}>
                      {transaction.status}
                    </p>
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
