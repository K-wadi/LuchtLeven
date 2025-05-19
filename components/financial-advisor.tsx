"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import type { Transaction, Category, FinancialGoal, FixedCost } from "@/lib/types"

interface FinancialAdvisorProps {
  transactions: Transaction[]
  categories: Category[]
  goals: FinancialGoal[]
  fixedCosts: FixedCost[]
}

interface Insight {
  type: "warning" | "success" | "info"
  title: string
  message: string
}

export function FinancialAdvisor({
  transactions,
  categories,
  goals,
  fixedCosts,
}: FinancialAdvisorProps) {
  const insights = useMemo(() => {
    const insights: Insight[] = []
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    // Calculate monthly totals
    const monthlyIncome = transactions
      .filter(
        (t) =>
          t.type === "income" &&
          new Date(t.date).getMonth() === currentMonth &&
          new Date(t.date).getFullYear() === currentYear
      )
      .reduce((sum, t) => sum + t.amount, 0)

    const monthlyExpenses = Math.abs(
      transactions
        .filter(
          (t) =>
            t.type === "expense" &&
            new Date(t.date).getMonth() === currentMonth &&
            new Date(t.date).getFullYear() === currentYear
        )
        .reduce((sum, t) => sum + t.amount, 0)
    )

    // Calculate total fixed costs
    const totalFixedCosts = fixedCosts.reduce((sum, cost) => {
      switch (cost.frequency) {
        case "monthly":
          return sum + cost.amount
        case "quarterly":
          return sum + cost.amount / 3
        case "yearly":
          return sum + cost.amount / 12
        default:
          return sum + cost.amount
      }
    }, 0)

    // Calculate savings rate
    const savingsRate = monthlyIncome > 0 ? (monthlyIncome - monthlyExpenses) / monthlyIncome : 0

    // Analyze spending patterns
    const categorySpending = new Map<string, number>()
    transactions
      .filter(
        (t) =>
          t.type === "expense" &&
          new Date(t.date).getMonth() === currentMonth &&
          new Date(t.date).getFullYear() === currentYear
      )
      .forEach((transaction) => {
        const current = categorySpending.get(transaction.category) || 0
        categorySpending.set(
          transaction.category,
          current + Math.abs(transaction.amount)
        )
      })

    // Check goals progress
    goals.forEach((goal) => {
      const progress = (goal.currentAmount / goal.targetAmount) * 100
      const daysUntilDeadline = Math.ceil(
        (new Date(goal.deadline).getTime() - currentDate.getTime()) /
          (1000 * 60 * 60 * 24)
      )

      if (daysUntilDeadline <= 30 && progress < 90) {
        insights.push({
          type: "warning",
          title: "Doel deadline nadert",
          message: `Je doel "${goal.name}" is voor ${progress.toFixed(
            1
          )}% voltooid en de deadline is over ${daysUntilDeadline} dagen.`,
        })
      }
    })

    // Check fixed costs
    fixedCosts.forEach((cost) => {
      const daysUntilDue = Math.ceil(
        (new Date(cost.dueDate).getTime() - currentDate.getTime()) /
          (1000 * 60 * 60 * 24)
      )

      if (daysUntilDue <= 7) {
        insights.push({
          type: "warning",
          title: "Vaste kosten vervalt binnenkort",
          message: `${cost.name} van ${formatCurrency(
            cost.amount
          )} vervalt over ${daysUntilDue} dagen.`,
        })
      }
    })

    // Analyze spending patterns
    const highestSpendingCategory = Array.from(categorySpending.entries())
      .sort((a, b) => b[1] - a[1])[0]

    if (highestSpendingCategory) {
      const category = categories.find((c) => c.id === highestSpendingCategory[0])
      const spendingPercentage =
        (highestSpendingCategory[1] / monthlyExpenses) * 100

      if (spendingPercentage > 30) {
        insights.push({
          type: "info",
          title: "Hoog uitgavenpatroon",
          message: `${category?.name} neemt ${spendingPercentage.toFixed(
            1
          )}% van je maandelijkse uitgaven in beslag.`,
        })
      }
    }

    // Check savings rate
    if (savingsRate < 0.2) {
      insights.push({
        type: "warning",
        title: "Laag spaarpercentage",
        message: `Je spaarpercentage is ${(savingsRate * 100).toFixed(
          1
        )}%. Probeer minimaal 20% van je inkomen te sparen.`,
      })
    } else if (savingsRate > 0.3) {
      insights.push({
        type: "success",
        title: "Goed spaarpercentage",
        message: `Je spaarpercentage is ${(savingsRate * 100).toFixed(
          1
        )}%. Blijf zo doorgaan!`,
      })
    }

    // Check fixed costs ratio
    const fixedCostsRatio = totalFixedCosts / monthlyIncome
    if (fixedCostsRatio > 0.5) {
      insights.push({
        type: "warning",
        title: "Hoge vaste lasten",
        message: `Je vaste lasten nemen ${(fixedCostsRatio * 100).toFixed(
          1
        )}% van je inkomen in beslag. Overweeg om te besparen op vaste kosten.`,
      })
    }

    return insights
  }, [transactions, categories, goals, fixedCosts])

  return (
    <div className="space-y-4">
      {insights.map((insight, index) => (
        <Card
          key={index}
          className={
            insight.type === "warning"
              ? "border-yellow-500"
              : insight.type === "success"
              ? "border-green-500"
              : "border-blue-500"
          }
        >
          <CardHeader>
            <CardTitle
              className={
                insight.type === "warning"
                  ? "text-yellow-500"
                  : insight.type === "success"
                  ? "text-green-500"
                  : "text-blue-500"
              }
            >
              {insight.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{insight.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 