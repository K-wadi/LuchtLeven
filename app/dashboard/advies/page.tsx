"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FinancialAdvisor } from "@/components/financial-advisor"

export default function AdvisorPage() {
  const { transactions, categories, goals, fixedCosts } = useStore()

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Financieel Advies</h1>
        <p className="text-muted-foreground">
          Persoonlijke inzichten en aanbevelingen voor je financiën
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inzichten en Aanbevelingen</CardTitle>
        </CardHeader>
        <CardContent>
          <FinancialAdvisor
            transactions={transactions}
            categories={categories}
            goals={goals}
            fixedCosts={fixedCosts}
          />
        </CardContent>
      </Card>
    </div>
  )
} 