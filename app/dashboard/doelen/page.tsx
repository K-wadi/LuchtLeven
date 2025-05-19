"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/utils"
import { addGoal } from "@/lib/local-storage"
import type { FinancialGoal } from "@/lib/types"

export default function GoalsPage() {
  const { user } = useAuth()
  const { goals, transactions } = useStore()
  const [isAdding, setIsAdding] = useState(false)
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!user) return

    try {
      const goal: Omit<FinancialGoal, "id" | "userId" | "createdAt" | "updatedAt"> = {
        name: newGoal.name,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: parseFloat(newGoal.currentAmount) || 0,
        deadline: new Date(newGoal.deadline).toISOString(),
        status: "active",
      }

      await addGoal(user.uid, goal)
      setNewGoal({
        name: "",
        targetAmount: "",
        currentAmount: "",
        deadline: "",
      })
      setIsAdding(false)
    } catch (err) {
      setError("Er is een fout opgetreden bij het toevoegen van het doel.")
    }
  }

  const calculateProgress = (goal: FinancialGoal) => {
    return (goal.currentAmount / goal.targetAmount) * 100
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Financiële Doelen</h1>
        <Button onClick={() => setIsAdding(true)}>Nieuw Doel</Button>
      </div>

      {isAdding && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Nieuw Financieel Doel</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Naam</Label>
                <Input
                  id="name"
                  value={newGoal.name}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="targetAmount">Doelbedrag</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newGoal.targetAmount}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, targetAmount: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="currentAmount">Huidig Bedrag</Label>
                <Input
                  id="currentAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newGoal.currentAmount}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, currentAmount: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, deadline: e.target.value })
                  }
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex gap-2">
                <Button type="submit">Toevoegen</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                >
                  Annuleren
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <Card key={goal.id}>
            <CardHeader>
              <CardTitle>{goal.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Doelbedrag</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(goal.targetAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Huidig Bedrag</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(goal.currentAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Voortgang</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${Math.min(
                          calculateProgress(goal),
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {calculateProgress(goal).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Deadline</p>
                  <p className="text-sm">
                    {new Date(goal.deadline).toLocaleDateString("nl-NL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 