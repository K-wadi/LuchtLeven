import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

// Mock data for MVP
const mockData = [
  { name: 'Wonen', value: 985.5, color: '#818cf8' },  // indigo
  { name: 'Boodschappen', value: 285.4, color: '#fbbf24' },  // amber
  { name: 'Transport', value: 150.2, color: '#3b82f6' },  // blue
  { name: 'Horeca', value: 120.8, color: '#ec4899' },  // pink
  { name: 'Gezondheid', value: 68.6, color: '#ef4444' },  // red
  { name: 'Overig', value: 39.83, color: '#94a3b8' },  // slate
];

const ExpensePieChart = () => {
  const { theme } = useTheme();
  
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill={theme === 'dark' ? '#f3f4f6' : '#000000'}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={mockData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {mockData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => `€${value.toFixed(2)}`}
          contentStyle={{ 
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
            color: theme === 'dark' ? '#f3f4f6' : '#111827',
          }} 
        />
        <Legend 
          layout="vertical" 
          verticalAlign="middle" 
          align="right" 
          wrapperStyle={{ 
            fontSize: '12px',
            color: theme === 'dark' ? '#f3f4f6' : '#111827'
          }} 
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpensePieChart;