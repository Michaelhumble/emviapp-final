import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency, type ValuationBreakdown } from '@/lib/valuation';

interface ValuationChartProps {
  breakdown: ValuationBreakdown;
}

export const ValuationChart: React.FC<ValuationChartProps> = ({ breakdown }) => {
  // Build chart data from the new SDE-based breakdown
  const data = [
    { name: 'Annual SDE', value: breakdown.annualSDE, color: '#8B5CF6' },
  ];

  // Add assets if present
  if (breakdown.assetsAdded > 0) {
    data.push({ name: 'Physical Assets', value: breakdown.assetsAdded, color: '#EC4899' });
  }

  // Calculate adjustment dollar values based on SDE and multiple changes
  const sdeBase = breakdown.annualSDE;
  
  if (breakdown.locationAdjustment > 0) {
    const locationValue = Math.round(sdeBase * breakdown.locationAdjustment);
    if (locationValue > 0) {
      data.push({ name: 'Location Premium', value: locationValue, color: '#10B981' });
    }
  }

  if (breakdown.ratingAdjustment > 0) {
    const ratingValue = Math.round(sdeBase * breakdown.ratingAdjustment);
    if (ratingValue > 0) {
      data.push({ name: 'Reputation Boost', value: ratingValue, color: '#F59E0B' });
    }
  }

  if (breakdown.loyaltyAdjustment > 0) {
    const loyaltyValue = Math.round(sdeBase * breakdown.loyaltyAdjustment);
    if (loyaltyValue > 0) {
      data.push({ name: 'Loyal Clients', value: loyaltyValue, color: '#06B6D4' });
    }
  }

  if (breakdown.yearsAdjustment > 0) {
    const yearsValue = Math.round(sdeBase * breakdown.yearsAdjustment);
    if (yearsValue > 0) {
      data.push({ name: 'Business Maturity', value: yearsValue, color: '#8B5CF6' });
    }
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
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Multiple summary */}
      <div className="mt-4 p-3 bg-purple-50 rounded-lg text-center">
        <div className="text-sm text-muted-foreground">Final Multiple</div>
        <div className="text-2xl font-bold text-purple-600">{breakdown.finalMultiple}×</div>
        <div className="text-xs text-muted-foreground mt-1">
          {breakdown.locationAreaName} (Tier {breakdown.locationTier})
        </div>
      </div>
    </div>
  );
};
