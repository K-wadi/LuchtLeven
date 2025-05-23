import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { z } from 'zod';

// Define types for our financial data
export type Expense = {
  id: string;
  date: Date;
  category: string;
  amount: number;
  notes?: string;
};

export type FixedCost = {
  id: string;
  date: Date;
  category: string;
  amount: number;
  notes?: string;
  recurring: boolean;
};

export type FinancialGoal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  notes?: string;
};

export type HealthExpense = {
  id: string;
  date: Date;
  category: string;
  amount: number;
  provider: string;
  notes?: string;
  isReimbursed: boolean;
  reimbursementAmount?: number;
};

type FinancialState = {
  expenses: Expense[];
  fixedCosts: FixedCost[];
  goals: FinancialGoal[];
  healthExpenses: HealthExpense[];
  isLoading: boolean;
  error: string | null;
};

type FinancialAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'ADD_FIXED_COST'; payload: FixedCost }
  | { type: 'ADD_GOAL'; payload: FinancialGoal }
  | { type: 'ADD_HEALTH_EXPENSE'; payload: HealthExpense }
  | { type: 'UPDATE_EXPENSE'; payload: Expense }
  | { type: 'UPDATE_FIXED_COST'; payload: FixedCost }
  | { type: 'UPDATE_GOAL'; payload: FinancialGoal }
  | { type: 'UPDATE_HEALTH_EXPENSE'; payload: HealthExpense }
  | { type: 'DELETE_EXPENSE'; payload: string }
  | { type: 'DELETE_FIXED_COST'; payload: string }
  | { type: 'DELETE_GOAL'; payload: string }
  | { type: 'DELETE_HEALTH_EXPENSE'; payload: string };

const initialState: FinancialState = {
  expenses: [],
  fixedCosts: [],
  goals: [],
  healthExpenses: [],
  isLoading: false,
  error: null,
};

function financialReducer(state: FinancialState, action: FinancialAction): FinancialState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'ADD_FIXED_COST':
      return { ...state, fixedCosts: [...state.fixedCosts, action.payload] };
    case 'ADD_GOAL':
      return { ...state, goals: [...state.goals, action.payload] };
    case 'ADD_HEALTH_EXPENSE':
      return { ...state, healthExpenses: [...state.healthExpenses, action.payload] };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case 'UPDATE_FIXED_COST':
      return {
        ...state,
        fixedCosts: state.fixedCosts.map((cost) =>
          cost.id === action.payload.id ? action.payload : cost
        ),
      };
    case 'UPDATE_GOAL':
      return {
        ...state,
        goals: state.goals.map((goal) =>
          goal.id === action.payload.id ? action.payload : goal
        ),
      };
    case 'UPDATE_HEALTH_EXPENSE':
      return {
        ...state,
        healthExpenses: state.healthExpenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };
    case 'DELETE_FIXED_COST':
      return {
        ...state,
        fixedCosts: state.fixedCosts.filter((cost) => cost.id !== action.payload),
      };
    case 'DELETE_GOAL':
      return {
        ...state,
        goals: state.goals.filter((goal) => goal.id !== action.payload),
      };
    case 'DELETE_HEALTH_EXPENSE':
      return {
        ...state,
        healthExpenses: state.healthExpenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

const FinancialContext = createContext<{
  state: FinancialState;
  dispatch: React.Dispatch<FinancialAction>;
} | null>(null);

export function FinancialProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(financialReducer, initialState);

  // TODO: Implement Firebase integration
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // Fetch data from Firebase
        // dispatch({ type: 'SET_EXPENSES', payload: expenses });
        // dispatch({ type: 'SET_FIXED_COSTS', payload: fixedCosts });
        // dispatch({ type: 'SET_GOALS', payload: goals });
        // dispatch({ type: 'SET_HEALTH_EXPENSES', payload: healthExpenses });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: error instanceof Error ? error.message : 'An error occurred',
        });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchData();
  }, []);

  return (
    <FinancialContext.Provider value={{ state, dispatch }}>
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
} 