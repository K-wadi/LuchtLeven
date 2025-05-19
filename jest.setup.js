// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  usePathname() {
    return ""
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock next-auth
jest.mock("next-auth/react", () => ({
  useSession() {
    return { data: null, status: "unauthenticated" }
  },
  signIn: jest.fn(),
  signOut: jest.fn(),
}))

// Mock IndexedDB
const indexedDB = {
  open: jest.fn(),
  deleteDatabase: jest.fn(),
}

Object.defineProperty(window, "indexedDB", {
  writable: true,
  value: indexedDB,
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

Object.defineProperty(window, "localStorage", {
  writable: true,
  value: localStorageMock,
}) 