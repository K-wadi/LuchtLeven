"use client"

import { formatCurrency, formatDate } from "@/lib/utils"

const transactions = [
  {
    id: "1",
    description: "Salaris",
    amount: 2500,
    date: new Date(),
    type: "income",
  },
  {
    id: "2",
    description: "Boodschappen",
    amount: -85.50,
    date: new Date(Date.now() - 86400000),
    type: "expense",
  },
  {
    id: "3",
    description: "Huur",
    amount: -1200,
    date: new Date(Date.now() - 172800000),
    type: "expense",
  },
  {
    id: "4",
    description: "Freelance werk",
    amount: 750,
    date: new Date(Date.now() - 259200000),
    type: "income",
  },
  {
    id: "5",
    description: "Netflix abonnement",
    amount: -15.99,
    date: new Date(Date.now() - 345600000),
    type: "expense",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {transaction.description}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatDate(transaction.date)}
            </p>
          </div>
          <div className="ml-auto font-medium">
            <span className={transaction.type === "income" ? "text-green-500" : "text-red-500"}>
              {formatCurrency(transaction.amount)}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
} 