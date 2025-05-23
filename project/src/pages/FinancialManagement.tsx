import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { ExpenseForm } from '@/components/forms/ExpenseForm';
import { FixedCostForm } from '@/components/forms/FixedCostForm';
import { FinancialGoalForm } from '@/components/forms/FinancialGoalForm';
import { HealthExpenseForm } from '@/components/forms/HealthExpenseForm';

export function FinancialManagement() {
  const [activeTab, setActiveTab] = useState('expenses');

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Financial Management</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 gap-4">
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="fixed-costs">Fixed Costs</TabsTrigger>
          <TabsTrigger value="goals">Financial Goals</TabsTrigger>
          <TabsTrigger value="health">Health Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Expenses</h2>
            <ExpenseForm />
          </Card>
        </TabsContent>

        <TabsContent value="fixed-costs">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Fixed Costs</h2>
            <FixedCostForm />
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Financial Goals</h2>
            <FinancialGoalForm />
          </Card>
        </TabsContent>

        <TabsContent value="health">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Health Expenses</h2>
            <HealthExpenseForm />
          </Card>
        </TabsContent>
      </Tabs>

      {/* TODO: Add data tables for each section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Entries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <h3 className="font-medium mb-2">Recent Expenses</h3>
            {/* TODO: Add expense list */}
          </Card>
          <Card className="p-4">
            <h3 className="font-medium mb-2">Fixed Costs</h3>
            {/* TODO: Add fixed costs list */}
          </Card>
          <Card className="p-4">
            <h3 className="font-medium mb-2">Financial Goals</h3>
            {/* TODO: Add goals list */}
          </Card>
          <Card className="p-4">
            <h3 className="font-medium mb-2">Health Expenses</h3>
            {/* TODO: Add health expenses list */}
          </Card>
        </div>
      </div>
    </div>
  );
} 