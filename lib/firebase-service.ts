import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "./firebase"
import type {
  Transaction,
  FinancialGoal,
  FixedCost,
  Category,
  UserSettings,
} from "./types"

// Helper function to convert Firestore timestamps to Dates
const convertTimestamps = (data: any) => {
  const result = { ...data }
  for (const key in result) {
    if (result[key] instanceof Timestamp) {
      result[key] = result[key].toDate()
    }
  }
  return result
}

// Transactions
export const addTransaction = async (transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">) => {
  const docRef = await addDoc(collection(db, "transactions"), {
    ...transaction,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export const updateTransaction = async (id: string, data: Partial<Transaction>) => {
  const docRef = doc(db, "transactions", id)
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export const deleteTransaction = async (id: string) => {
  await deleteDoc(doc(db, "transactions", id))
}

export const getTransactions = async (userId: string) => {
  const q = query(
    collection(db, "transactions"),
    where("userId", "==", userId),
    orderBy("date", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as Transaction[]
}

// Financial Goals
export const addFinancialGoal = async (goal: Omit<FinancialGoal, "id" | "createdAt" | "updatedAt">) => {
  const docRef = await addDoc(collection(db, "goals"), {
    ...goal,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export const updateFinancialGoal = async (id: string, data: Partial<FinancialGoal>) => {
  const docRef = doc(db, "goals", id)
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export const deleteFinancialGoal = async (id: string) => {
  await deleteDoc(doc(db, "goals", id))
}

export const getFinancialGoals = async (userId: string) => {
  const q = query(
    collection(db, "goals"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as FinancialGoal[]
}

// Fixed Costs
export const addFixedCost = async (fixedCost: Omit<FixedCost, "id" | "createdAt" | "updatedAt">) => {
  const docRef = await addDoc(collection(db, "fixedCosts"), {
    ...fixedCost,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export const updateFixedCost = async (id: string, data: Partial<FixedCost>) => {
  const docRef = doc(db, "fixedCosts", id)
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export const deleteFixedCost = async (id: string) => {
  await deleteDoc(doc(db, "fixedCosts", id))
}

export const getFixedCosts = async (userId: string) => {
  const q = query(
    collection(db, "fixedCosts"),
    where("userId", "==", userId),
    orderBy("name")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as FixedCost[]
}

// Categories
export const addCategory = async (category: Omit<Category, "id" | "createdAt" | "updatedAt">) => {
  const docRef = await addDoc(collection(db, "categories"), {
    ...category,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export const updateCategory = async (id: string, data: Partial<Category>) => {
  const docRef = doc(db, "categories", id)
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export const deleteCategory = async (id: string) => {
  await deleteDoc(doc(db, "categories", id))
}

export const getCategories = async (userId: string) => {
  const q = query(
    collection(db, "categories"),
    where("userId", "==", userId),
    orderBy("name")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as Category[]
}

// User Settings
export const getUserSettings = async (userId: string) => {
  const docRef = doc(db, "userSettings", userId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return convertTimestamps(docSnap.data()) as UserSettings
  }
  return null
}

export const updateUserSettings = async (userId: string, data: Partial<UserSettings>) => {
  const docRef = doc(db, "userSettings", userId)
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export const createUserSettings = async (settings: Omit<UserSettings, "createdAt" | "updatedAt">) => {
  const docRef = doc(db, "userSettings", settings.userId)
  await updateDoc(docRef, {
    ...settings,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
} 