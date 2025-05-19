"use client"

import { useAuth } from "@/lib/auth-context"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { MonthlyChart } from "@/components/charts/monthly-chart"
import { CategoryChart } from "@/components/charts/category-chart"
import { BudgetChart } from "@/components/charts/budget-chart"

export default function DashboardPage() {
  const { user } = useAuth()
  const { transactions, categories } = useStore()

  const incomeTransactions = transactions.filter((t) => t.type === "income")
  const expenseTransactions = transactions.filter((t) => t.type === "expense")

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = Math.abs(expenseTransactions.reduce((sum, t) => sum + t.amount, 0))
  const savings = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? (savings / totalIncome) * 100 : 0

  return (
    <div className="container mx-auto py-6">
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Totale inkomsten
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {formatCurrency(totalIncome)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Totale uitgaven
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {formatCurrency(totalExpenses)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Besparingen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {formatCurrency(savings)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Spaarpercentage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {savingsRate.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Maandelijkse overzicht</CardTitle>
            </CardHeader>
            <CardContent>
              <MonthlyChart transactions={transactions} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categorie verdeling</CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryChart
                transactions={transactions}
                categories={categories}
                type="expense"
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Budget vs Werkelijk</CardTitle>
          </CardHeader>
          <CardContent>
            <BudgetChart transactions={transactions} categories={categories} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 