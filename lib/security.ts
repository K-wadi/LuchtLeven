import { createHash } from "crypto"

export const hashData = (data: string): string => {
  return createHash("sha256").update(data).digest("hex")
}

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, "") // Remove < and > to prevent XSS
    .trim()
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  return passwordRegex.test(password)
}

export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15)
}

export const validateAmount = (amount: number): boolean => {
  return !isNaN(amount) && amount >= 0 && amount <= 1000000
}

export const validateDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(date)) return false

  const [year, month, day] = date.split("-").map(Number)
  const dateObj = new Date(year, month - 1, day)
  
  return (
    dateObj.getFullYear() === year &&
    dateObj.getMonth() === month - 1 &&
    dateObj.getDate() === day
  )
}

export const validateDescription = (description: string): boolean => {
  return description.length >= 1 && description.length <= 100
} 