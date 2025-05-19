"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"
import { addFixedCost } from "@/lib/local-storage"
import type { FixedCost } from "@/lib/types"

const FREQUENCIES = [
  { value: "monthly", label: "Maandelijks" },
  { value: "quarterly", label: "Per kwartaal" },
  { value: "yearly", label: "Jaarlijks" },
]

export default function FixedCostsPage() {
  const { user } = useAuth()
  const { fixedCosts, categories } = useStore()
  const [isAdding, setIsAdding] = useState(false)
  const [newCost, setNewCost] = useState({
    name: "",
    amount: "",
    category: "",
    frequency: "monthly",
    dueDate: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!user) return

    try {
      const fixedCost: Omit<FixedCost, "id" | "userId" | "createdAt" | "updatedAt"> = {
        name: newCost.name,
        amount: parseFloat(newCost.amount),
        category: newCost.category,
        frequency: newCost.frequency as "monthly" | "quarterly" | "yearly",
        dueDate: new Date(newCost.dueDate).toISOString(),
        status: "active",
      }

      await addFixedCost(user.uid, fixedCost)
      setNewCost({
        name: "",
        amount: "",
        category: "",
        frequency: "monthly",
        dueDate: "",
      })
      setIsAdding(false)
    } catch (err) {
      setError("Er is een fout opgetreden bij het toevoegen van de vaste kosten.")
    }
  }

  const getMonthlyAmount = (cost: FixedCost) => {
    switch (cost.frequency) {
      case "monthly":
        return cost.amount
      case "quarterly":
        return cost.amount / 3
      case "yearly":
        return cost.amount / 12
      default:
        return cost.amount
    }
  }

  const totalMonthlyFixedCosts = fixedCosts.reduce(
    (sum, cost) => sum + getMonthlyAmount(cost),
    0
  )

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Vaste Kosten</h1>
        <Button onClick={() => setIsAdding(true)}>Nieuwe Vaste Kosten</Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Maandelijkse Vaste Kosten</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-500">
            {formatCurrency(totalMonthlyFixedCosts)}
          </p>
        </CardContent>
      </Card>

      {isAdding && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Nieuwe Vaste Kosten</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Naam</Label>
                <Input
                  id="name"
                  value={newCost.name}
                  onChange={(e) =>
                    setNewCost({ ...newCost, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="amount">Bedrag</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newCost.amount}
                  onChange={(e) =>
                    setNewCost({ ...newCost, amount: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Categorie</Label>
                <Select
                  value={newCost.category}
                  onValueChange={(value) =>
                    setNewCost({ ...newCost, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer een categorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((cat) => cat.type === "expense")
                      .map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="frequency">Frequentie</Label>
                <Select
                  value={newCost.frequency}
                  onValueChange={(value) =>
                    setNewCost({ ...newCost, frequency: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer een frequentie" />
                  </SelectTrigger>
                  <SelectContent>
                    {FREQUENCIES.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dueDate">Vervaldatum</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newCost.dueDate}
                  onChange={(e) =>
                    setNewCost({ ...newCost, dueDate: e.target.value })
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
        {fixedCosts.map((cost) => (
          <Card key={cost.id}>
            <CardHeader>
              <CardTitle>{cost.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Bedrag</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(cost.amount)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(getMonthlyAmount(cost))} per maand
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Categorie</p>
                  <p className="text-sm">
                    {categories.find((c) => c.id === cost.category)?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Frequentie</p>
                  <p className="text-sm">
                    {FREQUENCIES.find((f) => f.value === cost.frequency)?.label}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vervaldatum</p>
                  <p className="text-sm">
                    {new Date(cost.dueDate).toLocaleDateString("nl-NL", {
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