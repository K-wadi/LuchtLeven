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
import type { Transaction } from "@/lib/types"

interface MonthlyChartProps {
  transactions: Transaction[]
}

interface ChartData {
  month: string
  income: number
  expenses: number
  savings: number
}

export function MonthlyChart({ transactions }: MonthlyChartProps) {
  const data = useMemo(() => {
    const monthlyData = new Map<string, { income: number; expenses: number }>()

    // Initialize last 6 months
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      return date.toLocaleString("nl-NL", { month: "long", year: "numeric" })
    }).reverse()

    months.forEach((month) => {
      monthlyData.set(month, { income: 0, expenses: 0 })
    })

    // Calculate totals for each month
    transactions.forEach((transaction) => {
      const month = new Date(transaction.date).toLocaleString("nl-NL", {
        month: "long",
        year: "numeric",
      })

      if (monthlyData.has(month)) {
        const data = monthlyData.get(month)!
        if (transaction.type === "income") {
          data.income += transaction.amount
        } else {
          data.expenses += Math.abs(transaction.amount)
        }
        monthlyData.set(month, data)
      }
    })

    // Convert to array and calculate savings
    return Array.from(monthlyData.entries()).map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
      savings: data.income - data.expenses,
    }))
  }, [transactions])

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
          <XAxis dataKey="month" />
          <YAxis
            tickFormatter={(value) => formatCurrency(value)}
            width={80}
          />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `Maand: ${label}`}
          />
          <Legend />
          <Bar
            dataKey="income"
            name="Inkomsten"
            fill="#22c55e"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="expenses"
            name="Uitgaven"
            fill="#ef4444"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="savings"
            name="Besparingen"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 