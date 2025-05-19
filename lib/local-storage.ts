import { openDB, DBSchema, IDBPDatabase } from "idb"
import type {
  Transaction,
  FinancialGoal,
  FixedCost,
  Category,
  UserSettings,
} from "./types"

interface LuchtLevenDB extends DBSchema {
  transactions: {
    key: string
    value: Transaction
    indexes: { "by-user": string; "by-date": Date }
  }
  goals: {
    key: string
    value: FinancialGoal
    indexes: { "by-user": string }
  }
  fixedCosts: {
    key: string
    value: FixedCost
    indexes: { "by-user": string }
  }
  categories: {
    key: string
    value: Category
    indexes: { "by-user": string }
  }
  userSettings: {
    key: string
    value: UserSettings
  }
}

let db: IDBPDatabase<LuchtLevenDB> | null = null

const initDB = async () => {
  if (db) return db

  db = await openDB<LuchtLevenDB>("luchtleven", 1, {
    upgrade(database) {
      // Transactions store
      const transactionStore = database.createObjectStore("transactions", { keyPath: "id" })
      transactionStore.createIndex("by-user", "userId")
      transactionStore.createIndex("by-date", "date")

      // Goals store
      const goalStore = database.createObjectStore("goals", { keyPath: "id" })
      goalStore.createIndex("by-user", "userId")

      // Fixed costs store
      const fixedCostStore = database.createObjectStore("fixedCosts", { keyPath: "id" })
      fixedCostStore.createIndex("by-user", "userId")

      // Categories store
      const categoryStore = database.createObjectStore("categories", { keyPath: "id" })
      categoryStore.createIndex("by-user", "userId")

      // User settings store
      database.createObjectStore("userSettings", { keyPath: "userId" })
    },
  })

  return db
}

// Helper function to generate a unique ID
const generateId = () => crypto.randomUUID()

// Transactions
export const addTransaction = async (transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">) => {
  const database = await initDB()
  const id = generateId()
  const now = new Date()
  
  const newTransaction: Transaction = {
    ...transaction,
    id,
    createdAt: now,
    updatedAt: now,
  }

  await database.add("transactions", newTransaction)
  return id
}

export const updateTransaction = async (id: string, data: Partial<Transaction>) => {
  const database = await initDB()
  const transaction = await database.get("transactions", id)
  if (!transaction) throw new Error("Transaction not found")

  const updatedTransaction = {
    ...transaction,
    ...data,
    updatedAt: new Date(),
  }

  await database.put("transactions", updatedTransaction)
}

export const deleteTransaction = async (id: string) => {
  const database = await initDB()
  await database.delete("transactions", id)
}

export const getTransactions = async (userId: string) => {
  const database = await initDB()
  const index = database.transaction("transactions").store.index("by-user")
  const transactions = await index.getAll(userId)
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime())
}

// Financial Goals
export const addFinancialGoal = async (goal: Omit<FinancialGoal, "id" | "createdAt" | "updatedAt">) => {
  const database = await initDB()
  const id = generateId()
  const now = new Date()
  
  const newGoal: FinancialGoal = {
    ...goal,
    id,
    createdAt: now,
    updatedAt: now,
  }

  await database.add("goals", newGoal)
  return id
}

export const updateFinancialGoal = async (id: string, data: Partial<FinancialGoal>) => {
  const database = await initDB()
  const goal = await database.get("goals", id)
  if (!goal) throw new Error("Goal not found")

  const updatedGoal = {
    ...goal,
    ...data,
    updatedAt: new Date(),
  }

  await database.put("goals", updatedGoal)
}

export const deleteFinancialGoal = async (id: string) => {
  const database = await initDB()
  await database.delete("goals", id)
}

export const getFinancialGoals = async (userId: string) => {
  const database = await initDB()
  const index = database.transaction("goals").store.index("by-user")
  return index.getAll(userId)
}

// Fixed Costs
export const addFixedCost = async (fixedCost: Omit<FixedCost, "id" | "createdAt" | "updatedAt">) => {
  const database = await initDB()
  const id = generateId()
  const now = new Date()
  
  const newFixedCost: FixedCost = {
    ...fixedCost,
    id,
    createdAt: now,
    updatedAt: now,
  }

  await database.add("fixedCosts", newFixedCost)
  return id
}

export const updateFixedCost = async (id: string, data: Partial<FixedCost>) => {
  const database = await initDB()
  const fixedCost = await database.get("fixedCosts", id)
  if (!fixedCost) throw new Error("Fixed cost not found")

  const updatedFixedCost = {
    ...fixedCost,
    ...data,
    updatedAt: new Date(),
  }

  await database.put("fixedCosts", updatedFixedCost)
}

export const deleteFixedCost = async (id: string) => {
  const database = await initDB()
  await database.delete("fixedCosts", id)
}

export const getFixedCosts = async (userId: string) => {
  const database = await initDB()
  const index = database.transaction("fixedCosts").store.index("by-user")
  return index.getAll(userId)
}

// Categories
export const addCategory = async (category: Omit<Category, "id" | "createdAt" | "updatedAt">) => {
  const database = await initDB()
  const id = generateId()
  const now = new Date()
  
  const newCategory: Category = {
    ...category,
    id,
    createdAt: now,
    updatedAt: now,
  }

  await database.add("categories", newCategory)
  return id
}

export const updateCategory = async (id: string, data: Partial<Category>) => {
  const database = await initDB()
  const category = await database.get("categories", id)
  if (!category) throw new Error("Category not found")

  const updatedCategory = {
    ...category,
    ...data,
    updatedAt: new Date(),
  }

  await database.put("categories", updatedCategory)
}

export const deleteCategory = async (id: string) => {
  const database = await initDB()
  await database.delete("categories", id)
}

export const getCategories = async (userId: string) => {
  const database = await initDB()
  const index = database.transaction("categories").store.index("by-user")
  return index.getAll(userId)
}

// User Settings
export const getUserSettings = async (userId: string) => {
  const database = await initDB()
  return database.get("userSettings", userId)
}

export const updateUserSettings = async (userId: string, data: Partial<UserSettings>) => {
  const database = await initDB()
  const settings = await database.get("userSettings", userId)
  if (!settings) throw new Error("User settings not found")

  const updatedSettings = {
    ...settings,
    ...data,
    updatedAt: new Date(),
  }

  await database.put("userSettings", updatedSettings)
}

export const createUserSettings = async (settings: Omit<UserSettings, "createdAt" | "updatedAt">) => {
  const database = await initDB()
  const now = new Date()
  
  const newSettings: UserSettings = {
    ...settings,
    createdAt: now,
    updatedAt: now,
  }

  await database.put("userSettings", newSettings)
}

// Default categories for new users
const defaultCategories: Omit<Category, "id" | "userId" | "createdAt" | "updatedAt">[] = [
  // Income categories
  { name: "Salaris", type: "income", color: "#22c55e", icon: "💰" },
  { name: "Freelance", type: "income", color: "#3b82f6", icon: "💼" },
  { name: "Investering", type: "income", color: "#8b5cf6", icon: "📈" },
  { name: "Overig inkomen", type: "income", color: "#06b6d4", icon: "➕" },
  
  // Expense categories
  { name: "Huur", type: "expense", color: "#ef4444", icon: "🏠" },
  { name: "Boodschappen", type: "expense", color: "#f97316", icon: "🛒" },
  { name: "Vervoer", type: "expense", color: "#eab308", icon: "🚗" },
  { name: "Abonnementen", type: "expense", color: "#ec4899", icon: "📱" },
  { name: "Kleding", type: "expense", color: "#14b8a6", icon: "👕" },
  { name: "Vrije tijd", type: "expense", color: "#6366f1", icon: "🎮" },
  { name: "Overige uitgaven", type: "expense", color: "#64748b", icon: "📝" },
]

export const initializeUserCategories = async (userId: string) => {
  const database = await initDB()
  
  // Check if user already has categories
  const index = database.transaction("categories").store.index("by-user")
  const existingCategories = await index.getAll(userId)
  
  if (existingCategories.length === 0) {
    // Add default categories for the user
    const tx = database.transaction("categories", "readwrite")
    const store = tx.objectStore("categories")
    
    for (const category of defaultCategories) {
      const id = generateId()
      const now = new Date()
      
      await store.add({
        ...category,
        id,
        userId,
        createdAt: now,
        updatedAt: now,
      })
    }
    
    await tx.done
  }
} 