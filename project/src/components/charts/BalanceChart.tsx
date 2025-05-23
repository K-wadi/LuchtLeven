import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

interface BalanceChartProps {
  period: 'day' | 'month' | 'year';
}

// Mock data for MVP
const mockDayData = [
  { name: '00:00', balance: 3100 },
  { name: '03:00', balance: 3100 },
  { name: '06:00', balance: 3050 },
  { name: '09:00', balance: 3000 },
  { name: '12:00', balance: 2900 },
  { name: '15:00', balance: 3200 },
  { name: '18:00', balance: 3150 },
  { name: '21:00', balance: 3100 },
  { name: '24:00', balance: 3100 },
];

const mockMonthData = [
  { name: '1 Apr', balance: 2900 },
  { name: '5 Apr', balance: 3100 },
  { name: '10 Apr', balance: 3000 },
  { name: '15 Apr', balance: 3200 },
  { name: '20 Apr', balance: 3150 },
  { name: '25 Apr', balance: 3050 },
  { name: '30 Apr', balance: 3245.67 },
];

const mockYearData = [
  { name: 'Jan', balance: 2500 },
  { name: 'Feb', balance: 2650 },
  { name: 'Mar', balance: 2800 },
  { name: 'Apr', balance: 3245.67 },
  { name: 'Mei', balance: 3245.67 },
  { name: 'Jun', balance: 3245.67 },
  { name: 'Jul', balance: 3245.67 },
  { name: 'Aug', balance: 3245.67 },
  { name: 'Sep', balance: 3245.67 },
  { name: 'Okt', balance: 3245.67 },
  { name: 'Nov', balance: 3245.67 },
  { name: 'Dec', balance: 3245.67 },
];

const BalanceChart = ({ period }: BalanceChartProps) => {
  const { theme } = useTheme();
  
  const getChartData = () => {
    switch (period) {
      case 'day':
        return mockDayData;
      case 'month':
        return mockMonthData;
      case 'year':
        return mockYearData;
      default:
        return mockMonthData;
    }
  };

  const data = getChartData();
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
        <XAxis 
          dataKey="name" 
          stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} 
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} 
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `€${value}`}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
            color: theme === 'dark' ? '#f3f4f6' : '#111827',
          }} 
          formatter={(value) => [`€${value}`, 'Balans']}
        />
        <Line 
          type="monotone" 
          dataKey="balance" 
          stroke="#3B82F6" 
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BalanceChart;