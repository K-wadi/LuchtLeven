import React from 'react';
import { Card } from '@/components/ui/card';
import { useFinancial } from '@/context/FinancialContext';
import { AlertCircle, TrendingUp, TrendingDown, Info } from 'lucide-react';

export function FinancialAlerts() {
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

  const totalMonthlyOutgoings = totalExpenses + totalFixedCosts + totalHealthExpenses;

  // Generate alerts based on financial data
  const alerts = [];

  // Check if fixed costs are more than 50% of total outgoings
  if (totalFixedCosts > totalMonthlyOutgoings * 0.5) {
    alerts.push({
      type: 'warning',
      icon: AlertCircle,
      message: 'Your fixed costs are more than 50% of your total monthly outgoings. Consider reviewing your recurring expenses.',
    });
  }

  // Check if health expenses are unusually high
  if (totalHealthExpenses > totalMonthlyOutgoings * 0.3) {
    alerts.push({
      type: 'warning',
      icon: AlertCircle,
      message: 'Your health expenses are higher than usual this month. Consider reviewing your health insurance coverage.',
    });
  }

  // Check for upcoming financial goals deadlines
  const upcomingGoals = state.goals.filter((goal) => {
    const deadline = new Date(goal.deadline);
    const today = new Date();
    const daysUntilDeadline = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilDeadline <= 30 && daysUntilDeadline > 0;
  });

  if (upcomingGoals.length > 0) {
    alerts.push({
      type: 'info',
      icon: Info,
      message: `You have ${upcomingGoals.length} financial goal${
        upcomingGoals.length > 1 ? 's' : ''
      } due within the next 30 days.`,
    });
  }

  // Check for spending trends
  const previousMonthExpenses = state.expenses.filter(
    (expense) =>
      expense.date.getMonth() === currentMonth - 1 &&
      expense.date.getFullYear() === currentYear
  );

  const previousMonthTotal = previousMonthExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  if (totalExpenses > previousMonthTotal * 1.2) {
    alerts.push({
      type: 'warning',
      icon: TrendingUp,
      message: 'Your expenses have increased by more than 20% compared to last month.',
    });
  } else if (totalExpenses < previousMonthTotal * 0.8) {
    alerts.push({
      type: 'success',
      icon: TrendingDown,
      message: 'Great job! Your expenses have decreased by more than 20% compared to last month.',
    });
  }

  if (alerts.length === 0) {
    return null;
  }

  return (
    <Card className="p-4">
      <h3 className="font-medium mb-4">Financial Alerts & Recommendations</h3>
      <div className="space-y-4">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          return (
            <div
              key={index}
              className={`flex items-start space-x-3 p-3 rounded-lg ${
                alert.type === 'warning'
                  ? 'bg-yellow-50 text-yellow-800'
                  : alert.type === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-blue-50 text-blue-800'
              }`}
            >
              <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm">{alert.message}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
} 