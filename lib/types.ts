export type TransactionType = "income" | "expense"

export interface Transaction {
  id: string
  userId: string
  type: TransactionType
  amount: number
  description: string
  category: string
  date: Date
  createdAt: Date
  updatedAt: Date
}

export interface FinancialGoal {
  id: string
  userId: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: Date
  category: string
  createdAt: Date
  updatedAt: Date
}

export interface FixedCost {
  id: string
  userId: string
  name: string
  amount: number
  category: string
  frequency: "monthly" | "yearly"
  dueDate: number // Day of the month
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  userId: string
  name: string
  type: TransactionType
  color: string
  icon: string
  createdAt: Date
  updatedAt: Date
}

export interface UserSettings {
  userId: string
  currency: string
  language: string
  theme: "light" | "dark" | "system"
  notifications: boolean
  createdAt: Date
  updatedAt: Date
} 