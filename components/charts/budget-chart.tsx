"use client"

import { useMemo } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { formatCurrency } from "@/lib/utils"
import type { Transaction, Category } from "@/lib/types"

interface BudgetChartProps {
  transactions: Transaction[]
  categories: Category[]
}

interface ChartData {
  category: string
  budget: number
  actual: number
  difference: number
}

export function BudgetChart({ transactions, categories }: BudgetChartProps) {
  const data = useMemo(() => {
    // For now, we'll use a simple budget calculation based on average monthly expenses
    // In a real app, this would come from user-defined budgets
    const monthlyAverages = new Map<string, number>()
    const categoryTotals = new Map<string, number>()

    // Calculate monthly averages for each category
    categories
      .filter((cat) => cat.type === "expense")
      .forEach((category) => {
        const categoryTransactions = transactions.filter(
          (t) => t.type === "expense" && t.category === category.id
        )

        if (categoryTransactions.length > 0) {
          const total = categoryTransactions.reduce(
            (sum, t) => sum + Math.abs(t.amount),
            0
          )
          const months = new Set(
            categoryTransactions.map((t) =>
              new Date(t.date).toLocaleString("nl-NL", {
                month: "long",
                year: "numeric",
              })
            )
          ).size

          monthlyAverages.set(
            category.id,
            total / Math.max(months, 1) // Avoid division by zero
          )
        }
      })

    // Calculate actual spending for the current month
    const currentMonth = new Date().toLocaleString("nl-NL", {
      month: "long",
      year: "numeric",
    })

    transactions
      .filter(
        (t) =>
          t.type === "expense" &&
          new Date(t.date).toLocaleString("nl-NL", {
            month: "long",
            year: "numeric",
          }) === currentMonth
      )
      .forEach((transaction) => {
        const current = categoryTotals.get(transaction.category) || 0
        categoryTotals.set(
          transaction.category,
          current + Math.abs(transaction.amount)
        )
      })

    // Combine data for chart
    return Array.from(monthlyAverages.entries())
      .map(([categoryId, budget]) => {
        const category = categories.find((c) => c.id === categoryId)
        const actual = categoryTotals.get(categoryId) || 0
        return {
          category: category?.name || "Onbekend",
          budget,
          actual,
          difference: actual - budget,
        }
      })
      .sort((a, b) => b.actual - a.actual)
  }, [transactions, categories])

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis
            tickFormatter={(value) => formatCurrency(value)}
            width={80}
          />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `Categorie: ${label}`}
          />
          <Legend />
          <Bar
            dataKey="budget"
            name="Budget"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="actual"
            name="Werkelijk"
            fill="#22c55e"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 