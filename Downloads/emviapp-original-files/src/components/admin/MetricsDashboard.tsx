
import React from 'react';
import { User, SupportQuestion } from '../../types/admin';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUp, ArrowDown, Minus, Users, MessageSquare, Calendar, TrendingUp } from 'lucide-react';
import type { MetricCard as MetricCardType } from '../../types/admin';

interface MetricsDashboardProps {
  users: User[];
  supportQuestions: SupportQuestion[];
}

// Helper to get the past N days as an array of date strings
const getPastDays = (days: number): string[] => {
  const result: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    result.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  return result;
};

// Simulated data generator
const generateTimeSeriesData = (days: number, trend: 'up' | 'down' | 'stable', baseValue: number, variance: number) => {
  const dateLabels = getPastDays(days);
  let currentValue = baseValue;
  
  return dateLabels.map(date => {
    // Apply trend direction
    const trendFactor = trend === 'up' ? 1.1 : trend === 'down' ? 0.9 : 1;
    
    // Random variance
    const randomVariance = (Math.random() - 0.5) * variance;
    
    // Calculate new value
    currentValue = Math.max(0, Math.round(currentValue * trendFactor + randomVariance));
    
    return {
      date,
      value: currentValue
    };
  });
};

const calculatePercentChange = (data: { date: string, value: number }[]): number => {
  if (data.length < 2) return 0;
  const oldValue = data[0].value;
  const newValue = data[data.length - 1].value;
  
  if (oldValue === 0) return newValue > 0 ? 100 : 0;
  return Math.round(((newValue - oldValue) / oldValue) * 100);
};

const getTrendIcon = (percentChange: number) => {
  if (percentChange > 0) return <ArrowUp className="text-emerald-400" size={20} />;
  if (percentChange < 0) return <ArrowDown className="text-rose-400" size={20} />;
  return <Minus className="text-gray-400" size={20} />;
};

const MetricCard: React.FC<MetricCardType> = ({ title, value, change, icon }) => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/5 p-6 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-semibold text-white mt-1">{value.toLocaleString()}</h3>
        </div>
        <div className="bg-gray-700/50 p-3 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="flex items-center">
        {getTrendIcon(change)}
        <span className={`text-sm ml-1 ${
          change > 0 ? 'text-emerald-400' : 
          change < 0 ? 'text-rose-400' : 'text-gray-400'
        }`}>
          {Math.abs(change)}% {change >= 0 ? 'increase' : 'decrease'}
        </span>
      </div>
    </div>
  );
};

const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ users, supportQuestions }) => {
  // Generate simulated data for the charts
  const userSignupsData = generateTimeSeriesData(30, 'up', 5, 3);
  const supportTicketsData = generateTimeSeriesData(30, 'stable', 3, 2);
  const bookingRequestsData = generateTimeSeriesData(30, 'up', 8, 5);
  
  // Calculate percent changes for metric cards
  const userSignupsChange = calculatePercentChange(userSignupsData);
  const supportTicketsChange = calculatePercentChange(supportTicketsData);
  const bookingRequestsChange = calculatePercentChange(bookingRequestsData);
  
  // Monthly active users by role
  const usersByRole = [
    { name: 'Stylists', value: 35 },
    { name: 'Salon Owners', value: 25 },
    { name: 'Clients', value: 40 }
  ];
  
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c43', '#8dd1e1'];
  
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard 
          title="Total Registered Users"
          value={users.length}
          change={userSignupsChange}
          icon={<Users size={24} className="text-purple-400" />}
        />
        
        <MetricCard 
          title="Support Tickets"
          value={supportQuestions.length}
          change={supportTicketsChange}
          icon={<MessageSquare size={24} className="text-blue-400" />}
        />
        
        <MetricCard 
          title="Booking Requests"
          value={72} // Example value
          change={bookingRequestsChange}
          icon={<Calendar size={24} className="text-emerald-400" />}
        />
      </div>
      
      {/* Main metrics graph */}
      <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/5 p-6 mb-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-white">User Activity Overview</h3>
          <div className="flex items-center text-sm text-gray-400">
            <TrendingUp size={18} className="mr-2 text-purple-400" />
            Last 30 days
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={userSignupsData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#aaa' }} 
                axisLine={{ stroke: '#444' }}
                tickLine={{ stroke: '#444' }}
                minTickGap={15}
              />
              <YAxis 
                tick={{ fill: '#aaa' }}
                axisLine={{ stroke: '#444' }}
                tickLine={{ stroke: '#444' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                name="Users"
                stroke="#8884d8" 
                fillOpacity={1} 
                fill="url(#colorUsers)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Support tickets vs time */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/5 p-6 shadow-lg">
          <h3 className="text-lg font-medium text-white mb-4">Support Tickets</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={supportTicketsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#aaa' }}
                  axisLine={{ stroke: '#444' }}
                  tickLine={{ stroke: '#444' }}
                />
                <YAxis 
                  tick={{ fill: '#aaa' }}
                  axisLine={{ stroke: '#444' }}
                  tickLine={{ stroke: '#444' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Tickets"
                  stroke="#82ca9d" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* User types distribution */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/5 p-6 shadow-lg">
          <h3 className="text-lg font-medium text-white mb-4">User Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={usersByRole}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {usersByRole.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => [`${value} users`, 'Count']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;
