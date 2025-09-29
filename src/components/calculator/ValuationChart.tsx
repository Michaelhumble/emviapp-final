import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { ValuationResult } from '@/lib/valuation';

interface ValuationChartProps {
  breakdown: ValuationResult['breakdown'];
}

export const ValuationChart: React.FC<ValuationChartProps> = ({ breakdown }) => {
  const data = [
    { name: 'Revenue Multiple', value: breakdown.revenueMultiple, color: '#8B5CF6' },
    { name: 'Station Value', value: breakdown.stationValue, color: '#EC4899' },
  ];

  if (breakdown.locationAdjustment > 0) {
    data.push({ name: 'Location Premium', value: breakdown.locationAdjustment, color: '#10B981' });
  }

  if (breakdown.reviewsAdjustment > 0) {
    data.push({ name: 'Reputation Boost', value: breakdown.reviewsAdjustment, color: '#F59E0B' });
  }

  if (breakdown.leaseAdjustment < 0) {
    data.push({ name: 'Lease Adjustment', value: Math.abs(breakdown.leaseAdjustment), color: '#EF4444' });
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-purple-100 shadow-sm">
      <h4 className="text-xl font-bold mb-4 text-center">Valuation Breakdown</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
