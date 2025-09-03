import React, { useMemo } from 'react';

interface MiniChartProps {
  data: {
    monthlyEarnings: number;
    yearlyEarnings: number;
    clicks: number;
    conversions: number;
  };
  className?: string;
}

// Lightweight SVG sparkline chart - no external dependencies
const MiniChart: React.FC<MiniChartProps> = ({ data, className = "w-full h-16" }) => {
  // Generate sample data points based on current earnings
  const chartData = useMemo(() => {
    const { monthlyEarnings } = data;
    const baseValue = Math.max(monthlyEarnings, 10);
    
    // Generate 12 months of sample progression data
    return Array.from({ length: 12 }, (_, i) => {
      const growth = 1 + (i * 0.1); // Simulate 10% monthly growth
      const variance = 0.8 + (Math.random() * 0.4); // Add some realistic variance
      return Math.round(baseValue * growth * variance);
    });
  }, [data.monthlyEarnings]);

  const maxValue = Math.max(...chartData);
  const minValue = Math.min(...chartData);
  const range = maxValue - minValue || 1;

  // Convert data to SVG coordinates
  const points = chartData.map((value, index) => {
    const x = (index / (chartData.length - 1)) * 100;
    const y = 100 - ((value - minValue) / range) * 80; // Use 80% of height for padding
    return `${x},${y}`;
  }).join(' ');

  // Create area path for filled chart
  const areaPath = `M 0,100 L ${points} L 100,100 Z`;
  const linePath = `M ${points}`;

  return (
    <div className={`${className} relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 p-2`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        preserveAspectRatio="none"
        aria-label="Earnings trend chart showing growth over 12 months"
        role="img"
      >
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05"/>
          </linearGradient>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="1"/>
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        <g stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3">
          <line x1="0" y1="25" x2="100" y2="25" />
          <line x1="0" y1="50" x2="100" y2="50" />
          <line x1="0" y1="75" x2="100" y2="75" />
        </g>
        
        {/* Area fill */}
        <path
          d={areaPath}
          fill="url(#chartGradient)"
          className="animate-fade-in"
        />
        
        {/* Main line */}
        <polyline
          points={points}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-fade-in"
          style={{
            strokeDasharray: '200',
            strokeDashoffset: '200',
            animation: 'drawLine 1.5s ease-out forwards'
          }}
        />
        
        {/* Data points */}
        {chartData.map((value, index) => {
          const x = (index / (chartData.length - 1)) * 100;
          const y = 100 - ((value - minValue) / range) * 80;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="1.5"
              fill="hsl(var(--primary))"
              className="opacity-0"
              style={{
                animation: `fadeInPoint 0.3s ease-out ${0.1 + index * 0.05}s forwards`
              }}
            />
          );
        })}
      </svg>
      
      {/* Chart labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-2 pb-1">
        <span>Jan</span>
        <span>Jun</span>
        <span>Dec</span>
      </div>
      
      {/* Current value indicator */}
      <div className="absolute top-2 right-2 text-xs font-medium text-primary">
        ${data.monthlyEarnings.toFixed(0)}
      </div>
    </div>
  );
};

export default MiniChart;