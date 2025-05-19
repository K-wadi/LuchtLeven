"use client"

import { useMemo } from "react"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { formatCurrency } from "@/lib/utils"
import type { Transaction, Category } from "@/lib/types"

interface CategoryChartProps {
  transactions: Transaction[]
  categories: Category[]
  type: "income" | "expense"
}

interface ChartData {
  name: string
  value: number
  color: string
}

export function CategoryChart({ transactions, categories, type }: CategoryChartProps) {
  const data = useMemo(() => {
    const categoryTotals = new Map<string, { value: number; color: string }>()

    // Initialize with all categories of the specified type
    categories
      .filter((cat) => cat.type === type)
      .forEach((category) => {
        categoryTotals.set(category.id, {
          value: 0,
          color: category.color,
        })
      })

    // Calculate totals for each category
    transactions
      .filter((t) => t.type === type)
      .forEach((transaction) => {
        const category = categoryTotals.get(transaction.category)
        if (category) {
          category.value += Math.abs(transaction.amount)
          categoryTotals.set(transaction.category, category)
        }
      })

    // Convert to array and sort by value
    return Array.from(categoryTotals.entries())
      .map(([id, data]) => {
        const category = categories.find((c) => c.id === id)
        return {
          name: category?.name || "Onbekend",
          value: data.value,
          color: data.color,
        }
      })
      .sort((a, b) => b.value - a.value)
  }, [transactions, categories, type])

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `Categorie: ${label}`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
} 