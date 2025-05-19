"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useStore } from "@/lib/store"
import { addTransaction } from "@/lib/local-storage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

export default function IncomePage() {
  const { user } = useAuth()
  const { transactions, categories, fetchData } = useStore()
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const incomeCategories = categories.filter((cat) => cat.type === "income")
  const incomeTransactions = transactions.filter((t) => t.type === "income")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSubmitting(true)
    setError("")

    try {
      await addTransaction({
        userId: user.uid,
        type: "income",
        amount: Math.abs(parseFloat(amount)), // Ensure positive amount for income
        description,
        category,
        date: new Date(date),
      })

      await fetchData(user.uid)
      setAmount("")
      setDescription("")
      setCategory("")
      setDate(new Date().toISOString().split("T")[0])
    } catch (err) {
      setError("Er is een fout opgetreden bij het toevoegen van de inkomst")
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0)

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
              <div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Nieuwe inkomst</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium">
                    Bedrag
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium">
                    Beschrijving
                  </label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium">
                    Categorie
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  >
                    <option value="">Selecteer een categorie</option>
                    {incomeCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium">
                    Datum
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  {isSubmitting ? "Bezig met opslaan..." : "Inkomst toevoegen"}
                </button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recente inkomsten</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incomeTransactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString("nl-NL")}
                      </p>
                    </div>
                    <div className="font-medium text-green-500">
                      {formatCurrency(transaction.amount)}
                    </div>
                  </div>
                ))}
                {incomeTransactions.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Nog geen inkomsten geregistreerd
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 