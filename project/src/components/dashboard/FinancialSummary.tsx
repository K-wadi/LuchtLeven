import React from 'react';
import { Card } from '@/components/ui/card';
import { useFinancial } from '@/context/FinancialContext';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function FinancialSummary() {
  const { state } = useFinancial();

  // Calculate monthly totals
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = state.expenses.filter(
    (expense) =>
      expense.date.getMonth() === currentMonth &&
      expense.date.getFullYear() === currentYear
  );

  const monthlyFixedCosts = state.fixedCosts.filter(
    (cost) =>
      cost.date.getMonth() === currentMonth &&
      cost.date.getFullYear() === currentYear
  );

  const monthlyHealthExpenses = state.healthExpenses.filter(
    (expense) =>
      expense.date.getMonth() === currentMonth &&
      expense.date.getFullYear() === currentYear
  );

  // Calculate totals
  const totalExpenses = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalFixedCosts = monthlyFixedCosts.reduce((sum, cost) => sum + cost.amount, 0);
  const totalHealthExpenses = monthlyHealthExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Prepare data for pie chart
  const pieChartData = [
    { name: 'Expenses', value: totalExpenses },
    { name: 'Fixed Costs', value: totalFixedCosts },
    { name: 'Health Expenses', value: totalHealthExpenses },
  ];

  // Prepare data for bar chart (expenses by category)
  const expensesByCategory = monthlyExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const barChartData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    category,
    amount,
  }));

  // Calculate financial goals progress
  const goalsProgress = state.goals.map((goal) => ({
    name: goal.name,
    progress: (goal.currentAmount / goal.targetAmount) * 100,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="font-medium mb-2">Monthly Expenses</h3>
          <p className="text-2xl font-bold">€{totalExpenses.toFixed(2)}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-medium mb-2">Fixed Costs</h3>
          <p className="text-2xl font-bold">€{totalFixedCosts.toFixed(2)}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-medium mb-2">Health Expenses</h3>
          <p className="text-2xl font-bold">€{totalHealthExpenses.toFixed(2)}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="font-medium mb-4">Expense Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-medium mb-4">Expenses by Category</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-medium mb-4">Financial Goals Progress</h3>
        <div className="space-y-4">
          {goalsProgress.map((goal) => (
            <div key={goal.name} className="space-y-2">
              <div className="flex justify-between">
                <span>{goal.name}</span>
                <span>{goal.progress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 