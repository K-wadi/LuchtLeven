import { create } from "zustand"
import type {
  Transaction,
  FinancialGoal,
  FixedCost,
  Category,
  UserSettings,
} from "./types"
import {
  getTransactions,
  getFinancialGoals,
  getFixedCosts,
  getCategories,
  getUserSettings,
} from "./local-storage"

interface AppState {
  transactions: Transaction[]
  goals: FinancialGoal[]
  fixedCosts: FixedCost[]
  categories: Category[]
  userSettings: UserSettings | null
  isLoading: boolean
  error: string | null
  fetchData: (userId: string) => Promise<void>
  setError: (error: string | null) => void
}

export const useStore = create<AppState>((set) => ({
  transactions: [],
  goals: [],
  fixedCosts: [],
  categories: [],
  userSettings: null,
  isLoading: false,
  error: null,

  fetchData: async (userId: string) => {
    set({ isLoading: true, error: null })
    try {
      const [transactions, goals, fixedCosts, categories, userSettings] = await Promise.all([
        getTransactions(userId),
        getFinancialGoals(userId),
        getFixedCosts(userId),
        getCategories(userId),
        getUserSettings(userId),
      ])

      set({
        transactions,
        goals,
        fixedCosts,
        categories,
        userSettings,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: "Er is een fout opgetreden bij het ophalen van de gegevens",
        isLoading: false,
      })
    }
  },

  setError: (error: string | null) => set({ error }),
})) 